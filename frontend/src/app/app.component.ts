import { Component } from '@angular/core';
import { UserstorageService } from './service/auth/storage/userstorage.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // onNavClick() {
  //   const navbarCollapse = document.getElementById('navbarSupportedContent');
  //   if (navbarCollapse) {
  //     navbarCollapse.classList.remove('show'); // This will collapse the menu
  //   }
  // }


  onNavClick() {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show'); // Collapse the navbar on link click
    }

    // Optionally close any open dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
  }


  title = 'We Tech Hub';

  isCustomerLoggedIn: boolean = UserstorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserstorageService.isAdminLoggedIn();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isCustomerLoggedIn = UserstorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserstorageService.isAdminLoggedIn();
      // console.log('Admin---', this.isAdminLoggedIn);
      // console.log('Customer---', this.isCustomerLoggedIn);  25.08.24 (sunday update)
    });
  }

  logout() {
    UserstorageService.signOut();
    this.router.navigateByUrl('admin');
  }
}
