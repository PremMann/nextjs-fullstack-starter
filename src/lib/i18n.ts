import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import enCommon from "@/../public/locales/en/homepage.json";
import khCommon from "@/../public/locales/kh/homepage.json";

const resources = {
    en: { homepage: enCommon },
    kh: { homepage: khCommon },
};

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: 'en', // default language
            fallbackLng: 'en',
            ns: ['homepage'],
            defaultNS: 'homepage',
            interpolation: {
                escapeValue: false,
            },
        });
}
export default i18n;
