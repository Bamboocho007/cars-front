import { HttpClient } from '@angular/common/http';
import { ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';
import { ModuleTranslationOptions } from './module-translation-options';

export function moduleHttpLoaderFactory(
  http: HttpClient,
): ModuleTranslateLoader {
  return new ModuleTranslateLoader(http, ModuleTranslationOptions);
}
