//  Skrypt odpowiedzialny za działanie pierwszego zadania związanego z nazą firmy i listą pracowników 

// Lista pracowników 
const workersData = [
    {name: "Adam Nowak", img: "worker1.jpg", chosen: false},
    {name: "Michał Potoczek", img: "worker2.jpg", chosen: false},
    {name: "Antoni Worek", img: "worker3.jpg", chosen: false}
];
// Kopia listy pracowników - skryp modyfikuje kopie a orginał pozostaje jako baza danych
let workers = workersData;
// Pobranie elementu html gdzie zostanie wypisana lista pracowników
let workerList = document.getElementById("options");
// Funkcja odpowiedzialna za tworzenie listy pracowników
function createWorkerList() {
    workerList.innerHTML = "";
    for(let i in workers ) {
        // Tworzenie elementu div z atrybutami class
        let option = document.createElement('div');
        if(workers[i].chosen == true){
            option.setAttribute("class", "option active");
        }else{
            option.setAttribute("class", "option");
        }
        option.setAttribute("onclick", `chosen(${i})`);
        // Przekazanie danych do funkcji tworzącej rekord pracownika
        createWorkerProfile(option, workers[i].name, workers[i].img);
        // Dodanie rekordu pracownika na stronę
        workerList.appendChild(option); 
    }
}
// Funkcja odpowiedzialna za tworzenie rekordu pracownika
function createWorkerProfile(div, name, img) {
    // Tworzenie elementu img z atrybutami src (dodanie ścieżki do zdjęcia pracwonika)
    let imge = document.createElement("img");
    imge.setAttribute("src", `/assets/images/user/${img}`);
    // Tworzenie elementu span wraz z imieniem pracownika
    let span = document.createElement("span");
    span.innerHTML = name;
    // Zapakowanie/dodanie danych do jednego diva/rekordu
    div.appendChild(imge);
    div.appendChild(span);
}
// Wywołanie funkcj po załadowaniu się strony w celu utworzenia listy pracowników
createWorkerList();
// Pokazanie listy pracowników 
function showlist() {
    let test = document.getElementById("option-container");
    test.style.maxHeight = "300px";
    test.style.borderWidth = "1px";
}
// Ukrycie listy pracowników 
function hiddenlist() {
    let test = document.getElementById("option-container");
    test.style.maxHeight = "0px";
    test.style.borderWidth = "0px";
}
// Funkcja odpowiedzialna za przekaz danych po wybraniu danego pracownika
function chosen(id) {
    // Modyfikacja danych wybranego pracownika - wypisanie na stronie
    document.getElementById("worker").value = workers[id].name;
    for(let i in workers){
        workers[i].chosen = false
    }
    workers[id].chosen = true;
    document.getElementById("search").value = '';
    workers = workersData;
    createWorkerList();
}
// Funkcja pozwalająca filtrować użytkowników podczas wyszukiwania
function filterWorkerList() {
    // Pobranie wartości szukanej przez urzytkownika
    let user = document.getElementById("search").value;
    if(user.length == 0) {
        workers = workersData;
    } else {
        workers = workersData;
        // Porównanie jej z rekordami w liście pracowników
        workers = workers.filter(worker => {
            return worker.name.toLowerCase().indexOf(user.toLowerCase()) !== -1
        });
    }
    createWorkerList();
}
// Walidacja pola Nazwa firmy
function validateWorkPlace() {
    if(document.getElementById("workplace_name").value.length < 5){
        document.getElementById("workPlace_error").style.display = 'block';
        document.getElementById("workplace_name").style.borderColor = '#FF4003';
    }else {
        document.getElementById("workPlace_error").style.display = 'none';
        document.getElementById("workplace_name").style.borderColor = '#E1E1E1';
    }
}