/**
 *  Multi-Language Support
 *  https://react.i18next.com/
 */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// The following code loads up the language translations we will be using in our app.
const resources = {
    en: { translation: require("./assets/i18n/translations/en.json"), },
    es: { translation: require("./assets/i18n/translations/es.json"), },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)

  // passes i18n down to react-i18next
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    // lng: "en", // no need for this as our `LanguageDetector` handles this.
    fallbackLng: "en", // use en if detected lng is not available
    debug: true,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
