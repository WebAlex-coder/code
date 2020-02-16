const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3030;

const app = express();
const urlencoder = bodyParser.urlencoded({extended : false});

app.use(express.json());

app.use('/', express.static('public'));

app.get('/getTasks', (req, res) => {
    console.log("Отправляю список задач");

    fs.readFile("server/db/tasks.json", "utf-8", (err, data) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.send(data)
        }
    })
})

app.delete("/deleteTask/:id", urlencoder, (req, res) => {
    console.log("Запрос на удаление задачи принят", req.params.id);
    fs.readFile("server/db/tasks.json", "utf-8", (err, data) => {
        if(err) {
            res.sendStatus(400);
            return;
        };

        data = JSON.parse(data);
        data.tasks.splice(data.tasks.findIndex(item => item._id === req.params.id), 1);
        data.count--;
        //console.log(data.tasks);

        fs.writeFile("server/db/tasks.json", JSON.stringify(data, null, 2), (err) => {
            if(!err) {
                res.send(JSON.stringify({result:1}));
                console.log("Удаление завершено");
            } else {
                res.sendStatus(500, JSON.stringify({result:0}));
            }
        })
    })
    res.send(JSON.stringify({result:1}));
})

app.post('/addTask', urlencoder, (req, res) => {
    console.log("Получаю данные для добавления в БД");

    if(!req.body) {
        res.sendStatus(400);
        return;
    }

    let jsonData;

    fs.readFile('server/db/tasks.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result:0}));
            return;
        }
        jsonData = JSON.parse(data);
        jsonData.count++;
        jsonData.tasks.unshift(req.body);

        console.log(req.body);

        fs.writeFile('server/db/tasks.json', JSON.stringify(jsonData, null, 2), (err) => {
            if(!err) {
                res.send(JSON.stringify({result: 1}));
                console.log('Задача добавлена');
            } else {
                 res.sendStatus(500, JSON.stringify({result:0}));
            }
        })
    })

})

app.listen(3030, () => {
    console.log(`Server starting at ${port} port`);
})