import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results:any;
  searchQuery:String = "";
  seaSubscription: Subscription | undefined;

  constructor(private mus: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.searchQuery=params['q'];
        this.seaSubscription = this.mus.searchArtists(this.searchQuery).subscribe((data:any) => this.results = data.artists.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index));
    });
  }

  ngOnDestroy(): void {
    this.seaSubscription?.unsubscribe();
  }
}
