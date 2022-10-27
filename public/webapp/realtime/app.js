var form = document.querySelector("#id_data")
let state = {
    showed_data: [],
    datasSource: new EventSource("https://api.progettochearia.it/v1/resources/datas_stream"),
}


state.datasSource.addEventListener("datas", async event => {
    let data = JSON.parse(event.data)

    if (data["metadata"]) {
        let dataid = data["metadata"]["id"];
        if (form[dataid].checked) {
            if (!document.querySelector(`#container_${dataid}`)) {
                let container = document.createElement("div");
                container.id = `container_${dataid}`;
                container.innerHTML = `<h2>${dataid}</h2>`;
                document.querySelector("#container_data").appendChild(container);
            };
            document.querySelector(`#container_${dataid}`).innerHTML += `
            <div>time: ${data["timestamp"]}<br> value: ${data["value"]}</div>`;
        }

    }
})

form.addEventListener("change", () => {
    let data = new FormData(form);
    let datas_id = data.getAll("dataid");
    let edit_data = state.showed_data
        .filter(dataid => { if (!datas_id.includes(dataid)) document.querySelector(`#container_${dataid}`).remove() })
    state.showed_data = datas_id;

})