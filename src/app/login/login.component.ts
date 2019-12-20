import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators,  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  insertForm : FormGroup;
  username : FormControl;
  password : FormControl;
  returnUrl : string;
  errorMessage : string;
  invalidLogin : boolean;

  constructor(private accountService : AccountService, private router : Router,
              private route : ActivatedRoute,
              private fb : FormBuilder) 
               { }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('',[Validators.required]);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.insertForm = this.fb.group({
      "Username" : this.username,
      "Password" : this.password
    })
  }

  onSubmit(){
    let userLogin = this.insertForm.value;
    this.accountService.login(userLogin.Username, userLogin.Password).subscribe(res =>{
      let token = (<any>res).token;
      console.log(token);
      console.log("User logged in successfully!");
      this.invalidLogin = false;
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
    }, err =>{
      this.invalidLogin = true;
      this.errorMessage = "Invalid Username/Password. please try again";
    })
  }

}
