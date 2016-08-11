'use strict'

const Wreck = require('wreck')
const generateToken = require('tfk-generate-jwt')
const config = require('../config')

module.exports = (data, callback) => {
  const checkUrl = config.BUDDY_API_URL + '/users/' + data.studentUserName + '/contactTeachers'
  const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-seneca-mesh-minelev-varsle-kontaktlarer'}})
  const mailText = `${data.userName} har sendt varsel til en av dine elever. Mer informasjon om varselet finner du på forsiden av MinElev`
  const wreckOptions = {
    json: true,
    headers: {
      Authorization: token
    }
  }

  Wreck.get(checkUrl, wreckOptions, function (error, res, payload) {
    if (error) {
      return callback(error, null)
    } else {
      const teachers = payload
      var distribution = []

      teachers.forEach(teacher => {
        if (teacher.username !== data.userId) {
          distribution.push({
            role: 'mail',
            cmd: 'send',
            to: teacher.mail,
            from: 'minelev@t-fk.no',
            subject: 'MinElev - varsel sendt til en av dine elever',
            text: mailText
          })
        }
      })

      return callback(null, distribution)
    }
  })
}
