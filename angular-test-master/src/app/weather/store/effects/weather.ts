import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WeatherService } from '../../weather.service';
import { ofType } from 'ts-action-operators';
import { LoadWeatherForecast, LoadWeatherForecastSuccess, LoadWeatherForecastError } from '../actions';
import { map, catchError, withLatestFrom, filter, concatMap, tap } from 'rxjs/operators';
import { Weather } from '../../../model/weather';
import { of } from 'rxjs/observable/of';
import { Store, select } from '@ngrx/store';
import { weatherQuery } from '../selectors';

@Injectable()
export class WeatherEffects {

  @Effect( { dispatch: true })
  loadWeatherForecastForCity$ = this._actions$.pipe(
    ofType(LoadWeatherForecast),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(weatherQuery.selectSearchedCityWeatherForecast))),
    filter(([city, forecast]) => !forecast),
    concatMap(([city, forecast]) =>
        this._weatherService.searchWeatherForCity(city)
        .pipe(
          map((cityWeather: Weather) => LoadWeatherForecastSuccess(cityWeather)),
          catchError(error =>  {
            return of(LoadWeatherForecastError(error));
          })
        ))
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _weatherService: WeatherService,
    private readonly _store: Store<{}>
  ) {}
}
