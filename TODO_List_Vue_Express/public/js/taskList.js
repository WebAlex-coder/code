Vue.component('task-list', {
    data() {
        return {
            tasks: {},
            count: 0,
            url: 'getTasks',
            deleteURL: 'deleteTask'
        }
    },
    
    methods: {
        createObjectFromArray(array) {
            this.tasks = array.reduce((acc, item) => {
                acc[item._id] = item;
                return acc;
            }, {})
        },

        deleteTask(task) {
            console.log("Запрос получил");
            this.$parent.deleteJson(`${this.deleteURL}/${task._id}`)
                .then(data => {
                    if(data) {
                        this.tasks.splice(this.tasks.indexOf(task), 1);
                        this.count--;
                        console.log(this.tasks);
                    }
                })
        }

    },

    mounted() {
        this.$parent.getTasks(this.url)
            .then(data => {
                this.count = data.count;
                this.tasks = data.tasks;
                console.log(this.tasks);
            });
    },

    template: `
    <ul class="taskListBlock__taskList" id = 'listTasks'>
        <task-item v-for = "task of tasks" :task = "task"></task-item>
    </ul>
    `
})