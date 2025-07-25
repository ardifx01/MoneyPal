import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import id from '../locales/id.json';
import ja from '../locales/ja.json';
import { storageUtils } from './storage';

const resources = {
  en: { translation: en },
  id: { translation: id },
  ja: { translation: ja },
};

let deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

(async () => {
  const lang = await storageUtils.dapatinBahasa();
  if (lang) {
    deviceLanguage = lang;
  }

  if(resources[deviceLanguage as "en"] === undefined) {
    deviceLanguage = 'en';
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: deviceLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
})();

export default i18n; 