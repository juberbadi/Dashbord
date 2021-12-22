import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { AuthService } from '../services/auth.service';
import {
  ViewEncapsulation,
  Inject,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import {
  ToastComponent,
  ToastCloseArgs,
  ToastPositionModel,
} from '@syncfusion/ej2-angular-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  users: any;
  message: any;
  // public aFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userData: UsersDataService,
    private router: Router,
    private nav: AuthService
  ) {}

  getUserFormData(data: any) {
    console.warn(data);

    this.userData.saveUsers(data).subscribe((result) => {
      console.warn(result);
      this.message = result;
      // this.router.navigate(['/login'])
    });
  }

  // @ViewChild('toasttype')
  // private toastObj: ToastComponent;

  // @ViewChild('successToast')
  // private btnsuccess: ButtonComponent;

  // public position: ToastPositionModel = { X: 'Center' };

  // public toasts: { [key: string]: Object }[] = [
  //   {
  //     title: 'Warning!',
  //     content: 'There was a problem with your network connection.',
  //     cssClass: 'e-toast-warning',
  //     icon: 'e-warning toast-icons',
  //   },
  //   {
  //     title: 'Success!',
  //     content: 'Your message has been sent successfully.',
  //     cssClass: 'e-toast-success',
  //     icon: 'e-success toast-icons',
  //   },
  // ];

  // public successClick(): void {
  //   this.toastObj.show(this.toasts[1]);
  // }

  // @HostListener('document:click', ['$event'])
  // documentClick(e: MouseEvent): void {
  //   if (
  //     e.target !== this.btnsuccess.element &&
  //     this.toastObj.target === document.body
  //   ) {
  //     this.toastObj.hide('All');
  //   }
  // }

  ngOnInit(): void {
    // this.aFormGroup = this.formBuilder.group({
    //   recaptcha: ['', Validators.required]
    // });
    if (this.nav.loggedIn()) {
      this.router.navigate(['dashbord']);
    } else {
    }
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }
  // siteKey: string = "6LfLGKocAAAAAHNXWGxi8cfrO_t_F_zSz_qA-zeV";
}
