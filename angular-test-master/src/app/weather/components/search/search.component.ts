import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Output() citySearched = new EventEmitter<string>();

  constructor() { }

  search(city: string) {
    this.citySearched.emit(city);
  }
}
