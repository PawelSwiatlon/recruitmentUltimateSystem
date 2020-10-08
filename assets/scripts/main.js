// Lista zadań
let taskList = [
    // Przykłady zadań
    {task: "zadanie 1", price: "2000"},
    {task: "zadanie 2", price: "500"},
    {task: "zadanie 3", price: "1500"}
];
// Pobranie elementów lista zadań i sum (całkowity koszt zadań)
let list = document.getElementById("list");
let sum = document.getElementById("sum");
// Wywołanie fukncji po załadowaniu się strony
window.onload = function(){
    createElements();
}
// Pobieranie danych od użytkownika (Nazwa zadania "task" i Ceny "price")
function getData() {
    let task = document.getElementById("task").value;
    let price = document.getElementById("price").value;
    // Sprawdzenie czy zadanie ma min 5 znaków
    if(task.length >= 5){
        // Resetowanie pól nazwy zadania i ceny zadania
        document.getElementById("task").value = "";
        document.getElementById("price").value = "";
        // Dodanie nowego zadania do listy zadań 
        taskList.push({task,price});
    }
    // Tworzenie nowego elementu - wypisanie nowego zadania na stronie
    createElements();
}
// Funkcja odpowiedzialana za tworzenie nowego elementu na stronie
function createElements() {
    // Czyszczenie elementów list/sum
    let sum_number = 0;
    list.innerHTML = "";
    sum.innerHTML = "";
    // Zczytywanie zadania z listy zadań
    for(i in taskList) {
        let tr = document.createElement("tr");
        // Przekazanie danych do tworzenia elementu
        createList(tr, [i,taskList[i].task, taskList[i].price, (taskList[i].price/4.56).toFixed(2)]);
        // Wypisanie zadania na stronie
        list.appendChild(tr);
        // Zczytanie ceny danego zadaia
        sum_number += parseInt(taskList[i].price);
    }
    // Wypisanei sumy zadań na stronie
    sum.appendChild(document.createTextNode(`Suma: ${sum_number} (${(sum_number/4.56).toFixed(2)} EUR)`));
}
// Funkcja odpowiedzialna za tworzenie elementów td wraz z zawartością
function createList(tr, data) {
    for(let i in data) {
        if(i==0){i++}else{
        // Tworzenie elementu td wraz z zawartością
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(data[i]));
        // Dodanie zawartości do elementu tr
        tr.appendChild(td);
        }
    }
    //Dodanie przycisku usuń do zadania
    tr.appendChild(createDelete(data[0]));
}
// Funkcja odpowiedzialna za tworzenie przycisku usuń
function createDelete(id) {
    // Tworzenie znacznika td z id
    let del = document.createElement("td");
    del.setAttribute("id","delete");
    // Tworzenie znacznika span z metodą on click
    let span = document.createElement("span");
    span.setAttribute("onclick",`deleteDask(${id})`)
    // Tworzenie znacznika i z atrybutem class odpowiednim za wyświetlenie ikonki "trash"
    let icon = document.createElement("i");
    icon.setAttribute("class","fas fa-trash");
    // Ustawienie zawartości ddla znaczników span i td
    span.appendChild(icon);
    span.appendChild(document.createTextNode(" usuń"));
    del.appendChild(span);
    return del;
}
// Funkcja odpowiedzialna za udówanie rekordów z listy zadań
function deleteDask(id) {
    taskList.splice(id, 1);
    createElements();
}
function sortByIdUP() {
    taskList.sort();
    createElements();
}