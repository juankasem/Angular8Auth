import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  constructor() { }
 
   h2Message : string;
   h1Message : string;

  ngOnInit() {
    this.h1Message = "403";
    this.h2Message = "Access Denied"
  }

}
