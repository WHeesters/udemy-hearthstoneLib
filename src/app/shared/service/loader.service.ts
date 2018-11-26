import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable()
export class LoaderService {
	private loader;

	constructor(private loadingCtrl: LoadingController) {

	}

	public async presentLoading() {
		this.loader = await this.loadingCtrl.create({
			content: 'Loading...',
			translucent: true
		});

		this.loader.present();
		return this.loader;
	}

	public dissmissLoading() {
		if (this.loader) {
			this.loader.dismiss();
		}
	}

}
