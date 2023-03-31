import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,FormArray, Validators} from '@angular/forms';
import { CommonService } from '../common.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
email:any
password:any
home:any
login: FormGroup;
  constructor(private commonservice:CommonService,private messageService:MessageService, public router: Router){
     
  }

  ngOnInit(): void {
    this.createform();
  }
  
  createform(){
    this.login=new FormGroup({
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',Validators.required),
    })
  
  }

  
  loginUser(){
    if(this.login.valid){
    this.commonservice.loginUser(this.login.value).subscribe((data:any)=>{

       if(data=="valid"){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Sucessfully' });
          this.router.navigate(['/home'])
       }else{
        this.messageService.add({ severity: 'error', summary: 'Warning', detail: 'Invalid User' });
       }

    })
  }
}



}