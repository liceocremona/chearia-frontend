let language_url = {
    en: "en.json",
    it: "it.json",
};//File where traduction are located

async function onload() {
    let language = "en";
    let url_lang = null;
    let urlQuery = new URLSearchParams(window.location.search);
    url_lang = urlQuery.get("lang");//read url wuey to check if is present languiage
    console.log(url_lang);
    if (url_lang == null && url_lang !== "en" && url_lang !== "it") {
        console.log("no lang");
        let browserLang = navigator.language;//check browser language
        if (browserLang == "it" || browserLang == "it-IT") {
            language = "it";
        } else {
            language = "en";
        }
    } else {
        language = url_lang;
    }
    let curr_path = window.location.pathname
    if (curr_path.endsWith("/")) {
        let url = curr_path + language_url[language];
    }
    else {
        let url = curr_path + "/" + language_url[language];
    }
    let response = await fetch(url);
    console.log(url);
    let data = await response.json();
    Object.entries(data).forEach(([key, value]) => {
        let element = document.querySelector(`[content=${key}]`);
        if (element) {
            element.innerHTML = value;
        }
    })
}




onload();