import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  users: any;

  constructor(private userData: UsersDataService, private router: Router) {}

  updateUserFormData(data: any) {
    console.warn(data);

    this.userData.updateUsers(data).subscribe((result) => {
      console.warn(result);
      this.router.navigate(['/dashbord']);
    });
  }
  ngOnInit(): void {}
}
