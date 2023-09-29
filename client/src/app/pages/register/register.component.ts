import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  doApplyInvalidFormClass = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      userEmail: ['', Validators.required],
      city: ['', Validators.required],
      age: [''],
      gender: [''],
    });
  }

  onSubmit() {
    console.log('form value: ', this.form.value);

    if (!this.form.valid) {
      this.doApplyInvalidFormClass = true;
    } else {
      this.doApplyInvalidFormClass = false;
      this.router.navigateByUrl('/lobby');
    }
  }
}
