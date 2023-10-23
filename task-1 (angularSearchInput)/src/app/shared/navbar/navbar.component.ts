import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  counter: number = 0;
  inputValue: any;

  decrease=(counter: number)=> this.counter -=1;
  increase(counter: number) {
    this.counter += 1
  };
  inpp=()=> console.log(this.inputValue);

}
