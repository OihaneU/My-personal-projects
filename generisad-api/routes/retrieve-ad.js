const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveAd(id)
            .then(ad => res.json({ message: 'ad retrieved correctly', ad }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}