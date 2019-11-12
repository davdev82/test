import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherContainerComponent } from './weather.container';
import { WeatherForecastEntities, weatherQuery, LoadWeatherForecast } from './store';
import { Shallow } from 'shallow-render/dist';
import { WeatherModule } from './weather.module';
import { provideMockStore } from '../test-helpers/store.mock.spec';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { SearchComponent } from './components/search/search.component';

describe('WeatherContainer', () => {
  let shallow: Shallow<WeatherContainerComponent>;
  let destroy$: Subject<void>;
  let observer;

  const weather: WeatherForecastEntities = {
    'london': {
      1551992400: {
        'temp': 7.65,
        'temp_min': 7.65,
        'temp_max': 7.77,
        'pressure': 998.74,
        'sea_level': 998.74,
        'grnd_level': 991.27,
        'humidity': 73,
        'temp_kf': -0.13
      },
      1552003200: {
        'temp': 7.38,
        'temp_min': 7.38,
        'temp_max': 7.47,
        'pressure': 1003.27,
        'sea_level': 1003.27,
        'grnd_level': 995.76,
        'humidity': 75,
        'temp_kf': -0.1
      }
    },
    'mumbai': {
      1551992400: {
        'temp': 27.55,
        'temp_min': 25.65,
        'temp_max': 29.77,
        'pressure': 998.74,
        'sea_level': 998.74,
        'grnd_level': 991.27,
        'humidity': 73,
        'temp_kf': -0.13
      },
      1552003200: {
        'temp': 32.55,
        'temp_min': 30.65,
        'temp_max': 35.77,
        'pressure': 998.74,
        'sea_level': 998.74,
        'grnd_level': 991.27,
        'humidity': 73,
        'temp_kf': -0.13
      }
    }
  };

  const city = 'London';

  beforeEach(() => {
    shallow = new Shallow(WeatherContainerComponent, WeatherModule)
              .provide(provideMockStore([{
                selector: weatherQuery.getAllCities,
                mockedValue: weather
              }]))
              .dontMock(Store);
  });

  it('should dispatch LoadWeatherForecast action on store when a city is searched', async () => {
    const { findComponent, get } = await shallow.render();
    findComponent(SearchComponent).citySearched.emit(city);
    const store$ = get(Store);
    expect(store$.dispatch).toHaveBeenCalledWith(LoadWeatherForecast(city));
  });

  describe('citiesForecast$', () => {
    beforeEach(() => {
      destroy$ = new Subject();
      observer = jasmine.createSpy('citiesForecast$ observer');
    });

    it('should emit all weather forecasts from store after subscribing', async () => {
      const { instance } = await shallow.render();
      instance.citiesForecast$.pipe(takeUntil(destroy$)).subscribe(observer);
      expect(observer).toHaveBeenCalledWith(weather);
    });

    afterEach(() => {
      destroy$.next();
      destroy$.complete();
    });
  });
});
