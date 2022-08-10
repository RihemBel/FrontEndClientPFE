import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder ,  private authService: AuthService , private router: Router) {
    this.createLoginForm();


  }

  model: any;

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe : [false],
    });
  }

  get f() { return this.loginForm.controls; }



  ngOnInit() {
    // if (localStorage.getItem('currentUser')) {
    //   this.router.navigate(['/dashboard/default']);
    // }
  }

  onLogin() {
    console.log(this.loginForm.get('email').value);
    console.log(this.loginForm.get('password').value);
    console.log(this.loginForm.get('rememberMe').value);
    console.log(this.loginForm.invalid);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login( {
      username: this.loginForm.get('email').value ,
      password : this.loginForm.get('password').value ,
      rememberMe : this.loginForm.get('rememberMe').value })
        // .pipe(map(res => { return res}))
        .subscribe(  data => {
              const newUser = new User(data.id, data.firstname, data.lastname, data.email, data.tokenType, data.accessToken, data.adresse, data.phone);
              localStorage.setItem('currentUser', JSON.stringify( newUser));
              console.log( localStorage.getItem('currentUser'));
              const user: User = JSON.parse(localStorage.getItem('currentUser'));
              console.log(user.id);
            },
            error => {
              throw error;

            },
            () => this.router.navigate(['/shop/collection/left/sidebar'], )
        );
  }


  onReset() {
    this.submitted = false;
  }


}
