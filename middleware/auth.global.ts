export default defineNuxtRouteMiddleware((to, _) => {
    let isLogin = false
    const token = useCookie<string>('token')
    if (token.value) {
        isLogin = true
    }

    // if go to other page and not logged in redirect to login page
    if (to.path !== '/login' && !isLogin) {
        return navigateTo('/login')
    }
    // if go to logo page and already logged in redirect to home page
    if (to.path === '/login' && isLogin) {
        return navigateTo('/')
    }
})
