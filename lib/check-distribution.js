'use strict'

module.exports = (data, callback) => {
  const seneca = this
  const mailText = `${data.userName} har sendt varsel til en av dine elever. Mer informasjon om varselet finner du på forsiden av MinElev.`

  seneca.act({role: 'buddy', list: 'contact-teachers', studentUserName: data.studentUserName}, function (error, data) {
    if (error) {
      return callback(error, null)
    } else {
      const teachers = data
      var distribution = []

      teachers.forEach(teacher => {
        if (teacher.username !== data.userId) {
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
