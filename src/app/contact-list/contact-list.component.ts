import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact, ContactsService } from '../contacts.service';
import { LiveFormDialogComponent } from '../live-form-dialog/live-form-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];
  name: string = '';

  constructor(private contactsService: ContactsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.contactsService.listContact().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  deleteContact(contact: Contact){
    this.contactsService.deleteContact(contact.id).subscribe(() => {
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index, 1);
    });
  }

  dialogBtnExcluir(): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      width: '250px'
    });
  }

}
