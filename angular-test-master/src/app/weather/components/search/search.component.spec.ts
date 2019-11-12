import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import Spy = jasmine.Spy;
import { Shallow } from 'shallow-render';
import { WeatherModule } from '../../weather.module';

describe('SearchComponent', () => {
  let shallow: Shallow<SearchComponent>;

  beforeEach(() => {
    shallow = new Shallow(SearchComponent, WeatherModule);
  });

  it('should emit citySearched event on click of search button', async () => {
    const { instance, find } = await shallow.render();
    const city = 'London';
    find('button').triggerEventHandler('click', city);

    instance.citySearched.subscribe((v) => {
      expect(v).toBe(city);
    });

    instance.search(city);
  });
});
