import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associate } from 'src/app/Store/Model/associate.model';
import { getAssociateList } from 'src/app/Store/Associate/Associate.Selector';
import { loadAssociate } from 'src/app/Store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './associatelisting.component.html',
  styleUrl: './associatelisting.component.scss'
})
export class AssociatelistingComponent implements OnInit {

  AssociateList!: Associate[];
  datasource: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'type', 'associategroup', 'status', 'action' ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).subscribe(item => {
      this.AssociateList = item
      this.datasource = new MatTableDataSource<Associate>(this.AssociateList)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      console.log(this.datasource.data)
    })
  }

  functionAdd() {
    this.openPopup(0, 'Create Associate')
  }

  openPopup(code: number, title: string) {
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      data: {
        code: code,
        title: title,
      }
    })
  }
}
