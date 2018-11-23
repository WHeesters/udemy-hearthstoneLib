export interface CardDeck {
	name: string;
	types: string[];

}

export interface Card {
	cardId: string;
	name: string;
	attack: number;
	health: number;
	img: string;
	imgGold: string;
	cardSet: string;
	cost: number;
	dbfId: string;
	faction: string;
	locale: string;
	playerClass: string;
	rarity: string;
	type: string;
	text: string;
	race: string;

}
