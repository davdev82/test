import { action, payload, union } from 'ts-action';
import { Weather } from '../../../model/weather';

export enum WeatherForecastActionTypes {
  LoadWeatherForecast = '[Weather] Load weather forecast for city',
  LoadWeatherForecastSuccess = '[Weather] Weather forecast for city loaded successfully',
  LoadWeatherForecastError = '[Addresses] Loading weather forecast for city errored'
}

export const LoadWeatherForecast = action(WeatherForecastActionTypes.LoadWeatherForecast, payload<string>());
export const LoadWeatherForecastSuccess = action(WeatherForecastActionTypes.LoadWeatherForecastSuccess, payload<Weather>());
export const LoadWeatherForecastError = action(WeatherForecastActionTypes.LoadWeatherForecastError, payload<Error>());

const WeatherForecastActions = union({
  LoadWeatherForecast,
  LoadWeatherForecastSuccess,
  LoadWeatherForecastError
});

export type WeatherActions = typeof WeatherForecastActions;
