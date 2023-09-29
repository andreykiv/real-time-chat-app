import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showLogin = true;

  handleLogic(element: string) {
    if (element === 'Login') {
      this.showLogin = true;
    } else {
      this.showLogin = false;
    }
  }
}
