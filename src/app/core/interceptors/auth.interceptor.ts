import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip interceptor for admin routes
  if (req.url.includes('/admin')) {
    return next(req);
  }

  // Always send requests with credentials
  req = req.clone({ withCredentials: true });

  console.log('[AuthInterceptor] Sending request to:', req.url);

  return next(req).pipe(
    tap((event) => {
      console.log('[AuthInterceptor] Received event:', event);
    }),
    catchError(error => {
      console.log('[AuthInterceptor] Error received:', error);
      if (error.status === 401) {
        return handle401Error(req, next, authService, router);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshAccessToken().pipe(
      switchMap(() => {
        isRefreshing = false;
        refreshTokenSubject.next(true);
        console.log('[AuthInterceptor] Retrying original request after refresh:', request.url);
        // Retry the original request with credentials
        return next(request.clone({ withCredentials: true }));
      }),
      catchError((error) => {
        isRefreshing = false;
        authService.logout();
        router.navigate(['/login']);
        console.log('[AuthInterceptor] Refresh failed, logging out:', error);
        return throwError(() => error);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(refreshed => refreshed === true),
    take(1),
    switchMap(() => {
      console.log('[AuthInterceptor] Retrying original request after waiting for refresh:', request.url);
      return next(request.clone({ withCredentials: true }));
    })
  );
} 