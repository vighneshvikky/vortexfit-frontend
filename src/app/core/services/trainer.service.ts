import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = 'http://localhost:3001/trainer';

  constructor(private http: HttpClient) {}

  getTrainerDetails(trainerId: string): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/${trainerId}`); 
  }

  updateTrainerDetails(trainerId: string, trainerData: Partial<Trainer>): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/${trainerId}`, trainerData, {withCredentials: true});
  }

  uploadCertification(trainerId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('certification', file);
    return this.http.post(`${this.apiUrl}/${trainerId}/certification`, formData, {withCredentials: true});
  }

  uploadIdProof(trainerId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('idProof', file);
    return this.http.post(`${this.apiUrl}/${trainerId}/id-proof`, formData, {withCredentials: true});
  }
} 