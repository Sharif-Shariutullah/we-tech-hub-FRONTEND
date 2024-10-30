import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creative-design',
  templateUrl: './creative-design.component.html',
  styleUrls: ['./creative-design.component.scss']
})
export class CreativeDesignComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
