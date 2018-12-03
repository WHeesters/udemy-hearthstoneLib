import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {Firebase} from '@ionic-native/firebase/ngx';

import {FcmService} from './shared/service/fcm.service';
import {ToastService} from './shared/service/toast.service';

const config = {
    apiKey: 'AIzaSyBRR41-M9FB-AsMIHwtp7cgjTaOQATFBhY',
    authDomain: 'hearthstonelib-1981d.firebaseapp.com',
    databaseURL: 'https://hearthstonelib-1981d.firebaseio.com',
    projectId: 'hearthstonelib-1981d',
    storageBucket: 'hearthstonelib-1981d.appspot.com',
    messagingSenderId: '125654655012'
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Firebase,
        FcmService,
        ToastService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
