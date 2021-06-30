import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../../../../impact-common/src/lib/authentication/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profileForm;
  model = {
    username: '',
    password: '',
    email: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Username',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        placeholder: 'Password',
        required: true,
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: true,
      },
      validators: {
        email: {
          expression: (c) => !c.value ? true : !Validators.email(c),
          message: `This value is not a valid email.`,
        },
      }
    }
  ];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.model = this.auth.userDetails;
    this.profileForm = new FormGroup({});
  }

  ngAfterViewInit(): void {
    this.profileForm.disable();
  }

}
