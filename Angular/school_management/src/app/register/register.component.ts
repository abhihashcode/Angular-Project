import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,FormArray, Validators} from '@angular/forms';
import { CommonService } from '../common.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  registerData: any;
  images = [];
  url = './assets/img/img.jpg';

  formdata = new FormData();

  constructor(
    private commonservice: CommonService,
    public messageService: MessageService,
    public router: Router,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.register = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      filepath: new FormControl('', Validators.required),
    });
  }

  onFileChange(e: any) {
    // var tempele = document.getElementById('file') as any;
    if (e.target.files && e.target.files[0]) {
      // var filesAmount = e.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      //         var reader = new FileReader();

      //         reader.onload = (event:any) => {
      //           console.log(event.target.result);
      //            this.url=event.target.result;
      //         }
      // }
      console.log(e.target.files);
      
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        var url =  this.register.controls['name'].value + '.' + e.target.files[0].type.split('/')[1] ;
        console.log(url);
        
        this.formdata.append('image', e.target.files[0], url);
        this.register.patchValue({filepath: url});
      };
    }

  }

  

  registerSubmit() {

    this.commonservice.uploadProfilePic(this.formdata).subscribe((data:any)=>{
       if(data == 'success'){
          console.log(data);

        if(this.register.valid){
            this.commonservice.registerSubmit(this.register.value).subscribe((data:any)=>{
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration Sucessfully' });
              // setInterval(()=>{
              //   this.router.navigate(['/'])
              // },2000)
            })
          }else{
            this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Please Enter Valid Data!!' });
          }
       }

    })
    
  }
}