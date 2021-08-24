import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, public accountService: AccountService) {
    this.formGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.formGroup.value).subscribe(
      data => {
        console.log("Logged In Successfully!");
      }, error => {
        console.error(error.error);
      });
  }

  logout() {
    this.accountService.logout();
    this.formGroup.reset();
  }

}
