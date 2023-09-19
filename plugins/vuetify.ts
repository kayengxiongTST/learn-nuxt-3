// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            themes: {
                light: {
                    dark: false,
                    colors: {
                        primary: '#057CAE',
                        secondary: '#EEEFF0',
                        lightgreen: '#1C8B60',
                        error: '#F23A00'
                    }
                }
            }
        }
    })
    nuxtApp.vueApp.use(vuetify)
})
