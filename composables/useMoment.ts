import moment from 'moment'
export const useMoment = (date: string, format?: string) => {
    if (!date) {
        return '-'
    }
    return moment(date).format(format || 'DD-MM-YYYY HH:mm:ss')
}
