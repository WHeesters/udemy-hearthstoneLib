import {Component} from '@angular/core';
import {Card} from '../shared/card.model';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../shared/card.service';
import {LoaderService} from '../../shared/service/loader.service';
import {ToastService} from '../../shared/service/toast.service';
import {FavoriteCardStore} from '../shared/card-favorite.store';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html',
    styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage {

    cardId: string;
    card: any;
    imageUrl = 'assets/image/DefaultCard.png';
    favoriteCards: any = {};


    constructor(private route: ActivatedRoute,
                private cardService: CardService,
                private loaderService: LoaderService,
                private toaster: ToastService,
                private favoriteCardStore: FavoriteCardStore) {
        this.favoriteCardStore.favoriteCards.subscribe(
            (favoriteCards: any) => {
                this.favoriteCards = favoriteCards;
            }
        );

    }


    ionViewWillEnter() {
        this.cardId = this.route.snapshot.paramMap.get('cardId');
        this.getCard();

    }

    getCard() {
        this.loaderService.presentLoading();

        this.cardService.getCardById(this.cardId).subscribe(
            (card: Card[]) => {
                this.card = card.map((card: Card) => {
                    card.text = card.text ? card.text.replace(new RegExp('\\\\n', 'g'), '</br>') : 'No description';
                    card.img = card.img ? this.imageUrl = card.img : card.img = this.imageUrl;
                    card.favorite = this.cardIsFavorite(card.cardId);
                    return card;
                })[0];
                this.loaderService.dissmissLoading();
            }, () => {
                this.loaderService.dissmissLoading();
                this.toaster.presentErrorToast('Card couldn\'t be loaded.');
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

    doRefresh(event) {
        this.getCard();

        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    favoriteCard(card: Card) {
        this.favoriteCardStore.toggleFavorite(card);
    }

    private cardIsFavorite(cardId: string): boolean {
        const card = this.favoriteCards[cardId];
        return card ? true : false;
    }
}
