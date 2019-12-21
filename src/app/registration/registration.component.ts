import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  //Properties
  insertForm : FormGroup;
  username : FormControl;
  password : FormControl;
  confirmPassword : FormControl;
  email : FormControl;
  modelRef : BsModalRef;
  errorList : string[];

  constructor(private accountService : AccountService,
              private fb : FormBuilder,
              private router : Router,
              private modalService : BsModalService
              )
               { }

  ngOnInit() {
    this.initForm();   
  }

    //initialize Registration form method
    initForm(){
      this.username = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.confirmPassword = new FormControl('', [Validators.required, this.mustMatch(this.password)]);
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.errorList =[];

      this.insertForm = this.fb.group({
         'username' : this.username,
         'password' : this.password,
         'confirmPassword' : this.confirmPassword,
         'email' : this.email
      });
    }
    
    @ViewChild('template', {static : false}) modal : TemplateRef<any>;

    //custom validator
    mustMatch(passwordControl : AbstractControl) : ValidatorFn
    {
      return (confirmPasswordControl : AbstractControl) : {[key: string] : boolean } | null   => 
      {
           //return null if controls haven't been initialized
           if (!passwordControl && !confirmPasswordControl){
             return null;
           }

           //return null if another validator has already found an error on the matching control
           if (!passwordControl.hasError && confirmPasswordControl.hasError){
             return null;
           }

           //set error if validation fails
           if (passwordControl.value != confirmPasswordControl.value){
             return {'mustMatch' : true};
           }
           else{
             return null;
           }
      }
    }

    onSubmit()
    {
      let newUserDetails = this.insertForm.value;
      this.accountService.register(newUserDetails.username, newUserDetails.password, newUserDetails.email)
                         .subscribe(res =>{
                          this.router.navigate(['/login']);
                          }, err =>{
                            this.errorList
                          })

      
      //this.modelRef = this.modalService.show(this.modal);
    }
}
