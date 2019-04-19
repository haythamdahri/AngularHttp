import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable()
export class ServersService {
  private DATA_URL: string = 'https://data-api-68722.firebaseio.cosm/data.json';

  constructor(private http: HttpClient) {
  }

  storeServers(servers: any[]) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //return this.http.post(this.DATA_URL, servers, {headers: headers});
    return this.http.put(this.DATA_URL, servers, {headers: headers});
  }

  getServers() {
    return this.http.get(this.DATA_URL).pipe(map(
      (response) => {
        return response;
      }
    ), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(new Error('An error occurred, '));
  }

  getApplicationName() {
    return this.http.get('https://data-api-68722.firebaseio.com/appName.json').pipe(
      map((response) => {
          console.log(response);
          return response;
        }
      ), catchError(this.handleError)
    );
  }
}
