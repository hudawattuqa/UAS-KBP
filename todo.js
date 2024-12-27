const inputTugas = document.getElementById("input-tugas")
const listTugas = document.getElementById("list-tugas")

function tambahTugas(){
    if(inputTugas.value === ''){
        alert('Please type your task first');
        return;
    }
    
    let li = document.createElement("li");
    li.innerHTML = inputTugas.value;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    listTugas.insertBefore(li, listTugas.firstChild);
    inputTugas.value = "";
    
    saveData();
}

listTugas.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("selesai");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    const tasks = [];
    const taskElements = listTugas.getElementsByTagName("li");
    
    for(let task of taskElements){
        tasks.push({
            text: task.childNodes[0].textContent,
            completed: task.classList.contains("selesai")
        });
    }
    
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        const tasks = JSON.parse(savedData);
        listTugas.innerHTML = ''; // Clear existing tasks
        
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;
            if(task.completed) {
                li.classList.add("selesai");
            }
            
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            
            listTugas.appendChild(li);
        });
    }
}

showTask();