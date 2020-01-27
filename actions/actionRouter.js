const express = require('express')

const Actions = require('../data/helpers/actionModel')
const { validateAction, validateActionId } = require('./actionValidate')
const { validateProjectId } = require('../projects/projectValidate')


const router = express.Router()

/************************/
/******** CREATE ********/
/************************/

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {

    const actionData = { ...req.body, project_id: req.params.id }

    Actions.insert(actionData)
  
        .then(action => {
            res.status(201)
            .json(action)})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error creating the action' })
        })
  })



/**********************/
/******** READ ********/
/**********************/

router.get('/', (req, res) => {
    Actions.get()
  
        .then(actions => {
            res.status(200)
            .json(actions)})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error retrieving the actions' })
        })
})



/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
  
        .then(() => {
            res.status(200)
            .json({ message: 'Action updated successfully' })})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error removing the action' })
        })
})



/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
  
        .then(() => {
            res.status(200)
            .json({ message: 'Action deleted successfully' })})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error removing the action' })
        })
})
  
module.exports = router