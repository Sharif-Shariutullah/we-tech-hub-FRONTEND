import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-design-development',
  templateUrl: './app-design-development.component.html',
  styleUrls: ['./app-design-development.component.scss']
})
export class AppDesignDevelopmentComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
