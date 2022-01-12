import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizedRoutingService } from './services/localized-routing/localized-routing.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
    pathMatch: 'full',
  },
];

const languageRoutes: Routes = [
  {
    path: 'ru',
    children: routes,
  },
  {
    path: 'ua',
    children: routes,
  },
  {
    path: '**',
    redirectTo: 'ru',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(languageRoutes)],
  exports: [RouterModule],
  providers: [LocalizedRoutingService],
})
export class AppRoutingModule {
  constructor(private localizedRoutingService: LocalizedRoutingService) {
    localizedRoutingService.init();
  }
}
