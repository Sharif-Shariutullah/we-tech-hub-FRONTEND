import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-center',
  templateUrl: './contact-center.component.html',
  styleUrls: ['./contact-center.component.scss']
})
export class ContactCenterComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
