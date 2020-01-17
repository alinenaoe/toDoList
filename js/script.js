let taskBoard = document.getElementById('tasks-board'); //selecionando a caixa de tarefa para poder criar html dentro
// let taskBoard = document.querySelector('#task-board'); PARA SELECIONAR COM QUERY (outra opção)
let buttonAddTask = document.getElementById('add-task'); //selecionando o botão de adicionar tarefa
let inputAdd = document.getElementById('new-task');
let tasksList = []; 

if(localStorage.getItem('tasksList')) { //condicional para checar se já existe uma lista. se não existir, cria a array
    tasksList = JSON.parse(localStorage.getItem('tasksList'));
} else {
    localStorage.setItem("tasksList", JSON.stringify(tasksList)); //JSON stringify e parse - funções nativas
}

show(tasksList);


buttonAddTask.onclick = function () { // poderia ser com o addeventlistener
    let inputAddValue = inputAdd.value;
    tasksList.push(inputAddValue);
    createTask(inputAddValue, tasksList.length - 1)
    localStorage.setItem('tasksList', JSON.stringify(tasksList))
    //appendChild coloca elementos, não texto! texto é pelo textContent dentro de um elemento
}

function show (tasksList) { //copia valores de cima 
    // for(let item of tasksList) { //como o foreach tasks as task
    //     createTask(item);
    taskBoard.innerHTML = "";
    tasksList.forEach(function(value, position){
        createTask(value, position)
    })
    // }
} 

function createTask (inputAddValue, position) {
    let taskElement = document.createElement('div');
    taskElement.setAttribute('class', 'task'); 
    taskElement.setAttribute('position', position); 

    let taskName = document.createElement('div');
    taskName.setAttribute('class', 'col-md-10');
    taskName.textContent = inputAddValue;

    let taskCheckbox = document.createElement('div');
    taskCheckbox.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'icon');
    imgCheck.setAttribute('src', 'img/icon_check.png');
    imgCheck.onclick = function (event) { //no momento que cria a tarefa você já diz que aquela imagem quando clicada resulta em uma ação
        // console.log(tasksList);
        let taskPosition = taskElement.getAttribute('position');
        tasksList = tasksList.filter(function(value, position){
            return position != taskPosition;
        })
        show(tasksList)
        localStorage.setItem('tasksList', JSON.stringify(tasksList))

        //console.log(taskPosition);
        taskElement.remove();
   
    // OUTRA FORMA DE FAZER - SELECIONANDO PELO PAI
    // let tarefaPai = event.target.parentNode.parentNode;
    // tarefaPai.remove();
    }

    taskCheckbox.appendChild(imgCheck); 
    taskElement.appendChild(taskName);
    taskElement.appendChild(taskCheckbox);
    taskBoard.appendChild(taskElement);
}

