module.exports = {
    validateAction,
    validateActionId
}

function validateAction(req, res, next) {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400)
        .json({ message: 'missing action data' })
  
    } else if (!req.body.name) {
        res.status(400)
        .json({ message: 'missing required name field' })

    } else {
        next()
    }
  }

function validateActionId(req, res, next) {
    Actions.getById(req.params.id)
        .then(action => {

        if (action) {
            req.action = action
            next()

        } else {
            res.status(400)
            .json({ message: 'Invalid action id' })}})

        .catch(error => {
            res.status(500)
            .json({ error: 'We ran into an error searching for the action' })
        })
}