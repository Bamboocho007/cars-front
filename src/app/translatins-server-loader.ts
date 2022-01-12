import { IModuleTranslationOptions } from '@larscom/ngx-translate-module-loader';
import { TranslateLoader } from '@ngx-translate/core';
import { join, resolve } from 'path';
import { Observable } from 'rxjs';
import * as fs from 'fs';

export function moduleServerLoaderFactory(): TranslateServerLoader {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      { baseTranslateUrl },
      { baseTranslateUrl, moduleName: 'home' },
      { baseTranslateUrl, moduleName: 'home/nested' },
    ],
  };

  return new TranslateServerLoader(options);
}

export class TranslateServerLoader implements TranslateLoader {
  constructor(private options: IModuleTranslationOptions) {}

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

      observer.next(mergedData);
      observer.complete();
    });
  }
}
