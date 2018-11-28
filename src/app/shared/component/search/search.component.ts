import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent {

    @Input() items: any[] = [];
    @Input() filteredProperty: string;
    @Output() searchCompleted = new EventEmitter();

    handleSearch(event: any) {
        const searchText = event.target.value;

        if (!this.items) {
            return this.searchCompleted.emit([]);
        }
        if (!searchText) {
            return this.searchCompleted.emit(this.items);
        }

        const filteredItems = this.items.filter((item) => {
            return item[this.filteredProperty].toLowerCase().includes(searchText.toLowerCase());
        });

        return this.searchCompleted.emit(filteredItems);

    }

}
