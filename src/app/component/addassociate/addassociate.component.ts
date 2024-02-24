import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addassociate',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './addassociate.component.html',
  styleUrl: './addassociate.component.scss'
})
export class AddassociateComponent implements OnInit{

  title ='Create Associate'

  dEdit = false

  dialogData:any

constructor(private builder: FormBuilder, 
  private ref:MatDialogRef<AddassociateComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,

) {

}

ngOnInit(): void {
  this.dialogData = this.data;
  this.title = this.dialogData.title
}

closePopup() {
  this.ref.close();
}

associateForm = this.builder.group({
  id: this.builder.control(0),
  name: this.builder.control('', Validators.required),
  email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
  phone: this.builder.control('', Validators.required),
  address: this.builder.control('', Validators.required),
  type: this.builder.control('Customer'),
  group: this.builder.control('Level 1'),
  status: this.builder.control(true)
})

saveAssociate() {
  if(this.associateForm.valid) {

  }
}

}
