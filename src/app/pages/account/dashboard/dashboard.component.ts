import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public checkoutForm: FormGroup;
  public currentUser: User;

  public openDashboard = false;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      firstname: [ '', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log((this.currentUser));
    this.checkoutForm.controls['firstname'].setValue(this.currentUser.firstName);
    this.checkoutForm.controls['lastname'].setValue(this.currentUser.lastName);
    this.checkoutForm.controls['address'].setValue(this.currentUser.adresse);
    this.checkoutForm.controls['email'].setValue(this.currentUser.email);
    this.checkoutForm.controls['phone'].setValue(this.currentUser.phone);
    // this.checkoutForm.controls['phone'].setValue(this.currentUser.);


  }

  ngOnInit(): void {
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

}
