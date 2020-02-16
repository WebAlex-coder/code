

(function(arrOfTasks) {

  let objOfTasks;

  function getTasks() {
    return fetch("getTasks")
      .then(result => result.json())
      .catch(err => console.log(err));
    }
  
  function addTask(data) {
    return fetch('addTask', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .catch(err => console.log(err));
  }

  getTasks()
  .then(result => {
    console.log('Принимаю данные', result.tasks);
    
    //преобразование массива в объект
    objOfTasks = result.tasks.reduce((acc,task) => {
      acc[task._id] = task;
      return acc;
    }, {});
    renderAllTasks(objOfTasks);
  })
  
  const listContainer = document.getElementById('listTasks');
  const formAddTask = document.forms['addTask'];
  const inputTitle = formAddTask.elements['title'];
  const inputBody = formAddTask.elements['body'];


  formAddTask.addEventListener('submit', onFormSubmitHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("Передайте список задач");
      return;
    }
    
    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      fragment.appendChild(listItemTemplate(task));
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({_id, title, body} = {}) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    const p = document.createElement('p');

    li.classList.add('taskItem');
    button.classList.add('deleteTaskBtn');
    p.classList.add('taskDescription');

    span.style.fontWeight = 'bold';

    span.textContent = title;
    button.textContent = 'Delete';
    p.textContent = body;

    li.appendChild(span);
    li.appendChild(p);
    li.appendChild(button);

    return li;
  }

  function onFormSubmitHandler(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Все поля обязательны для заполнения');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    addTask(task)
    .then(result => {
      if(result.result === 1) {
        const li = listItemTemplate(task);
      listContainer.insertAdjacentElement('afterbegin',li);
      formAddTask.reset()
      } else {
        console.log('Ошибка при добавлении задачи');
      }
    })
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    }
    objOfTasks[newTask._id] = newTask;
    return {...newTask};
  }

})();
