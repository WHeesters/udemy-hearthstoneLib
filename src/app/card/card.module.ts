import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardDeckPage} from './card-deck/card-deck.page';

import {CardService} from './shared/card.service';

@NgModule({
	imports: [
		IonicModule,
		CommonModule
	],
	providers: [
		CardService
	],
	declarations: [
		CardDeckPage
	]
})
export class CardPageModule {

}