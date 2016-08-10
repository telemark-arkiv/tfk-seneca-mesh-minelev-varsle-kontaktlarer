'use strict'

const sjekkVarsling = require('./sjekk-varsling')

module.exports = function (options) {
  const seneca = this

  seneca.add('role:info, info:queue, msg:add', sjekkVarsling)

  return {
    name: options.tag || 'tfk-seneca-minelev-varsle-kontaktlarer'
  }
}
