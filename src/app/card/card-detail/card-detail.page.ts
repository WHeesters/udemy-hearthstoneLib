import {Component} from '@angular/core';
import {Card} from '../shared/card.model';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../shared/card.service';
import {LoaderService} from '../../shared/service/loader.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html',
    styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage {

    cardId: string;
    card: any;
    imageUrl = 'assets/image/DefaultCard.png';

    constructor(private route: ActivatedRoute, private cardService: CardService, private loaderService: LoaderService) {

    }


    ionViewWillEnter() {
        this.cardId = this.route.snapshot.paramMap.get('cardId');

        this.loaderService.presentLoading();

        this.cardService.getCardById(this.cardId).subscribe(
            (card: Card[]) => {
                this.card = card.map((card: Card) => {
                    card.text = card.text ? card.text.replace(new RegExp('\\\\n', 'g'), '</br>') : 'No description';
                    card.img = card.img ? this.imageUrl = card.img : card.img = this.imageUrl;
                    return card;
                })[0];
                this.loaderService.dissmissLoading();
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
