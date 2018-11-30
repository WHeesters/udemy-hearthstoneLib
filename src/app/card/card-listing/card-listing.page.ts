import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';

import {CardService} from '../shared/card.service';

import {Card} from '../shared/card.model';
import {LoaderService} from '../../shared/service/loader.service';
import {ToastService} from '../../shared/service/toast.service';
import {FavoriteCardStore} from '../shared/card-favorite.store';


@Component({
    selector: 'app-card-listing',
    templateUrl: './card-listing.page.html',
    styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

    cardDeckGroup: string;
    cardDeck: string;
    cards: Card[] = [];
    copyOfCards: Card[] = [];
    isLoading = false;

    favoriteCards: any = {};

    constructor(private route: ActivatedRoute,
                private cardService: CardService,
                private loaderService: LoaderService,
                private toaster: ToastService,
                private storage: Storage,
                private favoriteCardStore: FavoriteCardStore) {

        this.favoriteCardStore.favoriteCards.subscribe(
            (favoriteCards: any) => {
                this.favoriteCards = favoriteCards;
            }
        );
    }

    ionViewWillEnter() {
        this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
        this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');

        if (this.cards && this.cards.length === 0) {
            this.getCards();
        }

    }

    doRefresh(event) {
        this.getCards();

        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    hydrateCards(cards: Card[]) {
        this.cards = cards;
        this.isLoading = false;
    }

    handleSearch() {
        this.isLoading = true;
    }

    favoriteCard(card: Card) {
        this.favoriteCardStore.toggleFavorite(card);
    }

    private getCards() {
        this.loaderService.presentLoading();

        this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).subscribe(
            (cards: Card[]) => {
                this.cards = cards.map((card: Card) => {
                    card.text = card.text ? card.text.replace(new RegExp('\\\\n', 'g'), ', ') : 'No description';
                    card.favorite = this.cardIsFavorite(card.cardId);
                    return card;
                });
                this.copyOfCards = Array.from(this.cards);
                this.loaderService.dissmissLoading();
            }, () => {
                this.loaderService.dissmissLoading();
                this.toaster.presentErrorToast('Cards couldn\'t be loaded.');
            }
        );
    }

    private cardIsFavorite(cardId: string): boolean {
        const card = this.favoriteCards[cardId];
        return card ? true : false;
    }


}
