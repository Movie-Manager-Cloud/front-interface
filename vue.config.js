const { defineConfig } = require('@vue/cli-service')
const HOST = process.env.VUE_APP_API_HOST
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
