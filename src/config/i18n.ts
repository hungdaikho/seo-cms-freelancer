import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import bn from './bn.json';

const resources = {
  en: { translation: en },
  ph: { translation: bn },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ph', 
    fallbackLng: 'ph',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n; 