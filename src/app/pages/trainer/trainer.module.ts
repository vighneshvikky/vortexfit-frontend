import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainerDetailsComponent } from './trainer-details/trainer-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrainerDetailsComponent
  ]
})
export class TrainerModule { } 