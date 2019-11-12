import { on, reducer } from 'ts-action';
import { WeatherList, Forecast } from '../../../model/weather';
import { LoadWeatherForecast, LoadWeatherForecastError, LoadWeatherForecastSuccess } from '../actions/weather';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export const WEATHER_FORECAST_FEATURE_KEY = 'weather';

export const WEATHER_FORECAST_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<WeatherForecastState>
>('weather reducers');

export interface WeatherForecastEntities {
    [name: string]: {
    [dt: number]: Forecast
  };
}

export interface WeatherForecastState {
  cities: WeatherForecastEntities;
  loading: boolean;
  searchedCity: string;
  errors: Error[];
}

export const initialState: WeatherForecastState = {
  cities: {},
  errors: [],
  loading: false,
  searchedCity: null
};


export const weatherForecastReducer = reducer<WeatherForecastState>(
  [
    on(LoadWeatherForecast, (state, { payload }) => {
      return {
        ...state,
        loading: true,
        searchedCity: payload
      };
    }),

    on(LoadWeatherForecastError, (state, { payload }) => {
      const errors = [ ...state.errors, payload ];
      return {
        ...state,
        errors,
        searchedCity: null
      };
    }),

    on(LoadWeatherForecastSuccess, (state, { payload }) => {
      const forecasts = payload.list;
      const entities = forecasts.reduce((previous: { [dt: number]: Forecast }, forecast: WeatherList) => {
        return {
          ... previous,
          [forecast.dt]: forecast.main,
        };
      }, {});

      const cities = {
        ... state.cities,
        [payload.city.name.toLowerCase()]: entities
      };

      return {
        ...state,
        cities,
        searchedCity: null
      };
    })
  ],
  initialState
);
