import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private readonly formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.formGroup.value).subscribe(
      data => {
        this.toastrService.success("Logged in Successfully!")
        this.router.navigateByUrl('/members')
      }, error => {
        this.toastrService.error(error.error)
      });
  }

  logout() {
    this.accountService.logout();
    this.toastrService.success("Logged out Successfully!")
    this.formGroup.reset();
    this.router.navigate(["/"]);
  }

}
