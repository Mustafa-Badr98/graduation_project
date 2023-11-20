
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import enTranslation from "./locales/en.json";
// import frTranslation from "./locales/fr.json";
import arTranslation from "../ar.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      
      ar: {
        translation: arTranslation,
      },
    },
    lng: "en", // set the default language
    fallbackLng: "en", // use English if the selected language file does not exist
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
