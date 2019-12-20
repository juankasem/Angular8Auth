import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject} from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient : HttpClient, private router : Router) { }

  //Login Url Address
  private baseLoginUrl : string = "/api/Account/Login";

  //User related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  //Login Method
  login(username : string, password : string)
  {
    return this.httpClient.post<any>(this.baseLoginUrl, {username, password}).pipe(
      map(result => {
           if (result & result.token){
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus', '1');
            localStorage.setItem('jwt', result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('userRole', result.userRole);
            localStorage.setItem('expiration', result.expiration);
           }

           return result;
      })
    )
  }
   
  logout() {
    //Set LoginStatus to false & Delete saved jwt cookies
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');

     this.router.navigate(['/login']);
     console.log('Logged Out successfully.')
  }

  checkLoginStatus() : boolean
  {
      return false;
  }

  get isLoggedIn(){
    return this.loginStatus.asObservable();
  }

  get currentUserName(){
    return this.userName.asObservable();
  }

  get currentUserRole(){
    return this.userRole.asObservable();
  }
}
