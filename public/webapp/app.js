let data_form = document.querySelector("#data-picker")

data_form.querySelector("#date-picker").addEventListener("change", e => {
    let value = e.target.value;
    data_form.querySelector(`#${value}-picker`).style.display = "block";
    let hide_value = ["day", "range"][1 - ["day", "range"].indexOf(value)];
    data_form.querySelector(`#${hide_value}-picker`).style.display = "none";
});

function data_required(advise) {

    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "data-required");
    let text = document.createTextNode(advise);
    newDiv.appendChild(text);
    data_form.append(newDiv);

}

function formatDate(date) {
    let day = date.getDate().toString();
    if (day.length == 1) day = "0" + day;
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) month = "0" + month;
    let year = date.getFullYear().toString();
    let hour = date.getHours().toString();
    if (hour.length == 1) hour = "0" + hour;
    let minute = date.getMinutes().toString();
    if (minute.length == 1) minute = "0" + minute;
    let second = date.getSeconds().toString();
    if (second.length == 1) second = "0" + second;
    return `${year}-${month}-${day}_${hour}:${minute}:${second}`;
}

data_form.addEventListener("submit", e => { //quando si manda il form
    e.preventDefault();
    let formData = new FormData(data_form);
    if (document.querySelector("#url-link")) {
        document.querySelector("#url-link").remove();
    }
    if (document.querySelector("#data-required")) {
        document.querySelector("#data-required").remove();
    }
    if (!formData.has("dataid")) {
        data_required("perfavore inserire un tipo di dato");
        return;

    }
    let opt = formData.get("select-type")
    if (opt === "day" && formData.get("day") !== "") {
        formData.delete("lte");
        formData.delete("gte");

    } else if (opt === "range" && formData.get("lte") !== "" && formData.get("gte") !== "") {
        let gte = new Date(formData.get("gte"));
        let lte = new Date(formData.get("lte"));
        console.log(gte.toLocaleString())
        let gte_str = formatDate(gte);
        let lte_str = formatDate(lte);
        formData.set("gte", gte_str);
        formData.set("lte", lte_str);


        if (!(gte < lte)) {
            data_required("la data di fine deve essere maggiore della data di inizio");
            return;
        }

        formData.delete("day");
    } else {
        data_required("perfavore seleziona una data");
        return;
    }
    formData.delete("select-type");


    let search = new URLSearchParams(formData);

    let url = `https://api.progettochearia.it/v1/resources/datas?${search.toString()}`;
    let url_link = document.createElement("a")
    url_link.setAttribute("href", url);
    url_link.setAttribute("target", "_blank");
    url_link.setAttribute("id", "url-link");
    url_link.appendChild(document.createTextNode(url));
    document.querySelector("#url-result").append(url_link);
    console.log(url);

})