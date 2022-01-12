import { IModuleTranslationOptions } from '@larscom/ngx-translate-module-loader';

const baseTranslateUrl = './assets/i18n';
export const ModuleTranslationOptions: IModuleTranslationOptions = {
  modules: [
    // final url: ./assets/i18n/en.json
    { baseTranslateUrl },
    // final url: ./assets/i18n/home/en.json
    { baseTranslateUrl, moduleName: 'home' },
    // final url: ./assets/i18n/home/nested/en.json
    { baseTranslateUrl, moduleName: 'home/nested' },
  ],
};
