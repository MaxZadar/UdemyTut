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

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(){
    if(this.formGroup.get('password')?.value !== this.formGroup.get('repeat_password')?.value){
      this.formGroup.setErrors({
        matchingPasswords: false
      });
    }
    if(this.formGroup.invalid) return;
    this.accountService.register({
      username: this.formGroup.get('username')?.value,
      password: this.formGroup.get('password')?.value
    }).subscribe(_ => {
      console.log("Registered Successfully!");
      this.formGroup.reset();
      this.cancel();
    }, error => {
      console.error(error.error);
    });
  }

  cancel() {
    this.cancelRegistration.emit();
  }

}
