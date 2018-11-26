import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CardService} from '../shared/card.service';

import {Card} from '../shared/card.model';
import {LoaderService} from '../../shared/service/loader.service';

@Component({
	selector: 'app-card-listing',
	templateUrl: './card-listing.page.html',
	styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

	cardDeckGroup: string;
	cardDeck: string;
	cards: Card[] = [];

	constructor(private route: ActivatedRoute, private cardService: CardService, private loaderService: LoaderService) {
	}

	ionViewWillEnter() {
		this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
		this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');

		this.loaderService.presentLoading();

		this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).subscribe(
			(cards: Card[]) => {
				this.cards = cards.map((card: Card) => {
					card.text = card.text ? card.text.replace(new RegExp('\\\\n', 'g'), ', ') : 'No description';
					return card;
				});
				this.loaderService.dissmissLoading();
			}
		);

	}


}
