import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit , OnDestroy{
  album:any;
  parSubscription: Subscription | undefined;
  alSubscription: Subscription | undefined;
  favourSubscription: Subscription | undefined;
  constructor( private mat: MatSnackBar, private mus: MusicDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.parSubscription = this.route.params.subscribe((params:Params) =>{
      let p = params["id"];
      this.alSubscription = this.mus.getAlbumById(p).subscribe((data:any) => this.album = data );
    });
  }

    
  addToFavourites(trackID : string){

    this.favourSubscription = this.mus.addToFavourites(trackID).subscribe({
      next: ()=>{
        this.mat.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      error:()=>{
        this.mat.open("Unable to add song to Favourites", "Done", { duration: 1500 });
      }
    });
  }

  ngOnDestroy(): void {
    this.alSubscription?.unsubscribe();
    this.parSubscription?.unsubscribe();
    this.favourSubscription?.unsubscribe();
  }
}
