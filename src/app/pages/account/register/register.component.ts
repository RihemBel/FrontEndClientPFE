import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  submitted = false;
  url: any;

  constructor(private formBuilder: FormBuilder ,  private authService: AuthService , private router: Router) {
    this.createRegisterForm();

  }

  ngOnInit(): void {
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      password: ['', [Validators.required]],
      login: [''],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      // sex: [''],
      adresse: [''],
      // birthdayDate: [''],
      image: [],

    });
  }

  get fR() {
    return this.registerForm.controls;
  }

  onSave() {
    const user = {
      firstname: this.fR.firstname.value.trim(),
      lastname: this.fR.lastname.value.trim(),
      email: this.fR.email.value.trim(),
      password: this.fR.password.value.trim(),
      login: this.fR.login.value.trim(),
      phone: this.fR.phone.value.trim(),
      adresse: this.fR.adresse.value.trim(),
      image: null,
    };
    const formData = new FormData();
    formData.append('files', this.url);
    formData.append('user', JSON.stringify(user));
    console.log(JSON.stringify(formData));
    this.authService.register(formData).subscribe(
        () => {
          console.log(user);
          this.router.navigate(['/pages/login']);
        });
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.url = event.target.files[0];
    }
  }


}
