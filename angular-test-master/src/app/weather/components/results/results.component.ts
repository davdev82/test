import { Component, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { WeatherForecastEntities } from '../../store';
import { Forecast } from '../../../model/weather';
import * as moment from 'moment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnChanges {
  @Input() searchResults: WeatherForecastEntities = {};

  searchResultsAsArray;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
     // tslint:disable-next-line:no-debugger
     debugger;
    const { searchResults } = changes;
    if (searchResults) {
      this.searchResultsAsArray = [];
      for (const iterator of Object.entries(searchResults.currentValue)) {
        const temp = [iterator[0], Object.entries(iterator[1])];
        this.searchResultsAsArray.push(temp);
      }
    }
  }

  formatDt(dt: number) {
    return moment.unix(dt).format('hA');
  }
}


