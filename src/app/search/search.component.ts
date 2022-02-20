import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input()
  parentComponent!:any;

  @Input()
  headerText!: string;

  searchString:string = '';

  onSearchClick() {
    this.parentComponent.searchString = this.searchString;
  }

}
