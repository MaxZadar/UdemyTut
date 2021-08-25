import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;


  constructor(private http: HttpClient, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  toggleRegisterMode() {
    this.registerMode = !this.registerMode;
  }

}
