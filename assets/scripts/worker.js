let workers = [
    {name: "Adam Nowak", img: "worker1.jpg"},
    {name: "Michał Potoczek", img: "worker2.jpg"},
    {name: "Antoni Worek", img: "worker3.jpg"}
];
let workerList = document.getElementById("options");
function createWorkerList() {
    workerList.innerHTML = "";
    for( i in workers ) {
        let option = document.createElement('div').setAttribute("class", "option");
        createWorkerProfile(option, [workers[i].name, workers[i].img]);
        workerList.appendChild(option); 
    }
}
function createWorkerProfile(div, data) {

}







function showlist() {
    let test = document.getElementById("option-container");
    test.style.maxHeight = "300px";
    test.style.borderWidth = "1px";

}
function hiddenlist() {
    let test = document.getElementById("option-container");
    test.style.maxHeight = "0px";
    test.style.borderWidth = "0px";

}
function chosen(id) {
    let worker = document.getElementsByClassName("option");
    document.getElementById("pracownik").setAttribute("value", worker);
}