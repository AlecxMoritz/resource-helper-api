var express = require('express');
var sequelize = require('../db')
var Resource = sequelize.import('../models/resource');

router = express.Router();

router.get('/', function(req, res) {
    let _owner_uid = req.user.uid;

    Resource.findAll({
        order: [
            ['uid', 'DESC']
        ],
        where: {
            owner_uid: _owner_uid
        }
    })
    .then(
        function findAllSuccess(resources) {
            res.json(resources)
        },

        function findAllError(err) {
            res.send(500).send(err.message)
        }
    )
})

router.get('/:uid', function(req, res) {
    let _topic_uid = req.params.uid;
    let _owner_uid = req.user.uid;

    Resource.findOne({
        where: {
            uid: _topic_uid,
            owner_uid: _owner_uid
        }
    })
    .then(
        function findOneSuccess(topic) {
            res.json(topic)
        },

        function findOneError(err) {
            res.send(500).send(err.message)
        }
    )
})

router.get('/topics/:uid', function(req, res) {
    let _topic_uid = req.params.uid;
    let _owner_uid = req.user.uid;
    console.log(req)
    Resource.findAll({
        where: {
            topic_uid : _topic_uid,
            owner_uid : _owner_uid
        }
    })
    .then(
        function findByTopicSuccess(topics) {
            res.status(200).json(topics);
        },

        function findByTopicError(err) {
            res.status(500).send(err.message);
        }
    )
})

router.post('/new', function(req, res) {
    let _topic_uid = req.body.topic.uid; 
    let _topic_title = req.body.topic.title;
    let _owner_uid = req.body.user.uid;
    let _title = req.body.resource.title;
    let _description = req.body.resource.description;
    let _link = req.body.resource.link;

    Resource.create({
        topic_uid: _topic_uid,
        owner_uid: _owner_uid,
        topic_title: _topic_title,
        title: _title,
        description: _description,
        link: _link
    })
    .then(
        function newResourceSuccess(resource) {
            let body = {
                "message" : "New resource added.",
                "resource" : resource
            }
            let status = 200;
            res.status(200).send(body);   
        },

        function newResourceError(err) {
            res.send(500).send(err.message);
        }
    )
})

router.put('/update/:uid', function(req, res) {
    let _owner_uid = req.body.user.uid;
    let _uid = req.params.uid;
    let _title = req.body.resource.title;
    let _description = req.body.resource.description;
    let _link = req.body.resource.description;

    Resource.update({
        title: _title,
        description: _description,
        link: _link
    }, 

    { where: {
        uid: _uid,
        owner_uid: _owner_uid 
    }})
    .then(
        function updateResourceSuccess(resource) {
            let body = {
                "message" : "Successfuly updated.",
                "resource" : resource
            }
            res.send(body);
        },

        function updateResourceError(err) {
            res.send(500, err.message)
        }
    )
})

router.delete('/delete/:uid', function(req, res) {
    console.log(req)
    let _uid = req.params.uid;
    let _owner_uid = req.user.uid;
   
    Resource.destroy({
        where: {
            owner_uid: _owner_uid,
            uid: _uid
        }
    })
    .then(
        function deleteResourceSuccess(resource) {
            let body = {
                "message" : "Resource deleted.",
                "resource" : resource
            }
            res.status(200).send(body);
        },

        function deleteResourceError(err) {
            res.status(500).send(err.message);
        }
    )
})

module.exports = router;