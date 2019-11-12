import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Actions, EffectsModule } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { of } from 'rxjs/observable/of';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { WeatherEffects } from '.';
import { WeatherService } from '../../weather.service';
import { provideMockStore } from '../../../test-helpers/store.mock.spec';
import { weatherQuery } from '../selectors';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../../../model/weather';
import { LoadWeatherForecast, LoadWeatherForecastSuccess, LoadWeatherForecastError } from '../actions';

describe('WeatherEffects', () => {
  let mockWeatherService: any;
  let action$: Observable<any>;
  let effects: WeatherEffects;
  const city  = 'London';
  const weather: Weather = {
    city: {
      'id': 2643743,
      'name': 'London',
      'coord': {
          'lat': 51.5073,
          'lon': -0.1277
      },
      'country': 'GB',
      'population': 1000000
    },
    cnt: 8,
    cod: '200',
    message: 0.0081,
    list: [
      {
          'dt': 1551992400,
          'main': {
              'temp': 7.65,
              'temp_min': 7.65,
              'temp_max': 7.77,
              'pressure': 998.74,
              'sea_level': 998.74,
              'grnd_level': 991.27,
              'humidity': 73,
              'temp_kf': -0.13
          },
          'weather': [
              {
                  'id': 500,
                  'main': 'Rain',
                  'description': 'light rain',
                  'icon': '10n'
              }
          ],
          'clouds': {
              'all': 92
          },
          'wind': {
              'speed': 7.17,
              'deg': 279.501
          },
          'sys': {
              'pod': 'n'
          },
          'dt_txt': '2019-03-07 21:00:00'
      },
      {
          'dt': 1552003200,
          'main': {
              'temp': 7.38,
              'temp_min': 7.38,
              'temp_max': 7.47,
              'pressure': 1003.27,
              'sea_level': 1003.27,
              'grnd_level': 995.76,
              'humidity': 75,
              'temp_kf': -0.1
          },
          'weather': [
              {
                  'id': 500,
                  'main': 'Rain',
                  'description': 'light rain',
                  'icon': '10n'
              }
          ],
          'clouds': {
              'all': 80
          },
          'wind': {
              'speed': 6.03,
              'deg': 303.501
          },
          'sys': {
              'pod': 'n'
          },
          'dt_txt': '2019-03-08 00:00:00'
      },
      {
          'dt': 1552014000,
          'main': {
              'temp': 5.53,
              'temp_min': 5.53,
              'temp_max': 5.6,
              'pressure': 1006.94,
              'sea_level': 1006.94,
              'grnd_level': 999.4,
              'humidity': 77,
              'temp_kf': -0.06
          },
          'weather': [
              {
                  'id': 803,
                  'main': 'Clouds',
                  'description': 'broken clouds',
                  'icon': '04n'
              }
          ],
          'clouds': {
              'all': 56
          },
          'wind': {
              'speed': 4.51,
              'deg': 297.002
          },
          'sys': {
              'pod': 'n'
          },
          'dt_txt': '2019-03-08 03:00:00'
      },
      {
          'dt': 1552024800,
          'main': {
              'temp': 4.66,
              'temp_min': 4.66,
              'temp_max': 4.69,
              'pressure': 1010.12,
              'sea_level': 1010.12,
              'grnd_level': 1002.43,
              'humidity': 84,
              'temp_kf': -0.03
          },
          'weather': [
              {
                  'id': 500,
                  'main': 'Rain',
                  'description': 'light rain',
                  'icon': '10n'
              }
          ],
          'clouds': {
              'all': 32
          },
          'wind': {
              'speed': 3.56,
              'deg': 292.001
          },
          'sys': {
              'pod': 'n'
          },
          'dt_txt': '2019-03-08 06:00:00'
      },
      {
          'dt': 1552035600,
          'main': {
              'temp': 6.96,
              'temp_min': 6.96,
              'temp_max': 6.96,
              'pressure': 1012.45,
              'sea_level': 1012.45,
              'grnd_level': 1004.82,
              'humidity': 74,
              'temp_kf': 0
          },
          'weather': [
              {
                  'id': 500,
                  'main': 'Rain',
                  'description': 'light rain',
                  'icon': '10d'
              }
          ],
          'clouds': {
              'all': 0
          },
          'wind': {
              'speed': 3.27,
              'deg': 277.502
          },
          'sys': {
              'pod': 'd'
          },
          'dt_txt': '2019-03-08 09:00:00'
      },
      {
          'dt': 1552046400,
          'main': {
              'temp': 9.36,
              'temp_min': 9.36,
              'temp_max': 9.36,
              'pressure': 1013.43,
              'sea_level': 1013.43,
              'grnd_level': 1005.89,
              'humidity': 67,
              'temp_kf': 0
          },
          'weather': [
              {
                  'id': 802,
                  'main': 'Clouds',
                  'description': 'scattered clouds',
                  'icon': '03d'
              }
          ],
          'clouds': {
              'all': 36
          },
          'wind': {
              'speed': 4.02,
              'deg': 254.503
          },
          'sys': {
              'pod': 'd'
          },
          'dt_txt': '2019-03-08 12:00:00'
      },
      {
          'dt': 1552057200,
          'main': {
              'temp': 9.91,
              'temp_min': 9.91,
              'temp_max': 9.91,
              'pressure': 1012.21,
              'sea_level': 1012.21,
              'grnd_level': 1004.6,
              'humidity': 59,
              'temp_kf': 0
          },
          'weather': [
              {
                  'id': 500,
                  'main': 'Rain',
                  'description': 'light rain',
                  'icon': '10d'
              }
          ],
          'clouds': {
              'all': 76
          },
          'wind': {
              'speed': 5.46,
              'deg': 235.505
          },
          'sys': {
              'pod': 'd'
          },
          'dt_txt': '2019-03-08 15:00:00'
      },
      {
          'dt': 1552068000,
          'main': {
              'temp': 8.83,
              'temp_min': 8.83,
              'temp_max': 8.83,
              'pressure': 1011.11,
              'sea_level': 1011.11,
              'grnd_level': 1003.56,
              'humidity': 65,
              'temp_kf': 0
          },
          'weather': [
              {
                  'id': 500,
                  'main': 'Rain',
                  'description': 'light rain',
                  'icon': '10n'
              }
          ],
          'clouds': {
              'all': 76
          },
          'wind': {
              'speed': 5.86,
              'deg': 228.502
          },
          'sys': {
              'pod': 'n'
          },
          'dt_txt': '2019-03-08 18:00:00'
      }
  ]};


  beforeEach(() => {
    mockWeatherService = jasmine.createSpyObj([
      'searchWeatherForCity'
    ]);
  });

  describe('loadWeatherForecastForCity$', () => {
    describe('when there is no weather forecast for the entered city in store', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            WeatherEffects,
            provideMockActions(() => action$),
            { provide: WeatherService, useValue: mockWeatherService },
            provideMockStore([
            {
              selector: weatherQuery.selectSearchedCityWeatherForecast,
              mockedValue: of(null)
            }])
          ]
        });
        effects = TestBed.get(WeatherEffects);
      });

      it('should return an observable of LoadWeatherForecastSuccess when the call is successfull', () => {
        mockWeatherService.searchWeatherForCity.and.returnValue(cold('-----u|', { u: weather }));
        action$ = hot('-----a', { a: LoadWeatherForecast(city) });

        const expected$ = cold('----------a', {
          a: LoadWeatherForecastSuccess(weather)
        });

        expect(effects.loadWeatherForecastForCity$).toBeObservable(expected$);
      });

      it('should call weather service searchWeatherForCity', () => {
        action$ = hot('---a', { a: LoadWeatherForecast(city) });
        mockWeatherService.searchWeatherForCity.and.returnValue(cold('---u|', { u: weather }));
        effects.loadWeatherForecastForCity$.subscribe(() => {
          expect(mockWeatherService.searchWeatherForCity).toHaveBeenCalledWith(city);
        });
      });

      it('should return an observable of LoadWeatherForecastError when the call is not successfull', () => {
        mockWeatherService.searchWeatherForCity.and.returnValue(cold('---#'));
        action$ = hot('-----a', { a: LoadWeatherForecast(city) });

        const expected$ = cold('--------a', {
          a: LoadWeatherForecastError('error' as any)
        });

        expect(effects.loadWeatherForecastForCity$).toBeObservable(expected$);
      });
    });

    describe('when there is already weather forecast for the entered city in store', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            WeatherEffects,
            provideMockActions(() => action$),
            { provide: WeatherService, useValue: mockWeatherService },
            provideMockStore([
            {
              selector: weatherQuery.selectSearchedCityWeatherForecast,
              mockedValue: of(weather)
            }])
          ]
        });
        effects = TestBed.get(WeatherEffects);
      });

      it('should not call weather service searchWeatherForCity', () => {
        action$ = hot('---a', { a: LoadWeatherForecast(city) });
        mockWeatherService.searchWeatherForCity.and.returnValue(cold('---u|', { u: weather }));
        effects.loadWeatherForecastForCity$.subscribe(() => {
          expect(mockWeatherService.searchWeatherForCity).not.toHaveBeenCalled();
        });
     });

     it('should return an observable that does not emit any value and does not complete', () => {
      mockWeatherService.searchWeatherForCity.and.returnValue(cold('-----u|', { u: weather }));
      action$ = hot('-----a', { a: LoadWeatherForecast(city) });

      const expected$ = cold('-');

      expect(effects.loadWeatherForecastForCity$).toBeObservable(expected$);
     });
   });
  });
});
