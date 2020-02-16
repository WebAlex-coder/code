const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {

  // Преобразуем массив объектов в объект для удобства дальнейшей работы.
  const objOfTasks = arrOfTasks.reduce((acc,task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const listContainer = document.getElementById('listTasks');
  const formAddTask = document.forms['addTask'];
  const inputTitle = formAddTask.elements['title'];
  const inputBody = formAddTask.elements['body'];



  renderAllTasks(objOfTasks);

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

    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    button.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    p.classList.add('mt-2', 'w-100');

    span.style.fontWeight = 'bold';

    span.textContent = title;
    button.textContent = 'Delete';
    p.textContent = body;

    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(p);

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
    const li = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin',li);
    formAddTask.reset()

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

})(tasks);
