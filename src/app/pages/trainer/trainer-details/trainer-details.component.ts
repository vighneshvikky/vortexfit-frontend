import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from '../../../core/services/trainer.service';
import { Trainer } from '../../../core/models/trainer.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastrModule],
})
export class TrainerDetailsComponent implements OnInit {
  trainerForm: FormGroup;
  trainerId!: string;
  isLoading = false;
  certifications: File[] = [];
  idProof: File | null = null;

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: ['', Validators.required],
      education: ['', Validators.required],
      bio: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.trainerId = this.route.snapshot.params['id'];
    if (this.trainerId) {
      this.loadTrainerDetails();
    }
  }

  loadTrainerDetails(): void {
    this.isLoading = true;
    this.trainerService.getTrainerDetails(this.trainerId).subscribe({
      next: (trainer: Trainer) => {
        this.trainerForm.patchValue(trainer);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load trainer details');
        this.isLoading = false;
      }
    });
  }

  onCertificationChange(event: any): void {
    const files = event.target.files;
    if (files) {
      this.certifications = Array.from(files);
    }
  }

  onIdProofChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.idProof = file;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.trainerForm.valid) {
      this.isLoading = true;
      try {
        // Update trainer details
        await this.trainerService.updateTrainerDetails(
          this.trainerId,
          this.trainerForm.value
        ).toPromise();
  
        // Upload certifications
        for (const certification of this.certifications) {
          await this.trainerService.uploadCertification(
            this.trainerId,
            certification
          ).toPromise();
        }
  
        // Upload ID proof if provided
        if (this.idProof) {
          await this.trainerService.uploadIdProof(
            this.trainerId,
            this.idProof
          ).toPromise();
        }
  
        this.toastr.success('Trainer details updated successfully');
  
        // ✅ Navigate after success toast
        await this.router.navigate(['/trainer-dashboard']);
  
      } catch (error) {
        this.toastr.error('Failed to update trainer details');
      } finally {
        this.isLoading = false;
      }
    } else {
      this.trainerForm.markAllAsTouched();
    }
  }
  
}
