import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VehicledetailService {

  private _loginUrl = environment.apiUrl + "api/VehicleDetails";

  constructor(
    private http: HttpClient
  ) { }


   Add(user: any) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._loginUrl, user, { headers })
     .pipe(map(data=>data as any));
  }


  Update(id:number,user: any) {
     const headers = new HttpHeaders().set('Content-Type', 'application/json');
     return this.http.put<any>(this._loginUrl+'/'+id, user, { headers })
       .pipe(map(data => data as any));
   }
   GetData() {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(this._loginUrl )
     .pipe(map(data=>data as any[]));
  }
}
