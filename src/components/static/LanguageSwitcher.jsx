// LanguageSwitcher.js
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(i18n.language);
  };

  return (
    <div>
      {i18n.language === "ar" ? (
        <>
          <button className="btn btn-dark rounded-5" onClick={() => changeLanguage("en")}>En</button>
        </>
      ) : (
        <>
          <button className="btn btn-dark rounded-5" onClick={() => changeLanguage("ar")}>Ar</button>
        </>
      )}
      {/* Add buttons for other languages as needed */}
    </div>
  );
};

export default LanguageSwitcher;
