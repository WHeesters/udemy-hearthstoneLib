import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent {

    @Input() items: any[] = [];
    @Input() filteredProperty: string;
    @Output() searchCompleted = new EventEmitter();

    private searchSubject = new BehaviorSubject<string>('');

    handleSearch(event: any) {

        this.searchSubject.next(event.target.value);


    }

    ngAfterViewInit() {
        this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(searchText => {
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
        });
    }

}
