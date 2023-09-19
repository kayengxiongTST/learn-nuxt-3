import moment from 'moment'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            moment: (date: string) => moment(date).format('YYYY-MM-DD'),
            momentTime: (date: string) => moment(date).format('YYYY-MM-DD HH:mm:ss')
        }
    }
})
