import { Component } from '@angular/core';
import { ItunesService } from '../shared/app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  providers: [ItunesService]
})
export class ArtistComponent {

  searchResults: Array<string> = [];
  artistId: number = 0;

  selectedArtist: string;

  constructor(private itunesService: ItunesService) { }

  ngOnInit(){
    this.searchResults = this.itunesService.getDefaultAlbums();
    Observable.interval(1000).subscribe(x => {
      this.rotateElements(this.searchResults);
      //console.log(`It's been ${x + 1} seconds since subscribing!`);
    });
  }
  
  search(searchTerm) {
    this.itunesService.search(searchTerm).then(results => {
      this.searchResults = results;
    });
  }

  private rotateElements(albums: any): void {
    albums.push(albums.shift())
  };
}
