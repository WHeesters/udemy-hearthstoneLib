import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class ToastService {

    constructor(public toastController: ToastController) {
    }


    async presentErrorToast(message: string) {
        const toast = await this.toastController.create({
            message,
            position: 'bottom',
            duration: 3000,
            cssClass: 'toast-error'
        });
        toast.present();
    }

}
