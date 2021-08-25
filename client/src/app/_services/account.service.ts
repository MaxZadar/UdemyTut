import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = "https://localhost:5001/api/";
  private currentUserSource = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(loginInformation: {username: string, password: string}){
    return this.http.post<User>(this.baseUrl + 'account/login', loginInformation).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(registerInformation: {username: string, password: string}) {
    return this.http.post<User>(this.baseUrl + "account/register", registerInformation).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

}
