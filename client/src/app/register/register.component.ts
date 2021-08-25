import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  @Output() cancelRegistration = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastrService: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.formGroup.invalid) {
      this.toastrService.error("Form is invalid!")
      return;
    };
    if (this.formGroup.get('password')?.value !== this.formGroup.get('repeat_password')?.value) {
      this.formGroup.setErrors({
        matchingPasswords: true
      });
      this.toastrService.error("Passwords must match!");
      return;
    }
    this.accountService.register({
      username: this.formGroup.get('username')?.value,
      password: this.formGroup.get('password')?.value
    }).subscribe(_ => {
      this.toastrService.success("Registered Successfully!")
      this.formGroup.reset();
      this.cancel();
    }, error => {
      this.toastrService.error(error.error);
      console.error(error.error);
    });
  }

  cancel() {
    this.cancelRegistration.emit();
  }

}
