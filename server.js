const express = require('express')
const app = express()
const port = 1337
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')

// Configure web-server
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to database
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// Load model definitions
const models = {};
const modelFiles = glob.sync('api/models/*.js')

modelFiles.forEach((file) => {
    const name = path.basename(file, '.js');
    const modelDefinition = require('./' + file.replace('.js', ''));
    models[name] = modelDefinition;
})

for (modelName of Object.keys(models)) {
    let name = modelName;

    app.get('/api/' + name, (req, res) => {
        models[name].find().then((records) => {
            res.json({
                success: true,
                data: records
            });
        })
    });


    app.delete('/api/' + name + '/:id', (req, res) => {
        let id = req.params.id;
        
        models[name].deleteOne({ _id: id }).then(
            res.json({
                success: true,
                message: name + ' deleted'
            })
        ).catch((error) => {
            res.json({
                success: false,
                message: error
            });
        });
    });

    app.put('/api/' + name + '/:id', (req, res) => {
        let id = req.params.id;
    
        models[name].updateOne({ _id: id }, req.body).then(() => {
            res.json({
                success: true,
                message: name + ' updated'
            })
        }).catch((error) => {
            res.json({
                sucess: false,
                message: error
            })
        });
    });

    app.post('/api/' + name, (req, res) => {
        let toCreate = new models[name](req.body);
    
        toCreate.save().then((record) => {
            res.json({
                success: true,
                message: name + ' created',
                data: record
            });
        }).catch((error) => {
            res.status(403);
            res.json({
                success: false,
                message: error
            })
        });
    });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
