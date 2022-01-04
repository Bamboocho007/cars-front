import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';
import { CoreModule } from './core/core/core.module';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule,
    AppRoutingModule,
    AuthModule,
    ApiModule,
    HttpClientModule,
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'home',
      multi: true,
    },
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'home/nested', alias: 'nested' },
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
