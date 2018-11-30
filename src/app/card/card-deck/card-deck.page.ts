import {Component} from '@angular/core';
import {CardService} from '../shared/card.service';
import {CardDeck} from '../shared/card.model';
import {ToastService} from '../../shared/service/toast.service';
import {LoaderService} from '../../shared/service/loader.service';

@Component({
    selector: 'app-card-deck',
    templateUrl: './card-deck.page.html',
    styleUrls: ['./card-deck.page.scss']
})

export class CardDeckPage {

    public cardDecks: CardDeck[] = [];
    private readonly ALLOWED_DECKS = ['classes', 'factions', 'qualities', 'types', 'races'];

    constructor(private cardService: CardService,
                private toaster: ToastService,
                private loaderService: LoaderService) {
        this.getCardDecks();
    }

    extractAllowedDecks(cardDecks: CardDeck[]) {
        this.ALLOWED_DECKS.forEach((deckName: string) => this.cardDecks.push({name: deckName, types: cardDecks[deckName]}));
    }

    generateUrl(cardDeckGroup: string, cardDeck: string): string {
        return `/tabs/(card:card/${cardDeckGroup}/${cardDeck}`;

    }

    doRefresh(event) {
        this.cardDecks = [];
        this.getCardDecks();

        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    private getCardDecks() {
        this.cardService.getAllCardDecks().subscribe(
            (cardDecks: CardDeck[]) => {
                this.extractAllowedDecks(cardDecks);
                this.loaderService.dissmissLoading();
            }, () => {
                this.loaderService.dissmissLoading();
                this.toaster.presentErrorToast('Card decks couldn\'t be loaded.');
            });
    }

}
