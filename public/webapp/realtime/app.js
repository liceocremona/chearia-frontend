var form = document.querySelector("#id_data")
let state = {
    showed_data: [],
    datasSource: new EventSource("https://api.progettochearia.it/v1/resources/datas_stream"),
}


state.datasSource.onmessage = (async event => { //quando viene ricevuto un data tramite sse dal server
    let data = JSON.parse(event.data)

    if (data["metadata"]) {
        let dataid = data["metadata"]["id"];
        if (form[dataid].checked) { //se la checkbox è selezionata
            try { //prova ad aggiungere il dato al div
                document.querySelector(`#container_${dataid}`).innerHTML += `
            <div class="data-ric">time: ${data["timestamp"]}<br> value: ${data["value"]}</div>`;
            } catch (e) {
                console.log("Error in add data to view")
            }
        }

    }
})

form.addEventListener("change", () => { //quando viene modificato il form
    let data = new FormData(form);
    let datas_id = data.getAll("dataid");
    let edit_data = state.showed_data
        .filter(dataid => { //se la checkbox era selezionata e non lo è più
            if (!datas_id.includes(dataid)) {
                document.querySelector(`#container_${dataid}`).remove()
            }
        })
        .concat(datas_id.filter(dataid => { //se la checkbox non era selezionata e lo è
            if (!state.showed_data.includes(dataid)) {
                let container = document.createElement("div");
                container.id = `container_${dataid}`;
                container.innerHTML = `<h4>${dataid}</h4>`;
                document.querySelector("#container_data").appendChild(container);
            }
        }))

    state.showed_data = datas_id;

})



//