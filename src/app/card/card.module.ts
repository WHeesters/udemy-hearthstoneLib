import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {CardDeckPage} from './card-deck/card-deck.page';
import {CardListingPage} from './card-listing/card-listing.page';
import {CardDetailPage} from './card-detail/card-detail.page';

import {CardService} from './shared/card.service';

import {CardListComponent} from './components/card-list.component';
import {LoaderService} from '../shared/service/loader.service';
import {ToastService} from '../shared/service/toast.service';
import {SearchComponent} from '../shared/component/search/search.component';
import {FavoriteCardStore} from './shared/card-favorite.store';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        HttpClientModule
    ],
    providers: [
        CardService,
        LoaderService,
        ToastService,
        FavoriteCardStore
    ],
    declarations: [
        CardDeckPage,
        CardListingPage,
        CardDetailPage,
        CardListComponent,
        SearchComponent
    ]
})
export class CardPageModule {

}
