import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-login-view',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.sass'
})
export class LoginViewComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    // todo change minlength of password?
    this.form = fb.group({username: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(2)]]});
  }

  login(): void {
    console.log("trying to log in")
    const val = this.form.value;

    if (this.form.valid) {
      this.authService.login(val.username, val.password).subscribe(() => {
        this.router.navigate(['/radar']);
      })
    }
  }
}
