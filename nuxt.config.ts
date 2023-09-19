// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1',
            title: 'ລະບົບປະເມີນຫຼັກສູດ',
            link: [{ rel: 'icon', type: 'image/png', href: '/logoAfa.png' }],
        },
    },
    runtimeConfig: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        public: {
            CDN: 'https://sarcdn.slms-afa.edu.la',
        },
    },
    routeRules: {
        '/api/**': {
            cors: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Expose-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
            middleware: ['auth'],
        },
    },
    devtools: { enabled: true },

    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css',
        '@/assets/main.css',
    ],

    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
            },
        ],
    ],
    imports: {
        dirs: ['./stores'],
    },
    build: {
        transpile: ['vuetify', 'vue-toastification'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})
