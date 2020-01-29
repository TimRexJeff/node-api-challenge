const express = require('express')

const Projects = require('../data/helpers/projectModel')
const { validateProject, validateProjectId } = require('./projectValidate')

const router = express.Router()

/************************/
/******** CREATE ********/
/************************/

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
  
        .then(project => {
            res.status(201)
            .json(project)})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error creating the project' })
        })
  })



/**********************/
/******** READ ********/
/**********************/

router.get('/', (req, res) => {
    Projects.get()
  
        .then(projects => {
            res.status(200)
            .json(projects)})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error retrieving the projects' })
        })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
  
        .then(projects => {
            res.status(200)
            .json(projects)})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error retrieving the projects' })
        })
})

/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
  
        .then(() => {
            res.status(200)
            .json({ message: 'Project updated successfully' })})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error removing the project' })
        })
})



/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
  
        .then(() => {
            res.status(200)
            .json({ message: 'Project deleted successfully' })})
    
        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error removing the project' })
        })
})
  
module.exports = router