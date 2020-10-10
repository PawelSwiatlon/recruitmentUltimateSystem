const workersData = [
    {name: "Adam Nowak", img: "worker1.jpg", chosen: false},
    {name: "Michał Potoczek", img: "worker2.jpg", chosen: false},
    {name: "Antoni Worek", img: "worker3.jpg", chosen: false}
];
let workers = workersData;
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
    document.getElementById("worker").value = workers[id].name;
    for(let i in workers){
        workers[i].chosen = false
    }
    workers[id].chosen = true;
    document.getElementById("search").value = '';
    workers = workersData;
    createWorkerList();
}
function filterWorkerList() {
    let user = document.getElementById("search").value;
    if(user.length == 0) {
        workers = workersData;
    } else {
        workers = workersData;
        workers = workers.filter(worker => {
            return worker.name.toLowerCase().indexOf(user.toLowerCase()) !== -1
        });
    }
    createWorkerList();
}
function validateWorkPlace() {
    if(document.getElementById("nazwaFirmy").length <= 1){
        document.getElementById("workPlace_error").style.display = 'block';
        document.getElementById("nazwaFirmy").style.borderColor = '#FF4003';
    }else {
        document.getElementById("workPlace_error").style.display = 'none';
        document.getElementById("nazwaFirmy").style.borderColor = '#E1E1E1';
      
    }
}