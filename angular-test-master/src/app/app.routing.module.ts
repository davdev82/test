import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherContainerComponent } from './weather/weather.container';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WeatherContainerComponent
  }
];
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
