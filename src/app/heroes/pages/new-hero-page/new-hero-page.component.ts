import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrl: './new-hero-page.component.css'
})
export class NewHeroPageComponent {


  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{nonNullable:true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  })

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



  public onSubmit = (): void => {
    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value
    });

  }

}
