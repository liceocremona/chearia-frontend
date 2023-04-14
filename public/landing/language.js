let language_url = {
    en: "en.json",
    it: "it.json",
};

async function onload() {
    let language = "en";
    let url_lang = null;
    let urlQuery = new URLSearchParams(window.location.search);
    url_lang = urlQuery.get("lang");
    console.log(url_lang);
    if (url_lang == null && url_lang !== "en" && url_lang !== "it") {
        console.log("no lang");
        let browserLang = navigator.language;
        if (browserLang == "it" || browserLang == "it-IT") {
            language = "it";
        } else {
            language = "en";
        }
    } else {
        language = url_lang;
    }
    let url = language_url[language];
    let response = await fetch(url);
    let data = await response.json();
    Object.entries(data).forEach(([key, value]) => {
        let element = document.querySelector(`[content=${key}]`);
        if (element) {
            element.innerHTML = value;
        }
    })
}




onload();