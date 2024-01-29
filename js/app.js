let fielddata = [];
let curplr = "x";
let running = false;
function initField()
{
    if(fielddata.length!=0) //delete old field
    {
        fielddata[0][0].elem.parentElement.parentElement.remove();
        fielddata = [];
        curplr = "x";
        running = false;
    }
    let table = document.createElement("table");
    for(i=0;i<3;i++)
    {
        let tr = document.createElement("tr");
        fielddata.push(new Array());
        for(j=0;j<3;j++)
        {
            let td0 =  document.createElement("td");
            td0.onclick = function(){
                play(td0);
            };
            tr.appendChild(td0);
            const tdobj = {xox:"N",elem:td0};
            fielddata[i].push(tdobj);
        }
        table.appendChild(tr);
    }
    document.getElementById("game").appendChild(table);
    Object.freeze(fielddata);
    running = true;
}

function play(tabledata) {
    
    if (running && fielddata.some(ar=>ar.some(obj=>obj.elem===tabledata))) {
        let tdobj = fielddata.find(arr=>arr.some(obj=>obj.elem==tabledata)).find(obj=>obj.elem==tabledata);
        tdobj.xox = curplr;
        tdobj.elem.innerText = tdobj.xox;

        if(!Object.isFrozen(tdobj))
        {
            if (curplr == "x") curplr = "o";
            else curplr = "x";
        }

        Object.freeze(tdobj);
        check();
    }
}


function check() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (fielddata[i][0].xox === fielddata[i][1].xox && 
            fielddata[i][1].xox === fielddata[i][2].xox && 
            fielddata[i][0].xox !== "N") {

                fielddata[i][0].elem.style = "background-color: gray;";
                fielddata[i][1].elem.style = "background-color: gray;";
                fielddata[i][2].elem.style = "background-color: gray;";

                running = false;
                return fielddata[i][0].xox;
        }
    }
    

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (fielddata[0][j].xox === fielddata[1][j].xox && 
            fielddata[1][j].xox === fielddata[2][j].xox && 
            fielddata[0][j].xox !== "N") {

                fielddata[0][j].elem.style = "background-color: gray;";
                fielddata[1][j].elem.style = "background-color: gray;";
                fielddata[2][j].elem.style = "background-color: gray;";

                running = false;
                return fielddata[0][j].xox;
        }
    }

    // Check diagonals
    if (fielddata[0][0].xox === fielddata[1][1].xox && 
        fielddata[1][1].xox === fielddata[2][2].xox && 
        fielddata[0][0].xox !== "N") {
            fielddata[0][0].elem.style = "background-color: gray;";
            fielddata[1][1].elem.style = "background-color: gray;";
            fielddata[2][2].elem.style = "background-color: gray;";

            running = false;
            return fielddata[0][0].xox;
    }
    if (fielddata[0][2].xox === fielddata[1][1].xox && 
        fielddata[1][1].xox === fielddata[2][0].xox && 
        fielddata[0][2].xox !== "N") {
            fielddata[0][2].elem.style = "background-color: gray;";
            fielddata[1][1].elem.style = "background-color: gray;";
            fielddata[2][0].elem.style = "background-color: gray;";
            
            running = false;
             return fielddata[0][2].xox;
    }

    // No winner 
    return null;
}