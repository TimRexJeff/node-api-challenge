module.exports = {
    validateProject,
    validateProjectId
}

function validateProject(req, res, next) {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400)
        .json({ message: 'missing project data' })
  
    } else if (!req.body.text) {
        res.status(400)
        .json({ message: 'missing required text field' })
  
    } else {
        next()
    }
}

function validateProjectId(req, res, next) {
    Projects.getById(req.params.id)
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