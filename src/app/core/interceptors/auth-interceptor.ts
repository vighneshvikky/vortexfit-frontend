// src/app/core/interceptors/token.interceptor.ts
import { Injectable, inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  switchMap,
  throwError,
  of,
  BehaviorSubject,
  filter,
  take,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // First, pass the request through normally
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if this is a 401 error from our API
        if (this.shouldHandleError(error)) {
          return this.handle401Error(request, next);
        }

        // For other errors, just rethrow them
        return throwError(() => error);
      })
    );
  }

  private shouldHandleError(error: HttpErrorResponse): boolean {
    if (!error.url) return false;

    return (
      error.status === HttpStatusCode.Unauthorized &&
      error.url.startsWith(this.authService.apiUrl) &&
      !error.url.includes('validateRefreshToken') &&
      !error.url.includes('login')&&
      !error.url.includes('adminLogin')
    );
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // If we're already refreshing, wait for the current refresh to complete
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap(() => next.handle(this.cloneRequestWithToken(request)))
      );
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshAccessToken().pipe(
      switchMap(() => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(true);
        return next.handle(this.cloneRequestWithToken(request));
      }),
      catchError((error) => {
        this.isRefreshing = false;

        // If refresh fails, logout the user
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  private cloneRequestWithToken(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    // The new access token will be automatically included in cookies
    // so we just need to clone the original request
    return request.clone();
  }
}
