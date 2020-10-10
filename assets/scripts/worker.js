let workers = [
    {name: "Adam Nowak", img: "worker1.jpg", chosen: false},
    {name: "Michał Potoczek", img: "worker2.jpg", chosen: false},
    {name: "Antoni Worek", img: "worker3.jpg", chosen: false}
];
let workerList = document.getElementById("options");
function createWorkerList() {
    workerList.innerHTML = "";
    for(let i in workers ) {
        let option = document.createElement('div');
        if(workers[i].chosen == true){
            option.setAttribute("class", "option active");
        }else{
            option.setAttribute("class", "option");
        }
        option.setAttribute("onclick", `chosen(${i})`);
        createWorkerProfile(option, workers[i].name, workers[i].img);
        workerList.appendChild(option); 
    }
}
function createWorkerProfile(div, name, img) {
    let imge = document.createElement("img");
    imge.setAttribute("src", `/assets/images/user/${img}`);
    let span = document.createElement("span");
    span.innerHTML = name;
    div.appendChild(imge);
    div.appendChild(span);
}
createWorkerList();
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
    document.getElementById("pracownik").value = workers[id].name;
    // document.getElementById("pracownik").setAttribute("value", workers[id].name);
    for(let i in workers){
        workers[i].chosen = false
    }
    workers[id].chosen = true;
    createWorkerList();
}