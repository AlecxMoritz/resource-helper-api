var express = require('express');
var sequelize = require('../db')
var Topic = sequelize.import('../models/topic');
router = express.Router();

router.get('/', function(req, res) {
    console.log(req)
    _owner_uid = req.user.uid;
    Topic.findAll({
            where: { owner_uid : _owner_uid }
    })
    .then(
        function getAllSuccess(topics) {
            res.json(topics);
        },

        function getAllError(err) {
            res.status(500).send(err.message);
        }
    )
})

router.get('/:uid', function(req, res) {
    let _owner_uid = req.user.uid;
    let _uid = req.params.uid;

    Topic.findAll({
            where: { 
                owner_uid : _owner_uid,
                uid : _uid
        }
    })
    .then(
        function getAllSuccess(topic) {
            res.json(topic);
        },

        function getAllError(err) {
            res.status(500).send(err.message);
        }
    )
})

router.post('/new', function(req, res) {
    let _owner_uid = req.body.user.uid; 
    let _name = req.body.topic.name;
    let _description = req.body.topic.description;

    Topic.create({
        owner_uid: _owner_uid,
        name: _name,
        description: _description
    })
    .then(
        function topicCreateSuccess(topic) {
            res.json({
                topic
            })
        },

        function createTopicError(res, err) {
            res.status(500).send("Error: ", err)
        }
    )
})

router.put('/update/:uid', function(req, res) {
    let _owner_uid = req.body.user.uid;
    let _name = req.body.topic.name;
    let _description = req.body.topic.description;
    let _uid = req.params.uid;

    Topic.update({
        name: _name,
        description: _description
    }, 

    {
        where: {
            uid: _uid
        }
    })
    .then(
        function updateSuccess(topic) {
            let body = {
                "message" : "Topic updated.",
                "topic" : topic
            }
            res.status(200).send(body);
        },

        function updateError(err) {
            res.send(500, err.message);
        }
    )
})

router.delete('/delete/:uid', function(req, res) {
    console.log(req)
    _owner_uid = req.body.user.uid;
    _topic_uid = req.params.uid;

    Topic.destroy({
        where: {
            owner_uid : _owner_uid,
            uid: _topic_uid,
        }
    })
    .then(
        function deleteTopicSuccess(topic) {
            let body = {
                "message" : "Topic deleted.",
                "topic" : topic
            }
            res.status(200).send(body)
        },

        function deleteTopicError(err) {
            res.status(500).send(err.message);
        }
    )
})

module.exports = router;