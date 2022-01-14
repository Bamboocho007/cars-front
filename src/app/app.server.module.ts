import { NgModule } from '@angular/core';
import { Location } from '@angular/common';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { moduleServerLoaderFactory } from './translations-config/translatins-server-loader';
import { TransferState } from '@angular/platform-browser';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import { Routes } from '@angular/router';
import { localizeRouterServerLoaderFactory } from './translations-config/localize-router-server.loader';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: moduleServerLoaderFactory,
        deps: [TransferState],
      },
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeRouterServerLoaderFactory,
        deps: [
          TranslateService,
          Location,
          LocalizeRouterSettings,
          TransferState,
        ],
      },
      initialNavigation: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
