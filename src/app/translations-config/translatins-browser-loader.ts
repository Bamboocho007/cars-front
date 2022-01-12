import { HttpClient } from '@angular/common/http';
import { ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';
import { ModuleTranslationOptions } from './module-translation-options';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslateBrowserLoader implements TranslateLoader {
  constructor(private http: HttpClient, private transferState: TransferState) {}

  public getTranslation(lang: string): Observable<unknown> {
    const key: StateKey<{ [key: string]: string | object }> = makeStateKey<{
      [key: string]: string | object;
    }>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);

    if (data) {
      return new Observable((observer) => {
        observer.next(data);
        observer.complete();
      });
    } else {
      return new ModuleTranslateLoader(
        this.http,
        ModuleTranslationOptions,
      ).getTranslation(lang);
    }
  }
}

export function moduleHttpLoaderFactory(
  http: HttpClient,
  transferState: TransferState,
): TranslateBrowserLoader {
  return new TranslateBrowserLoader(http, transferState);
}
