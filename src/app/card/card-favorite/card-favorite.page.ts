import {Component} from '@angular/core';
import {FavoriteCardStore} from '../shared/card-favorite.store';
import {Subscription} from 'rxjs';
import {Card} from '../shared/card.model';

@Component({
    selector: 'app-card-favorite',
    templateUrl: './card-favorite.page.html',
    styleUrls: ['./card-favorite.page.scss'],
})
export class CardFavoritePage {

    favoriteCards: any = {};
    cards: Card[] = [];
    copyOfCards: Card[] = [];
    isLoading = false;
    favoriteCardsSub: Subscription;


    constructor(private favoriteCardStore: FavoriteCardStore) {
        this.favoriteCardsSub = this.favoriteCardStore.favoriteCards.subscribe(
            (favoriteCards: any) => {
                this.favoriteCards = this.getFavoriteCardList(favoriteCards);

            }
        );
    }

    ionicViewDidLeave() {
        if (this.favoriteCardsSub && !this.favoriteCardsSub.closed) {
            this.favoriteCardsSub.unsubscribe();
        }
    }

    doRefresh(event) {
        this.getFavoriteCardList(this.favoriteCards);

        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    favoriteCard(card: Card) {
        this.favoriteCardStore.toggleFavorite(card);
    }

    private getFavoriteCardList(favoriteCards: any): Card[] {
        if (favoriteCards) {
            return Object.keys(favoriteCards)
                .filter(key => favoriteCards[key])
                .map(key => favoriteCards[key]);
        }

        return [];
    }

}
