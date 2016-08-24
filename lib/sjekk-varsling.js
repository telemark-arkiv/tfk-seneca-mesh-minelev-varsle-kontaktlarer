'use strict'

module.exports = function (args, callback) {
  const Seneca = this
  const data = args.data
  const senderId = data.userId

  const checkDistribution = (data, callback) => {
    const mailText = `${data.userName} har sendt varsel til en av dine elever. Mer informasjon om varselet finner du på forsiden av MinElev.`

    Seneca.act({role: 'buddy', list: 'contact-teachers', studentUserName: data.studentUserName}, function (error, data) {
      if (error) {
        return callback(error, null)
      } else {
        const teachers = Array.isArray(data) ? data : []
        var distribution = []
        teachers.forEach(teacher => {
          if (teacher.username !== senderId) {
            distribution.push({
              role: 'mail',
              cmd: 'send',
              to: teacher.mail,
              from: 'minelev@t-fk.no',
              replyTo: 'minelev@t-fk.no',
              subject: 'MinElev - varsel sendt til en av dine elever',
              text: mailText
            })
          }
        })

        return callback(null, distribution)
      }
    })
  }

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
