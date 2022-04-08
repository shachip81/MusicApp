import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit , OnDestroy{
  favourites:Array<any> = [];
  favSubscription: Subscription | undefined;
  remSubscription: Subscription | undefined;
  constructor(private mus:MusicDataService,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.favSubscription = this.mus.getFavourites().subscribe((data:any) => this.favourites = data.tracks);
  }

ngOnDestroy(): void {
  this.favSubscription?.unsubscribe();
  this.remSubscription?.unsubscribe();
}

removeFromFavourites(id:string){
    this.remSubscription=  this.mus.removeFromFavourites(id).subscribe((data:any) => this.favourites = data.tracks);


}

}


