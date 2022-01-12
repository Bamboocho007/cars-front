import { HttpClient } from '@angular/common/http';
import {
  IModuleTranslation,
  IModuleTranslationOptions,
  Translation,
} from '@larscom/ngx-translate-module-loader';
import { TranslateLoader } from '@ngx-translate/core';
import {
  catchError,
  forkJoin as ForkJoin,
  map,
  mergeAll,
  MonoTypeOperatorFunction,
  Observable,
  ObservableInput,
  of,
} from 'rxjs';

const DEFAULT_PATH_TEMPLATE = '{baseTranslateUrl}/{moduleName}/{language}';
const PATH_TEMPLATE_REGEX = /{([^}]+)}/gi;
const PATH_CLEAN_REGEX = /([^:]\/)\/+/gi;
const concatJson = (path: string) => path.concat('.json');

export class CustomTranslateLoader implements TranslateLoader {
  private readonly defaultOptions: IModuleTranslationOptions = {
    disableNamespace: false,
    lowercaseNamespace: false,
    deepMerge: true,
    ...this.options,
  };

  /**
   * The ModuleTranslateLoader for 'ngx-translate/core'
   *
   * @description Fetch multiple translation files (http).
   *
   * @param http the HttpClient from 'angular/common'
   * @param options the configurable options for ModuleTranslateLoader
   *
   * @see https://github.com/larscom/ngx-translate-module-loader
   */
  constructor(
    private readonly http: HttpClient,
    private readonly options: IModuleTranslationOptions,
  ) {}

  public getTranslation(language: string): Observable<Translation> {
    const { defaultOptions: options } = this;
    return this.mergeTranslations(
      this.getModuleTranslations(language, options),
      options,
    );
  }

  private mergeTranslations(
    moduleTranslations: Observable<Translation>[],
    { deepMerge, translateMerger }: IModuleTranslationOptions,
  ): Observable<Translation> {
    return ForkJoin(moduleTranslations).pipe(
      map((translations) => {
        return translateMerger
          ? translateMerger(translations)
          : deepMerge
          ? mergeAll<ObservableInput<Translation>>(translations as any)
          : translations.reduce((acc, curr) => ({ ...acc, ...curr }), Object());
      }),
    );
  }

  private getModuleTranslations(
    language: string,
    options: IModuleTranslationOptions,
  ): Observable<Translation>[] {
    const { modules } = options;

    return modules.map((module) => {
      const { moduleName } = module;
      return moduleName
        ? this.fetchTranslationForModule(language, options, module)
        : this.fetchTranslation(language, options, module);
    });
  }

  private fetchTranslation(
    language: string,
    { translateError, version }: IModuleTranslationOptions,
    { pathTemplate, baseTranslateUrl, translateMap }: IModuleTranslation,
  ): Observable<Translation> {
    const pathOptions = Object({ baseTranslateUrl, language });
    const template = pathTemplate || DEFAULT_PATH_TEMPLATE;

    const cleanedPath = concatJson(
      template.replace(
        PATH_TEMPLATE_REGEX,
        (_, m1: string) => pathOptions[m1] || '',
      ),
    ).replace(PATH_CLEAN_REGEX, '$1');

    const path = version ? `${cleanedPath}?v=${version}` : cleanedPath;

    return this.http.get<Translation>(path).pipe(
      map((translation) =>
        translateMap ? translateMap(translation) : translation,
      ),
      this.catchError(cleanedPath, translateError),
    );
  }

  private fetchTranslationForModule(
    language: string,
    {
      disableNamespace,
      lowercaseNamespace,
      translateError,
      version,
    }: IModuleTranslationOptions,
    {
      pathTemplate,
      baseTranslateUrl,
      moduleName,
      namespace,
      translateMap,
    }: IModuleTranslation,
  ): Observable<Translation> {
    const pathOptions = Object({ baseTranslateUrl, moduleName, language });
    const template = pathTemplate || DEFAULT_PATH_TEMPLATE;

    const namespaceKey = namespace
      ? namespace
      : lowercaseNamespace
      ? moduleName!.toLowerCase()
      : moduleName!.toUpperCase();

    const cleanedPath = concatJson(
      template.replace(
        PATH_TEMPLATE_REGEX,
        (_, m1: string) => pathOptions[m1] || '',
      ),
    ).replace(PATH_CLEAN_REGEX, '$1');

    const path = version ? `${cleanedPath}?v=${version}` : cleanedPath;

    return this.http.get<Translation>(path).pipe(
      map((translation) => {
        return translateMap
          ? translateMap(translation)
          : disableNamespace
          ? translation
          : Object({ [namespaceKey]: translation });
      }),
      this.catchError(cleanedPath, translateError),
    );
  }

  private catchError<T>(
    path: string,
    translateError?: (error: any, path: string) => void,
  ): MonoTypeOperatorFunction<T> {
    return catchError((e) => {
      if (translateError) {
        translateError(e, path);
      }

      console.error('Unable to load translation file:', path);
      return of(Object());
    });
  }
}
