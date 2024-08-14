import { Component } from '@angular/core';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrl: './new-hero-page.component.css'
})
export class NewHeroPageComponent {

  public publisher = [
    {
      id: 'DC Comics',
      desc:'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ]

}
