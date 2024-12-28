const inputTugas = document.getElementById("input-tugas");
const listTugas = document.getElementById("list-tugas");

function tambahTugas() {
    if (!inputTugas || !listTugas) {
        console.error("Element tidak ditemukan. Periksa kembali ID input-tugas dan list-tugas.");
        return;
    }

    if (inputTugas.value.trim() === '') {
        alert('Please type your task first');
        return;
    }

    let li = document.createElement("li");
    li.textContent = inputTugas.value;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listTugas.insertBefore(li, listTugas.firstChild);
    inputTugas.value = "";

    saveTodoData();
}

function saveTodoData() {
    const tasks = [];
    const taskElements = listTugas.getElementsByTagName("li");

    for (let task of taskElements) {
        const taskText = task.firstChild.textContent.trim();
        tasks.push({
            text: taskText,
            completed: task.classList.contains("selesai")
        });
    }

    localStorage.setItem("todoData", JSON.stringify(tasks));
}

function showTasks() {
    const savedData = localStorage.getItem("todoData");
    if (savedData) {
        try {
            const tasks = JSON.parse(savedData);
            listTugas.innerHTML = '';

            tasks.forEach(task => {
                let li = document.createElement("li");
                let textNode = document.createTextNode(task.text);
                li.appendChild(textNode);
                
                if (task.completed) {
                    li.classList.add("selesai");
                }

                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);

                listTugas.appendChild(li);
            });
        } catch (error) {
            console.error("Error parsing saved tasks:", error);
            localStorage.removeItem("todoData");
        }
    }
}

listTugas.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("selesai");
        saveTodoData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTodoData();
    }
});

inputTugas.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        tambahTugas();
    }
});

document.addEventListener("DOMContentLoaded", showTasks);