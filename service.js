'use strict'

const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const Varsling = require('./lib/varsling')
const envs = process.env

const options = {
  seneca: {
    tag: envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_TAG || 'tfk-seneca-minelev-varsle-kontaktlarer'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'role:info, info:queue, msg:add', model: 'observe'}
    ]
  },
  varslingOptions: {
    tag: envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_TAG || 'tfk-seneca-minelev-varsle-kontaktlarer'
  },
  isolated: {
    host: envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_HOST || 'localhost',
    port: envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_PORT || 8000
  }
}

const Service = Seneca(options.seneca)

if (envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Varsling, options.varslingOptions)
