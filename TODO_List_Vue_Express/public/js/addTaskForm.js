Vue.component('task-add-form', {
    data() {
        return {
            title: '',
            body: '',
            addURL: 'addTask'
        }
    },

    methods: {
        
        addTask() {
            if(!this.title || !this.body) {
                alert("Все поля должны быть заполнены");
                return;
            }
            const task = this.createNewTask();
            this.$parent.addTask(this.addURL,task)
                .then(result => {
                    if(result) {
                        this.$root.$refs.taskList.tasks.unshift(newTask);
                    } else {
                console.log('Ошибка при добавлении задачи');
            }
            })
        },

        createNewTask() {
            const newTask = {
            title: this.title,
            body: this.body,
            completed: false,
            _id: `task-${Math.random()}`
            }
            //objOfTasks[newTask._id] = newTask;
            return {...newTask};
        }
    },

    template: `
        <form 
            name="addTask" class = 'addTaskBlock__addTaskForm'>
        <input
            v-model.lazy = "title"
            type="text"
            name="title"
            id="title"
            placeholder="Task title"
        />
        <input
            v-model.lazy = "body"
            type="text"
            name="body"
            id="body"
            placeholder="Task body"
        />
        <button type="submit" @click = "addTask">
            Add task
        </button>
        </form>
    `
})