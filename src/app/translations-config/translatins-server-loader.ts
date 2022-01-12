import { IModuleTranslationOptions } from '@larscom/ngx-translate-module-loader';
import { TranslateLoader } from '@ngx-translate/core';
import {
  TransferState,
  makeStateKey,
  StateKey,
} from '@angular/platform-browser';
import { join, resolve } from 'path';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { ModuleTranslationOptions } from './module-translation-options';

export function moduleServerLoaderFactory(
  transferState: TransferState,
): TranslateServerLoader {
  return new TranslateServerLoader(transferState, ModuleTranslationOptions);
}

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private options: IModuleTranslationOptions,
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const browserFolder = join(
        process.cwd(),
        'dist',
        'cars-project-frontend',
        'browser',
      );

      const jsonsData: { [key: string]: string }[] = this.options.modules.map(
        (module) => {
          return JSON.parse(
            fs.readFileSync(
              resolve(
                browserFolder,
                module.baseTranslateUrl,
                module.moduleName || '',
                `${lang}.json`,
              ),
              'utf8',
            ),
          );
        },
      );

      const mergedData = this.options.modules.reduce<{
        [key: string]: string | object;
      }>((acc, next, index) => {
        if (!next.moduleName) {
          acc = { ...acc, ...jsonsData[index] };
        } else {
          acc[next.moduleName.toUpperCase()] = jsonsData[index];
        }
        return acc;
      }, {});

      const key: StateKey<{ [key: string]: string | object }> = makeStateKey<{
        [key: string]: string | object;
      }>('transfer-translate-' + lang);
      this.transferState.set(key, mergedData);

      observer.next(mergedData);
      observer.complete();
    });
  }
}
