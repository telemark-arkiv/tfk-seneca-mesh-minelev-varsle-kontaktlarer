'use strict'

const envs = process.env

module.exports = {
  JWT_KEY: envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_JWT_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  BUDDY_API_URL: envs.TFK_SENECA_MINELEV_VARSLE_KONTAKTLARER_BUDDY_API_URL || 'https://api.buddy.com'
}
