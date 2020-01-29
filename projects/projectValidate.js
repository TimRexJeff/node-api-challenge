const Projects = require('../data/helpers/projectModel')

module.exports = {
    get,
    validateProject,
    validateProjectId
}

function validateProject(req, res, next) {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400)
        .json({ message: 'missing project data' })
  
    } else if (!req.body) {
        res.status(400)
        .json({ message: 'missing required text field' })
  
    } else {
        next()
    }
}

function get(id) {
    let query = db("projects as p")

    if (id) {
        query.where("p.id", id).first()

        const promises = [query, this.getProjectActions(id)] // [ projects, actions ]

        return Promise.all(promises).then(function(results) {
            let [project, actions] = results

            if (project) {
                project.actions = actions

                return mappers.projectToBody(project)
            } else {
                return null
            }
        })
    } else {
        return query.then(projects => {
            return projects.map(project => mappers.projectToBody(project))
        })
    }
}

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {

        if (project) {
            req.project = project
            next()

        } else {
            res.status(400)
            .json({ message: 'Invalid project id' })}})

        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error searching for the user' })
        })
}