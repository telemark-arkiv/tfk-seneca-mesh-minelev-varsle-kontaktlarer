'use strict'

const checkDistribution = require('./check-distribution')

module.exports = function (args, callback) {
  const Seneca = this
  const data = args.data

  const handleMail = (error, data) => {
    if (error) {
      console.error(error)
    } else {
      console.log(data)
    }
  }

  checkDistribution(data, (error, distribution) => {
    if (error) {
      console.error(error)
    } else {
      if (distribution.length > 0) {
        distribution.forEach(email => {
          Seneca.act(email, handleMail)
        })
      }
    }
  })

  return callback(null, {success: true, msg: 'Checked warning'})
}
