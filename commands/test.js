const {
    handleMapBan
} = require('../helpers/helper')

module.exports = {
    name: 'test',
    execute(message, args) {
        handleMapBan(message)
    }
}