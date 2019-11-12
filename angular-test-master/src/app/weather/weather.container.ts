import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadWeatherForecast, getAllCities, WeatherForecastEntities, WeatherForecastState } from './store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (citySearched) = 'citySearch($event)'></app-search>
  <app-results [searchResults] = "(citiesForecast$ | async)" ></app-results>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherContainerComponent implements OnInit {
  citiesForecast$: Observable<WeatherForecastEntities>;
  constructor(private readonly _store: Store<WeatherForecastState>) {}

  ngOnInit(): void {
    this.citiesForecast$ = this._store.pipe(
      select(getAllCities)
    );
  }

  citySearch(city: string) {
    this._store.dispatch(LoadWeatherForecast(city));
  }
}
