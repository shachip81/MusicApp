import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums:any;
  artist:any;
  artSubscription: Subscription | undefined;
  albSubscription: Subscription | undefined;
  parSubscription: Subscription | undefined;

  constructor(private mus: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parSubscription = this.route.params.subscribe((params:Params) =>{
      let p = params["id"];
      this.artSubscription = this.mus.getArtistById(p).subscribe((data:any) => this.artist = data );
      this.albSubscription = this.mus.getAlbumsByArtistId(p).subscribe((data:any) => this.albums = data.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index) );
    });
    
  }

  ngOnDestroy(): void {
    this.artSubscription?.unsubscribe();
    this.albSubscription?.unsubscribe();
    this.parSubscription?.unsubscribe();
  }

}
