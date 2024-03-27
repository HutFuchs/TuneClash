import { Routes } from '@angular/router';
import { MainViewComponent } from './Views/main-view/main-view.component';
import { DetailViewComponent } from './Views/detail-view/detail-view.component';
import { VersusComponent } from './Views/versus/versus.component';

export const routes: Routes = [
	{ path: '', component: MainViewComponent },
	{ path: 'versus', component: VersusComponent },
];
