import {Routes} from '@angular/router';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {RadarViewerComponent} from './components/radar-viewer/radar-viewer.component';
import {loginGuard} from './guards/login.guard'
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginViewComponent, canActivate: [loginGuard]},
  {path: 'radar', component: RadarViewerComponent, canActivate: [authGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'}
];
