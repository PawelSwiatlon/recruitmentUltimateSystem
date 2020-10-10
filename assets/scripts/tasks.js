// Skrypt odpowiedzialny za działanie drugiego zadania związandego z dodawaniem nowych zadań do tabeli zadań

// Lista zadań
let taskList = [
    // Przykłady zadań
    {task: "zadanie 1", price: "100.95"},
    {task: "zadanie 2", price: "2000.16"},
    {task: "zadanie 3", price: "850"}
];
// Pobranie elementów lista zadań, sum (całkowity koszt zadań) i euro
let list = document.getElementById("list");
let sum = document.getElementById("sum");
const eur = document.getElementById("eur");
// URL do api z aktualną ceną EUR/PLN
const url = 'https://api.exchangeratesapi.io/latest?base=EUR';
let euro = 0;
// Funkcja asynchroniczna zwracająca wartość 1 euro w przeliczeniu na PLN
async function getapi(url){
    const response = await fetch(url);
    // Zapisanie danych w formacje JSON
    let data = await response.json();
    eur.innerHTML = `1 euro = ${data.rates.PLN}`;
    euro = data.rates.PLN;
}
// Wywołanie funkcji sprawdzjącej kurs euro
getapi(url);
// Wywołanie fukncji po załadowaniu się strony
window.onload = function(){
    // Wywołanie listy zadań
    createElements();
}
// Pobieranie danych od użytkownika (Nazwa zadania "task" i Ceny "price")
function getData() {
    let task = document.getElementById("task").value;
    let price = document.getElementById("price").value;
    // Sprawdzenie czy zadanie ma min 5 znaków
    if(task.length >= 5){
        if(price == 0) {
            price = 0;
        }
        // Resetowanie pól nazwy zadania i ceny zadania
        document.getElementById("task").value = "";
        document.getElementById("price").value = "";
        document.getElementById("task").style.borderColor = "#E1E1E1";
        // Dodanie nowego zadania do listy zadań 
        taskList.push({task,price});
        // Usunięcie komunikatu o błędzie nazwy zadania jeśli urzytkownik spełnił wymagań
        document.getElementById("taskEror").innerHTML = " ";
    }else{
        // Komunikat o błędzie nazwy zadania jeśli urzytkownik nie spełnił wymagań
        document.getElementById("taskEror").innerHTML = "Nazwa zadania musi składać się z minimum 5 znaków.";
        document.getElementById("task").style.borderColor = "#FF4003";
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
        createList(tr, [i,taskList[i].task, parseFloat(taskList[i].price).toFixed(2), parseFloat(taskList[i].price/euro).toFixed(2)]);
        // Wypisanie zadania na stronie
        list.appendChild(tr);
        // Zczytanie ceny danego zadaia
        sum_number += parseFloat(taskList[i].price);
    }
    // Wypisanei sumy zadań na stronie
    sum.appendChild(document.createTextNode(`Suma: ${sum_number.toFixed(2)} PLN (${(sum_number/euro).toFixed(2)} EUR)`));
}
// Funkcja odpowiedzialna za tworzenie elementów td wraz z zawartością
function createList(tr, data) {
    for(let i in data) {
        if(i==0){
            i++
        }else{
            // Tworzenie elementu td wraz z zawartością
            let td = document.createElement("td");
            if(i == 2) { 
                td.appendChild(document.createTextNode(`${data[i]} PLN`));
                
            }else if(i == 3){
                td.appendChild(document.createTextNode(`${data[i]} EUR`));

            }else{
                td.appendChild(document.createTextNode(data[i]));
            }
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
    let icon = document.createElement("img");
    icon.setAttribute("src","/assets/images/icons/trash-solid.svg");
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
// Sortowanie ceny od największej
function priceUp() {
    taskList = taskList.sort(function (a,b) {
        return b.price - a.price;
    });
    createElements();
}
// Sortowanie ceny od najmniejszej
function priceDown() {
    taskList = taskList.sort(function (a,b) {
        return a.price - b.price;
    });
    createElements();
}
// Sortowanie zadań od A - Z
function taskSortUp() {
    taskList = taskList.sort(function (a,b) {
        return a.task.localeCompare(b.task);
    });
    createElements(); 
}
// Sortowanie zadań od Z - A
function taskSortDown() {
    taskList = taskList.sort(function (a,b) {
        return b.task.localeCompare(a.task);
    });
    createElements(); 
}
