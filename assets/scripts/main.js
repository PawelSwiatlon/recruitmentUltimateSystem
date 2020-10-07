const taskList = [];

function getData() {
    let task = document.getElementById("task").value;
    let price = document.getElementById("price").value;
    let id = taskList.length + 1;
    taskList.push({id,task,price});
    console.log(taskList);
    createElements();
}
function createTD() {
    return document.createElement("td");
}
function note(data) {
    return document.createTextNode(data);
}
function createElements() {
    let list = document.getElementById("list");
    list.innerHTML = "";
    for(i in taskList) {
        let tr = document.createElement("tr");
        
        let task = createTD();
        let task_txt = note(`${taskList[i].task}`);
        task.appendChild(task_txt);
        
        let amountPLN = createTD();
        let amountPLN_number = note(`${taskList[i].price}`);
        amountPLN.appendChild(amountPLN_number);

        let amountEUR = createTD();
        let amountEUR_number = note("" + (taskList[i].price/4.56).toFixed(2));
        amountEUR.appendChild(amountEUR_number);

        let del = createTD();
        del.setAttribute('id','delete');
        let icon = document.createElement("i");
        icon.setAttribute('class', 'fas fa-trash');
        let delete_txt = note(` usuń`);
        del.appendChild(icon);
        del.appendChild(delete_txt);
        
        tr.appendChild(task);
        tr.appendChild(amountPLN);
        tr.appendChild(amountEUR);
        tr.appendChild(del);

        list.appendChild(tr);
    }
}