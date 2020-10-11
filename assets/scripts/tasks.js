// Script responsibble for second task, adding new tasks to the task list

let taskList = [ // Task list
    {task: "zadanie 1", price: "100.95"}, // Exemplary tasks
    {task: "zadanie 2", price: "2000.16"},
    {task: "zadanie 3", price: "850"}
];
let list = document.getElementById("list"); // Getting task list component and sum
let sum = document.getElementById("sum");
const eur = document.getElementById("eur");
const url = 'https://api.exchangeratesapi.io/latest?base=EUR'; // URL for api with current EUR/PLN currency
let euro = 0;
async function getapi(url){ // Async function converting 1 EUR to PLN
    const response = await fetch(url);
    let data = await response.json();
    eur.innerHTML = `1 euro = ${data.rates.PLN}`;
    euro = data.rates.PLN;
}
getapi(url); // Function call - getapi/createElements
window.onload = function(){
    createElements();
}
function getData() { // Getting user data (task name and price)
    let task = document.getElementById("task").value;
    let price = document.getElementById("price").value;
    if(task.length >= 5){ // Checking if task name has at least 5 characters
        if(price == 0) {
            price = 0;
        }
        document.getElementById("task").value = ""; 
        document.getElementById("price").value = "";
        document.getElementById("task").style.borderColor = "#E1E1E1";
        taskList.push({task,price}); // Adding new task to the task list
        document.getElementById("taskEror").innerHTML = " ";
        createElements();
    }else{
        document.getElementById("taskEror").innerHTML = "Nazwa zadania musi składać się z minimum 5 znaków."; // Message with the task name error (if length of task name < 5 characters)
        document.getElementById("task").style.borderColor = "#FF4003";
    }
}
function createElements() { // Function responsible for creating new component on the site
    let sum_number = 0; // Reset task list/sum data
    list.innerHTML = "";
    sum.innerHTML = "";
    for(i in taskList) { // Getting data from the task list
        let tr = document.createElement("tr");
        createList(tr, [i,taskList[i].task, parseFloat(taskList[i].price).toFixed(2), parseFloat(taskList[i].price/euro).toFixed(2)]); // Data transmission to createList function
        list.appendChild(tr);
        sum_number += parseFloat(taskList[i].price);
    }
    sum.appendChild(document.createTextNode(`Suma: ${sum_number.toFixed(2)} PLN (${(sum_number/euro).toFixed(2)} EUR)`)); // Summing up prices
}
function createList(tr, data) { // Function responsible for creating new td components with content
    for(let i in data) {
        if(i==0){
            i++
        }else{
            let td = document.createElement("td"); 
            if(i == 2) { 
                td.appendChild(document.createTextNode(`${data[i]} PLN`));
                
            }else if(i == 3){
                td.appendChild(document.createTextNode(`${data[i]} EUR`));

            }else{
                td.appendChild(document.createTextNode(data[i]));
            }
            tr.appendChild(td); // Adding content to tr
        }
    }
    tr.appendChild(createDelete(data[0])); // Adding "delete" button
}
function createDelete(id) { // Function responsible for creating "delete" button
    let del = document.createElement("td");
    del.setAttribute("id","delete");
    let span = document.createElement("span"); // Crating span component with onclick method
    span.setAttribute("onclick",`deleteDask(${id})`)
    let icon = document.createElement("img"); // Creating img component with "trash" icon 
    icon.setAttribute("src","assets/images/icons/trash-solid.svg");
    span.appendChild(icon);
    span.appendChild(document.createTextNode(" usuń"));
    del.appendChild(span);
    return del;
}
function deleteDask(id) { // Function responsible for deleting records from task list
    taskList.splice(id, 1);
    createElements();
}
function priceUp() { // Sorting prices from highest
    taskList = taskList.sort(function (a,b) {
        return b.price - a.price;
    });
    createElements();
}
function priceDown() { // Sorting prices from the lowest
    taskList = taskList.sort(function (a,b) {
        return a.price - b.price;
    });
    createElements();
}
function taskSortUp() { // Sorting task list A - Z
    taskList = taskList.sort(function (a,b) {
        return a.task.localeCompare(b.task);
    });
    createElements(); 
}
function taskSortDown() { // Sorting task list from Z - A
    taskList = taskList.sort(function (a,b) {
        return b.task.localeCompare(a.task);
    });
    createElements(); 
}
