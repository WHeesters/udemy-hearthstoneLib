import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Card} from './card.model';

@Injectable()
export class FavoriteCardStore {
    private _favoriteCardsSubject = new BehaviorSubject({});

    constructor(private storage: Storage) {

    }

    get favoriteCards(): Observable<any> {
        return this._favoriteCardsSubject.asObservable();
    }

    public toggleFavorite(card: Card) {
        const favoriteCards = this._favoriteCardsSubject.getValue();

        if (card.favorite) {
            card.favorite = false;
            delete favoriteCards[card.cardId];
        } else {
            card.favorite = true;
            favoriteCards[card.cardId] = card;
        }

        this.storage.set('favoriteCards', favoriteCards).then(() => {
            this._favoriteCardsSubject.next(favoriteCards);
        });
    }

    private loadInitData() {
        this.storage.get('favoriteCards').then(
            (favoriteCards) => {
                this._favoriteCardsSubject.next(favoriteCards || {});
            });
    }
}
