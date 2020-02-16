const app = new Vue({
    el: '#app',
    data: {

    },
    methods: {
        getTasks(url) {
            return fetch(url)
              .then(result => result.json())
              .catch(err => console.log(err));
        },

        deleteJson(url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(result => result.json())
            .catch (err => console.log(err))
        },

        addTask(url, data) {
            console.log("Добавление задачи...")
            return fetch(url, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data)
            })
            .then(result => result.json())
            .catch(err => console.log(err));
          }
    },

    mounted() {
        console.log("Vue запущен");
    }
})