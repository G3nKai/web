const inputBox = document.getElementById("inputter");
const formList = document.getElementById("form-list");

function addTask() {
    if(inputBox.value === '') {
        alert("Напиши хоть что-то!")
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        formList.appendChild(li);
        let edit = document.createElement("img");
        edit.src = "204-2049954_banner-download-edit-draw-svg-png-icon-free.png";
        edit.alt = "редактировать";
        li.appendChild(edit);
        let span = document.createElement("span");
        span.innerHTML = "&#10060;";
        li.appendChild(span);
    }
    inputBox.value = "";
}

formList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI" && !event.target.classList.contains("completed")) {
        event.target.classList.add("completed");
    }
    else if (event.target.tagName === "LI" && event.target.classList.contains("completed")) {
        event.target.classList.remove("completed");
    }
    else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
    }
    else if (event.target.tagName === "IMG") {
        const original = event.target.parentElement.textContent;
        const editer = prompt('Отредактируйте текст:', original.slice(0, -1));

        if (editer !== null && editer.trim() !== '') {
            event.target.parentElement.textContent = editer;
        }
    }
})

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const importer = event.target.result;
    
            const jsonImport = JSON.parse(importer);
            //console.log(jsonImport);

            formList.innerHTML = "";
            
            jsonImport.forEach(elem => {
                let li = document.createElement("li");
                li.innerHTML = elem.text;
                formList.appendChild(li);
                let edit = document.createElement("img");
                edit.src = "204-2049954_banner-download-edit-draw-svg-png-icon-free.png";
                edit.alt = "редактировать";
                li.appendChild(edit);
                let span = document.createElement("span");
                span.innerHTML = "&#10060;";
                li.appendChild(span);
                
                if (elem.completed)
                    li.classList.add("completed")
            });
        };

        reader.readAsText(file);
    }
})

function jsonDownload() {
    let toDoList = [];

    formList.querySelectorAll("li").forEach(element => {
        const answer = {
            text: element.textContent.slice(0, -1),
            completed: element.classList.contains("completed")
        };
        toDoList.push(answer);
    });

    const jsonExport = JSON.stringify(toDoList);
    const dataUri = "data:text/json;charset=utf8," + encodeURIComponent(jsonExport);
    const anchorElement = document.createElement('a');
    anchorElement.href = dataUri;
    anchorElement.download = `${"To-Do List"}.json`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
}

