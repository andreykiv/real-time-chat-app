import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  doApplyInvalidFormClass = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      userEmail: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.form?.valid) {
      this.doApplyInvalidFormClass = true;
    } else {
      this.doApplyInvalidFormClass = false;
      this.router.navigateByUrl('/lobby');
    }
  }
}
