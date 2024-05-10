import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addAssociate, updateAssociate } from 'src/app/Store/Associate/Associate.Action';
import { Associate } from 'src/app/Store/Model/associate.model';
import { getAssociate } from 'src/app/Store/Associate/Associate.Selector';

@Component({
  selector: 'app-addassociate',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './addassociate.component.html',
  styleUrl: './addassociate.component.scss'
})
export class AddassociateComponent implements OnInit{

  title ='Create Associate'

  isEdit = false

  dialogData:any

constructor(private builder: FormBuilder, 
  private ref:MatDialogRef<AddassociateComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private store: Store
) {

}

ngOnInit(): void {
  this.dialogData = this.data;
  this.title = this.dialogData.title
  this.store.select(getAssociate).subscribe(res => {
    this.associateForm.setValue({
      id: res.id,
      name: res.name,
      email: res.email,
      phone: res.phone,
      address: res.address,
      group: res.associategroup,
      type: res.type,
      status: res.status
    })
  })
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
    const obj: Associate = {
      id: this.associateForm.value.id as number,
      name: this.associateForm.value.name as string,
      email: this.associateForm.value.email as string,
      phone: this.associateForm.value.phone as string,
      associategroup: this.associateForm.value.group as string,
      address: this.associateForm.value.address as string,
      type: this.associateForm.value.type as string,
      status: this.associateForm.value.status as boolean

    }
    if(obj.id === 0) {
      this.store.dispatch(addAssociate({ inputData: obj }))
    } else {
      this.store.dispatch(updateAssociate({ inputData: obj}))
    }
    this.closePopup();
  }
}

}
