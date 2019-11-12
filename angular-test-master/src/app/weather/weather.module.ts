import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from './weather.container';
import { WeatherService } from './weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { weatherForecastReducer, WeatherEffects, WEATHER_FORECAST_FEATURE_KEY, WEATHER_FORECAST_REDUCER_TOKEN } from './store';

export function weatherReducer() {
  return weatherForecastReducer;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(WEATHER_FORECAST_FEATURE_KEY, WEATHER_FORECAST_REDUCER_TOKEN),
    EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainerComponent
  ],
  providers: [
    WeatherService,
    {
      provide: WEATHER_FORECAST_REDUCER_TOKEN,
      useFactory: weatherReducer
    }
  ]
})
export class WeatherModule { }
