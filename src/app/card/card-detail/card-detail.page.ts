import {Component} from '@angular/core';
import {Card} from '../shared/card.model';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../shared/card.service';

@Component({
	selector: 'app-card-detail',
	templateUrl: './card-detail.page.html',
	styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage {

	cardId: string;
	card: any;
	imageUrl = 'assets/image/DefaultCard.png';

	constructor(private route: ActivatedRoute, private cardService: CardService) {

	}


	ionViewWillEnter() {
		this.cardId = this.route.snapshot.paramMap.get('cardId');

		this.cardService.getCardById(this.cardId).subscribe(
			(card: Card[]) => {
				this.card = card[0];
				if (this.card.img) {
					this.imageUrl = this.card.img;
				}
			}
		);
	}

	changeImage() {
		if (this.imageUrl === this.card.img) {
			this.imageUrl = this.card.imgGold;
		} else {
			this.imageUrl = this.card.img;
		}
	}

	updateImage() {
		this.imageUrl = 'assets/image/DefaultCard.png';
	}
}
