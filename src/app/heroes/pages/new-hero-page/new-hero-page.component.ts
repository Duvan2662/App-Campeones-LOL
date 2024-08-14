import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrl: './new-hero-page.component.css'
})
export class NewHeroPageComponent implements OnInit{


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



  constructor (
    private heroesServices: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')){
      return
    }

    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.heroesServices.getHeroById(id)),
      ).subscribe(hero =>{
        if(!hero){
          return this.router.navigateByUrl('/')
        }

        this.heroForm.reset(hero)
        return
      });

  }


  public get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero
  }


  public onSubmit = (): void => {
    if (this.heroForm.invalid) {
      return
    }

    if(this.currentHero.id){
      this.heroesServices.updateHero(this.currentHero)
        .subscribe(hero => {
          //TODO: mostrar snackbar
        });

        return;
    }

    this.heroesServices.addHero(this.currentHero)
      .subscribe(hero =>{
        //TODO: mostrar snackbar, y navegar a heroes/edit/ hero.id
      })

    // this.heroesServices.updateHero(this.heroForm.value)
  }

}
