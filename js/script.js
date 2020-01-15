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

    let taskElement = document.createElement('div');
    taskElement.setAttribute('class', 'task'); //o setAttribute tira as classes que já estiverem no elemento

    let taskName = document.createElement('div');
    taskName.setAttribute('class', 'col-md-10');
    taskName.textContent = inputAddValue;

    let taskCheckbox = document.createElement('div');
    taskCheckbox.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'icon');
    imgCheck.setAttribute('src', 'img/icon_check.png');

    //depois de criar os elementos, agora insere um dentro do outro
    taskCheckbox.appendChild(imgCheck); 
    taskElement.appendChild(taskName);
    taskElement.appendChild(taskCheckbox);
    taskBoard.appendChild(taskElement);

    localStorage.setItem('tasksList', JSON.stringify(tasksList))
    //appendChild coloca elementos, não texto! texto é pelo textContent dentro de um elemento
}


function show (tasksList) { //copia valores de cima 
    for(let item of tasksList) { //como o foreach tasks as task
        createTask(item);
    }
} 

function createTask (inputAddValue) {
    let taskElement = document.createElement('div');
    taskElement.setAttribute('class', 'task'); 

    let taskName = document.createElement('div');
    taskName.setAttribute('class', 'col-md-10');
    taskName.textContent = inputAddValue;

    let taskCheckbox = document.createElement('div');
    taskCheckbox.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'icon');
    imgCheck.setAttribute('src', 'img/icon_check.png');

    taskCheckbox.appendChild(imgCheck); 
    taskElement.appendChild(taskName);
    taskElement.appendChild(taskCheckbox);
    taskBoard.appendChild(taskElement);
}