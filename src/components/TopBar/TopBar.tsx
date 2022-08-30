import  React,{useEffect} from "react";
import './TopBar.css';
import { Link, } from "react-router-dom";
import  translations from "../../services/locale"
type TopBarProps = {
  //
};

const TopBar: React.FC<any> = () => {

  let jsonParsedTheme = JSON.parse(localStorage.getItem("Theme") as string)
  let jsonParsedLang = JSON.parse(localStorage.getItem("Language") as string)

  useEffect(()=>{
    if(jsonParsedTheme === null || jsonParsedTheme === "light" ) {
      document.body.classList.add( "light")
    } else{
      document.body.classList.add("dark")
    }
    },[jsonParsedTheme])

  useEffect(()=>{
    if(jsonParsedLang === null || jsonParsedLang === "en" ) {
      changeLang("en")
    } else{
      changeLang(jsonParsedLang)
    }
    },[jsonParsedLang])



    function changeLang(lang:string){
      locale = lang 
      document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
      document.querySelectorAll("[data-i18-val]").forEach(translateElement);
      let languageStringifyed = JSON.stringify(lang)
      localStorage.setItem("Language", languageStringifyed)

    }

    let locale = "en";

    function translateElement(element:any) {
      const key:string  = element.getAttribute("data-i18n-key");
      const translation = translations[locale][key] ;
      element.innerText = translation;
    
      const val = element.getAttribute("data-i18-val");
      const translation1 = translations[locale][val];
      element.value = translation1;
    }


    const changeTheme = (theme:any)=>{
      document.body.className = ""
      document.body.classList.add(theme)
      let themeStringifyed = JSON.stringify(theme)
      localStorage.setItem("Theme", themeStringifyed)
      
    }


    const showLanguagesSheet = ()=>{
      document.getElementById("languagesSheet")?.classList.toggle("hidden")
    }
    const showThemesSheet = ()=>{
      document.getElementById("themesSheet")?.classList.toggle("hidden")
    }

  return <div className="top">
    <div className="top_item">
    <Link to="" data-i18n-key="home"></Link>
    </div>
    <div className="top_item">
      top_item
    </div>
    <div className="top_item">
      top_item
    </div>

    <div className="top_item settings">
      <div className="top_item_language">
        <div className="" onClick={showLanguagesSheet}>
          <span className="top_item_language_name"data-i18n-key="language"></span>
          <div id="languagesSheet" className="languages hidden">
            <span className="languageSheetItem" onClick={()=>{changeLang("en")}} data-i18n-key="english"></span>
            <span className="languageSheetItem" onClick={()=>{changeLang("ua")}} data-i18n-key="ukraine"></span>
          </div>  
        </div>
      </div> 

      <div className="top_item_theme">
        <div onClick={showThemesSheet}>
        <span className="top_item_theme_name"data-i18n-key="theme"></span>
          <div id="themesSheet" className="languages hidden">
            <span className="themeSheetItem" onClick={()=>{changeTheme("dark")}} data-i18n-key="dark"></span>
            <span className="themeSheetItem" onClick={()=>{changeTheme("light")}} data-i18n-key="light"></span>
          </div>  
        </div>
      </div>
      
    </div>
  </div>;
};

export default TopBar;









