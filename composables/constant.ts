export const QUESTION_TYPE = [
    {
        text: 'ຫົວຂໍ້ຫຼັກ',
        value: 'section',
    },
    {
        text: 'ຫົວຂໍ້ຍ່ອຍ',
        value: 'subsection',
    },
    {
        text: 'ຄຳຖາມ',
        value: 'text',
    },
    {
        text: 'ອັບໂຫລດ File',
        value: 'file',
    },
]

export function getFromStatus(status: string | null | undefined) {
    if (!status) return '-'
    if (status.toLowerCase() === 'pending') return 'ລໍດຳເນີນການ'
    if (status.toLowerCase() === 'approve') return 'ອະນຸມັດສຳເລັດ'
    if (status.toLowerCase() === 'reject') return 'ຖືກປະຕິເສດ'
    return '-'
}

export const GENDERS = [
    {
        en: 'male',
        la: 'ຊາຍ',
    },
    {
        en: 'female',
        la: 'ຍິງ',
    },
]
