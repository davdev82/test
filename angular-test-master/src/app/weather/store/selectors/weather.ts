import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherForecastState, WEATHER_FORECAST_FEATURE_KEY, WeatherForecastEntities } from '../reducers/weather';

const getWeatherForecastState = createFeatureSelector<WeatherForecastState>(WEATHER_FORECAST_FEATURE_KEY);

export const getWeatherLoading = createSelector(
  getWeatherForecastState,
  (state: WeatherForecastState) => state.loading
);

export const getErrors = createSelector(
  getWeatherForecastState,
  (state: WeatherForecastState) => state.errors
);

export const getAllCities = createSelector(
  getWeatherForecastState,
  (state: WeatherForecastState) => state.cities
);

export const selectSearchedCity = createSelector(
  getWeatherForecastState,
  (state: WeatherForecastState) => state.searchedCity
);

export const selectSearchedCityWeatherForecast = createSelector(
  getAllCities,
  selectSearchedCity,
  (state: WeatherForecastEntities, searchedCity: string) => searchedCity ? state[searchedCity.toLowerCase()] : null
);

export const weatherQuery = {
  getWeatherLoading,
  getErrors,
  getAllCities,
  selectSearchedCity,
  selectSearchedCityWeatherForecast
};
