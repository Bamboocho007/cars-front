import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateStore,
} from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';
import {
  IModuleTranslationOptions,
  ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';

export function moduleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      // final url: ./assets/i18n/en.json
      { baseTranslateUrl },
      // final url: ./assets/i18n/home/test/en.json
      { baseTranslateUrl, moduleName: 'home/test' },
    ],
  };

  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: moduleHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [],
  providers: [LocalStorageService, TranslateStore],
  exports: [HttpClientModule, TranslateModule],
})
export class CoreModule {}
