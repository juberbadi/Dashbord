import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDataService} from '../services/users-data.service';
import { AuthService } from '../services/auth.service';
import { UploadFilesService } from '../services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})

export class DashbordComponent implements OnInit {
  users:any={};
  message: any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  messages = '';

  fileInfos?: Observable<any>;

  constructor(private userData:UsersDataService, private router:Router, public nav: AuthService, private uploadService: UploadFilesService) { 
    userData.users().subscribe((data: any)=>{
      this.users = data
    })
    }

    update(){
          this.router.navigate(['/update'])
    }

    deleteUsers(){
      this.userData.deleteUser().subscribe()
      console.log('MESSAGE: "User deleted Successfully"');
      
      this.router.navigate(['/registration'])
    }

    logoutUsers(){
      this.userData.logoutUser()  
      this.router.navigate(['/login'])
    }

    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }
  
    upload(): void {
      this.progress = 0;
    
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
    
        if (file) {
          this.currentFile = file;
    
          this.uploadService.upload(this.currentFile).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.messages = event.body.message;
                this.fileInfos = this.uploadService.getFiles();
              }
            },
            (err: any) => {
              console.log(err);
              this.progress = 0;
    
              if (err.error && err.error.message) {
                this.messages = err.error.message;
              } else {
                this.messages = 'Could not upload the file!';
              }
    
              this.currentFile = undefined;
            });
        }
    
        this.selectedFiles = undefined;
      }
    }
    

  ngOnInit(): void {
    this.nav.hide();
  this.nav.doSomethingElseUseful();
  this.fileInfos = this.uploadService.getFiles();
  }

}
