import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

const API = {
  SEARCH: 'https://itunes.apple.com/search?'
}

const defaultAlbums: string[] = ["A", "B", "C", "D", "E"];

@Injectable()
export class ItunesService {
  private _albums: Array<any> = [];
  private _artistId: number = 0;
  
  constructor(private jsonp: Jsonp) {
  }

  public getDefaultAlbums() : string[] {
    return defaultAlbums;
  }
  
  public search(searchTerm): Promise<any> {
    return this.jsonp.get(`${API.SEARCH}callback=JSONP_CALLBACK&term=${searchTerm}`)
      .toPromise()
      .then((data) => {
        if(data.json()) {
        var results = data.json().results.map(result => result.collectionName)
          .filter((value, index, resultsArray) => resultsArray.indexOf(value) === index)
          .sort()
          .slice(0, 5);

          return results;
        }else {
          console.log('no data found');
          return [];
        }
      })
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
