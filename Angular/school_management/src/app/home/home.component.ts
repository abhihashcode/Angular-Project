import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  tabledata: any;
  id: any;
  tabledatalength: any;
  editform:FormGroup;
  editvalue:any;
  selectedId: any;
  imgs:any='robert.jpg'
  visible:boolean = false;
  url :any;

  formdata = new FormData();

  constructor(
    private commonservice: CommonService,
    private ConfirmationService: ConfirmationService,
    public messageService: MessageService,
    public router: Router
  ) {}

  

  ngOnInit(): void {
    this.getUserData();
    this.edUser();
  }

  edUser(){
    this.editform=new FormGroup({
      id:new FormControl('',[Validators.required]),
      fnname:new FormControl('',[Validators.required]),
      emmail:new FormControl('',[Validators.required,Validators.email]),
      ussername:new FormControl('',[Validators.required]),
      passsword:new FormControl('',[Validators.required]),
      agee:new FormControl('',[Validators.required]),
      filepath:new FormControl('',[Validators.required]),
    })
  }


  getUserData() {
    console.log('Welcome in home component');
    this.commonservice.getUserData().subscribe((data: any) => {
      console.log(data);
      this.tabledata = data;
      this.tabledatalength = data.length;
    });
  }

  deleteUser(id: any) {
    this.ConfirmationService.confirm({
      message: 'Are you sure you want to delete item?',
      accept: () => {
        console.log('Workin');
        this.commonservice.deleteUser(id).subscribe((data: any) => {
          if ((data = 'deleted')) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Deleted Successfully',
            });
            this.getUserData();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Warning',
              detail: 'Something Went Wrong',
            });
          }
        });
      },
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
        var url =  this.editform.controls['id'].value + '.' + e.target.files[0].type.split('/')[1] ;
        console.log(url);
        
        this.formdata.append('image', e.target.files[0], url);
        this.editform.patchValue({filepath: url});
      };
    }

  }


  editUser(id: any) {
    this.visible = true;
    this.selectedId=id;
    console.log(this.selectedId);
    
    this.commonservice.editUser(id).subscribe((data: any) => {
      
      this.editvalue=data[0];
      this.url='http://192.168.1.123/kazyimages/profile_img/'+this.editvalue.image;
      console.log(this.url);
      this.editform.patchValue({
        id:this.editvalue.id,
        fnname:this.editvalue.name,
        emmail:this.editvalue.email,
        ussername:this.editvalue.username,
        passsword:this.editvalue.password,
        agee:this.editvalue.age,
        filepath:this.editvalue.image,
      }  
      )
    });
  }

  
  updateUser(){
    // console.log(this.editform.value);
    
    this.ConfirmationService.confirm({
      message: 'Are You Sure You Want To Update?',
      
      accept: () => {
         
        if(this.url){
          this.commonservice.uploadProfilePic(this.formdata).subscribe((data:any)=>{
            if(data == 'success'){
              this.commonservice.updateUser(this.selectedId,this.editform.value).subscribe((data: any) => {
                if(data=="updated"){
                  this.getUserData();
                 this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Sucessfully' });
                 this.editform.reset();
                 this.getUserData();
                 this.visible = false;
                }else{
                 this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Something Went Wrong' });
                }
              });
            }
          })
        }
        else{
          this.commonservice.updateUser(this.selectedId,this.editform.value).subscribe((data: any) => {
            if(data=="updated"){
             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Sucessfully' });
             this.editform.reset();
             this.getUserData();
             this.visible = false;
            }else{
             this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Something Went Wrong' });
            }
          });

        }
       
      },
    });
}





logoutUser(){
  this.router.navigate(['/'])
}
}
