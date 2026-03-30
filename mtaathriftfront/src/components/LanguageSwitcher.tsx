import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function LanguageSwitcher() {

  const { language, switchLanguage } = useContext(LanguageContext);

  return (
    <button className="language-btn" onClick={switchLanguage}>
      {language === "en" ? "Kiswahili" : "English"}
    </button>
  );
}

export default LanguageSwitcher;