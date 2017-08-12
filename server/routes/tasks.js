var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/', function(req, res) {
        console.log('message post was hit!!'); //working
        pool.connect(function(errorConnectingToDatabase, client, done) {
                if (errorConnectingToDatabase) {
                    console.log('Error connecting to database', errorConnectingToDatabase);
                    res.sendStatus(500);
                } else {
                    client.query('INSERT INTO tasks (task, due) VALUES ($1, $2);', [req.body.task, req.body.due], function(errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making database query', errorMakingQuery);
                            res.sendStatus(500); //getting error here
                        } else {
                            res.sendStatus(201);
                        }
                    });
                }
            }) // end pool.connect
    }) // end router.post

router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query('SELECT * FROM tasks;', function(errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making database query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                })
            }
        }) //end pool.connect
}); //end router.get

module.exports = router;