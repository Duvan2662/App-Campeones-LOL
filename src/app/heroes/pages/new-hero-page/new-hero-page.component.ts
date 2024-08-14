import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog:MatDialog
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
          this.showSnackbar(`${hero.superhero} updated!`)
        });

        return;
    }

    this.heroesServices.addHero(this.currentHero)
      .subscribe(hero =>{
        this.router.navigate(['/hero/edit', hero.id])
        this.showSnackbar(`${hero.superhero} created!`)
      })


  }



  public onDeleteHero() {

    if(!this.currentHero.id){
      throw Error('Hero id is required')
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result:boolean) => result),
      switchMap(()=>this.heroesServices.deleteHeroById(this.currentHero.id)),
      filter( (wastDeleted:boolean) => wastDeleted),
    )
    .subscribe(result =>{
      this.router.navigate(['/heroes'])
    })
    
  }


  public showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration:2500
    })

  }

}
