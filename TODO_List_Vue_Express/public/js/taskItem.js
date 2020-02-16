Vue.component('task-item', {
    props: ['task'],
    template: `
        <li class="taskItem">
            <span>{{task.title}}</span>
            <p class="taskDescription">{{task.body}}</p>
            <button class="deleteTaskBtn" @click = "$parent.deleteTask(task)" >Delete</button>
        </li>
    `
})