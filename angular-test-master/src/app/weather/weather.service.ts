import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../model/weather';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city): Observable<Weather> {
    const params = new HttpParams()
    .set('q', city)
    .set('cnt', '9')
    .set('units', 'metric')
    .set('APPID', '010721642521f31b0fbc8c3831d45951');
    return this.http.get<Weather>(this.url, {params});
  }
}
