import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from '../../../../impact-common/src/lib/authentication/auth.service';
import { ProfileService } from '../../services/profile.service';



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
  options: FormlyFormOptions = {};
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
  isEditable = false;

  constructor(
    private auth: AuthService,
    private profile: ProfileService
    ) { }

  ngOnInit(): void {
    this.model = this.auth.userDetails;
    this.profileForm = new FormGroup({});
  }

  ngAfterViewInit(): void {
    this.profileForm.disable();
  }

  editProfile() {
    this.isEditable = true;
    this.profileForm.enable();
  }

  cancelEditingProfile() {
    this.isEditable = false;
    this.options.resetModel();
    this.profileForm.disable();
  }

  updateProfile() {
    const user = this.auth.userDetails.username;
    this.profile.updateProfile(user, this.model).subscribe(
      res => {
        console.log(res);
        this.isEditable = false;
        this.profileForm.disable();
      }
    );
  }

}
