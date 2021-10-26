import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });
  id!: number;

  constructor(private contactsSevice: ContactsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {    
      
      this.id = paramMap.get('id') as unknown as number;

      this.contactsSevice.retrieveContact(this.id).subscribe(contact => {
        this.contactForm.reset(contact);
      });

    })
  }

  updateContact(){
    this.contactsSevice.updateContact({ id: this.id, ...this.contactForm.value })
      .subscribe(contact => {
        this.contactForm.reset(contact);
        alert(`Contato ${contact.name} alterado.`);
      });
  }

}
