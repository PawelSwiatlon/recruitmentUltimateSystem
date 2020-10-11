// Script responsible for first task, company name and employee list 

const workersData = [ // Employee list
    {name: "Adam Nowak", img: "worker1.jpg", chosen: false},
    {name: "Michał Potoczek", img: "worker2.jpg", chosen: false},
    {name: "Antoni Worek", img: "worker3.jpg", chosen: false}
];
let workers = workersData; // Employee list copy  
let workerList = document.getElementById("options"); // Getting options component 
function createWorkerList() { // Function rosponsible for creating employee list
    workerList.innerHTML = "";
    for(let i in workers ) {
        let option = document.createElement('div'); 
        if(workers[i].chosen == true){
            option.setAttribute("class", "option active");
        }else{
            option.setAttribute("class", "option");
        }
        option.setAttribute("onclick", `chosen(${i})`);
        createWorkerProfile(option, workers[i].name, workers[i].img); // Data transmission to createWorkerProfile
        workerList.appendChild(option); 
    }
}
function createWorkerProfile(div, name, img) { // Function responsible for creating employee record in employee list
    let imge = document.createElement("img"); // Creating img component with employee image
    imge.setAttribute("src", `assets/images/user/${img}`);
    let span = document.createElement("span");
    span.innerHTML = name;
    div.appendChild(imge);
    div.appendChild(span);
}
createWorkerList(); // Function call to create employee list on website 
function showlist() { // Employee list display
    let test = document.getElementById("option-container");
    test.style.maxHeight = "300px";
    test.style.borderWidth = "1px";
}
function hiddenlist() { // Employee list cover up
    let test = document.getElementById("option-container");
    test.style.maxHeight = "0px";
    test.style.borderWidth = "0px";
}
function chosen(id) { // Function responsible for data transfer after employee selection
    document.getElementById("worker").value = workers[id].name; 
    for(let i in workers){
        workers[i].chosen = false
    }
    workers[id].chosen = true;
    document.getElementById("search").value = '';
    workers = workersData;
    createWorkerList();
}
function filterWorkerList() { // Employee data filtering function
    let user = document.getElementById("search").value; // Getting data searched by user
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
function validateWorkPlace() { // Company name gap validation
    if(document.getElementById("workplace_name").value.length < 5){
        document.getElementById("workPlace_error").style.display = 'block';
        document.getElementById("workplace_name").style.borderColor = '#FF4003';
    }else {
        document.getElementById("workPlace_error").style.display = 'none';
        document.getElementById("workplace_name").style.borderColor = '#E1E1E1';
    }
}