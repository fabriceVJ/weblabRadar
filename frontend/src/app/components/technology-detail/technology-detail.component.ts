import { Component } from '@angular/core';
import {Technology} from '../../models/Technology';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-technology-detail',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './technology-detail.component.html',
  styleUrl: './technology-detail.component.sass'
})
export class TechnologyDetailComponent {
  tech: Technology;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({name: ['', Validators.required], category: ['', Validators.required], ring: ['', Validators.required],
      descriptionTechnology: ['', Validators.required], descriptionOnRing: ['', Validators.required]});
  }

}
