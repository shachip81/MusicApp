import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy{

  releases: any;
  newRelSubscription : Subscription | undefined;
  constructor(private mus: MusicDataService) {}

  ngOnInit(): void {
    this.newRelSubscription = this.mus.getNewReleases().subscribe((data:any) => this.releases = data.albums.items);
  }

  ngOnDestroy(): void {
    this.newRelSubscription?.unsubscribe();
      
  }

}
