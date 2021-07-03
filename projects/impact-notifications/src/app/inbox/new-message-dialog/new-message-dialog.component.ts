import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-new-message-dialog',
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.scss']
})
export class NewMessageDialogComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Recipient\'s username',
        required: true,
      }
    },
    {
      key: 'message',
      type: 'textarea',
      templateOptions: {
        label: 'Message',
        required: true,
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
