const form = document.querySelector('form');
const paragrafo = document.querySelector('p');
const tempgraphtime = document.getElementById('temp-graph-time');
const tempgraphmeasurements = document.getElementById('temp-graph-measurements');
const humgraphtime = document.getElementById('hum-graph-time');
const humgraphmeasurements = document.getElementById('hum-graph-measurements');
const pressuregraphtime = document.getElementById('pressure-graph-time');
const pressuregraphmeasurements = document.getElementById('pressure-graph-measurements');
const cographtime = document.getElementById('co-graph-time');
const cographmeasurements = document.getElementById('co-graph-measurements');
const o3graphtime = document.getElementById('o3-graph-time');
const o3graphmeasurements = document.getElementById('o3-graph-measurements');
const ftime = document.getElementById('time');
const fmeasurements = document.getElementById('measurements');
form.onsubmit = function(e){
    let data = document.getElementById("date").value;
    if(ftime.checked){
        ftime.value = 'true';
        console.log(ftime.value);
    }else{
        ftime.value = 'false';
        console.log(ftime.value);
    }
    if(fmeasurements.checked){
        fmeasurements.value = 'true';
        console.log(fmeasurements.value);
    }else{
        fmeasurements.value = 'false';
        console.log(fmeasurements.value);
    }
    
    if((data == '')||(ftime.value == 'false' && fmeasurements.value == 'false')){
        e.preventDefault();
        paragrafo.innerHTML = 'Inserisci un parametro';
        
    }
    else{
        paragrafo.innerHTML = '';
        e.preventDefault();
        console.log(data);
        let newData= data.split('-');
        let year = newData[0];
        let month = newData[1];
        let day = newData[2];
        let dataeu = day + ('-') + month + ('-') + year;
        console.log(dataeu);
        if(ftime.value == 'true'){
            tempgraphtime.src=`https://storage.progettochearia.it/graph/temperature_f(time)_${data}.svg`;
            humgraphtime.src=`https://storage.progettochearia.it/graph/humidity_f(time)_${data}.svg`;
            pressuregraphtime.src=`https://storage.progettochearia.it/graph/pressure_f(time)_${data}.svg`;
            cographtime.src=`https://storage.progettochearia.it/graph/CO_f(time)_${data}.svg`;
            o3graphtime.src="../template/save.png";
        }
        else{
            tempgraphtime.src="../template/save.png";
            humgraphtime.src="../template/save.png";
            pressuregraphtime.src="../template/save.png";
            cographtime.src="../template/save.png";
            o3graphtime.src="../template/save.png";
        
        }
        if(fmeasurements.value == 'true'){
            tempgraphmeasurements.src=`https://storage.progettochearia.it/graph/temperature_f(measurements)_${data}.svg`;
            humgraphmeasurements.src=`https://storage.progettochearia.it/graph/humidity_f(measurements)_${data}.svg`;
            pressuregraphmeasurements.src=`https://storage.progettochearia.it/graph/pressure_f(measurements)_${data}.svg`;
            cographmeasurements.src=`https://storage.progettochearia.it/graph/CO_f(measurements)_${data}.svg`;
            o3graphmeasurements.src="../template/save.png";
        }
        else{
            tempgraphmeasurements.src="../template/save.png";
            humgraphmeasurements.src="../template/save.png";
            pressuregraphmeasurements.src="../template/save.png";
            cographmeasurements.src="../template/save.png";
            o3graphmeasurements.src="../template/save.png";
        }

        

    }
}