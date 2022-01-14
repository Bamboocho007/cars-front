import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  LocalizeRouterModule,
  LocalizeParser,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { localizeRouterBrowserLoaderFactory } from './translations-config/localize-router-browser.loader';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'disabled' }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeRouterBrowserLoaderFactory,
        deps: [
          TranslateService,
          Location,
          LocalizeRouterSettings,
          HttpClient,
          TransferState,
        ],
      },
      initialNavigation: true,
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
