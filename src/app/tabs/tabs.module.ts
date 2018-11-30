import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {AboutPageModule} from '../about/about.module';
import {CardPageModule} from '../card/card.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        AboutPageModule,
        CardPageModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
