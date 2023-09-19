div
<template>
    <div>
        <CustomerHeader title="ລາຍລະອຽດຜູ້ຮ່ວມປະເມີນ" />
        <v-card variant="flat">
            <v-card-text>
                <v-row class="justify-end pr-2 pt-2">
                    <v-btn
                        elevation="0"
                        variant="tonal"
                        color="error"
                        :loading="resetLoading"
                        @click="doResetPassword()"
                    >
                        <v-icon>mdi-key</v-icon>
                    </v-btn>

                    <v-btn
                        elevation="0"
                        variant="tonal"
                        class="mx-4"
                        color="primary"
                        :loading="wordLoading"
                        @click="onExportToWord()"
                    >
                        <v-icon>mdi-file-word</v-icon>
                    </v-btn>

                    <v-btn
                        elevation="0"
                        variant="tonal"
                        color="success"
                        @click="navigateTo(`/users/edit/${route.params?.id}`)"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-card
                                v-if="user.profile"
                                :image="useCdn() + user.profile"
                                tile
                                class="d-flex justify-center align-center object-contain cursor-pointer mx-3 mb-5"
                                width="188px"
                                height="250px"
                            />
                            <v-card
                                v-else
                                class="d-flex justify-center align-center mx-3 mb-5"
                                color="#e0e0e0"
                                width="188px"
                                height="250px"
                            >
                                ຮູບພາບໂປຣໄຟລ
                            </v-card>
                            <div class="ml-9">
                                <div class="text-h6 mb-2">
                                    <span>ຊື່ ແລະ ນາມສະກຸນ (ລາວ): </span>
                                    <strong class="ml-2">{{
                                        user?.firstName?.la +
                                            ' ' +
                                            user?.lastName?.la || '...'
                                    }}</strong>
                                </div>
                                <div class="text-h6 mb-2">
                                    <span>ຊື່ ແລະ ນາມສະກຸນ (ອັງກິດ): </span>
                                    <strong class="ml-2">{{
                                        user?.firstName?.en +
                                            ' ' +
                                            user?.lastName?.en || '...'
                                    }}</strong>
                                </div>
                                <div class="text-h6 mb-2">
                                    <span>ອິເມວ: </span>
                                    <strong class="ml-2">{{
                                        user?.email || '...'
                                    }}</strong>
                                </div>
                                <div class="text-h6 mb-2">
                                    <span>ເບີໂທ: </span>
                                    <strong class="ml-2">{{
                                        user?.phoneNumber || '...'
                                    }}</strong>
                                </div>

                                <div class="text-h6 mb-2">
                                    <span>ວັນເດືອນປີເກີດ: </span>
                                    <strong class="ml-2">{{
                                        useMoment(
                                            user?.birthday as string,
                                            'DD-MM-YYYY',
                                        ) || '...'
                                    }}</strong>
                                </div>
                                <div class="text-h6 mb-2">
                                    <span>ເພດ: </span>
                                    <strong class="ml-2">{{
                                        GENDERS.find(
                                            (item: any) =>
                                                (item?.en).toLowerCase() ==
                                                user?.gender?.toLowerCase(),
                                        )?.la ||
                                        user?.gender ||
                                        '...'
                                    }}</strong>
                                </div>
                            </div>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <v-expansion-panels
                            v-model="teacherPosition"
                            variant="accordion"
                        >
                            <v-expansion-panel>
                                <v-expansion-panel-title>
                                    <h3>ຕຳແຫນ່ງ</h3>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <div>
                                        <div class="text-h6 mb-2">
                                            <span>ຕຳແຫນ່ງ: </span>
                                            <strong class="ml-2">{{
                                                user?.position || '...'
                                            }}</strong>
                                        </div>
                                        <div class="text-h6 mb-2">
                                            <span>ສິດນໍາໃຊ້: </span>
                                            <strong class="ml-2">{{
                                                user?.role?.title || '...'
                                            }}</strong>
                                        </div>
                                        <div class="text-h6 mb-2">
                                            <span>ສະຖາບັນ: </span>
                                            <strong class="ml-2">{{
                                                user?.institutions?.title ||
                                                '...'
                                            }}</strong>
                                        </div>
                                        <div class="text-h6 mb-2">
                                            <span>ພະແນກ: </span>
                                            <strong class="ml-2">{{
                                                user?.division?.name || '...'
                                            }}</strong>
                                        </div>

                                        <div class="text-h6 mb-2">
                                            <span>ພາກວິຊາ: </span>
                                            <strong class="ml-2">{{
                                                user?.department?.title || '...'
                                            }}</strong>
                                        </div>
                                    </div>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="showDialog" width="350" persistent>
            <v-card>
                <v-card-title class="bg-warning text-white">
                    <span>ລະຫັດຜ່ານໃໝ່</span>
                </v-card-title>
                <v-card-text>
                    <p>
                        <span class="text-error">{{ pwdData }}</span>
                        <v-btn icon size="30" elevation="0" @click="onCopy">
                            <v-icon size="20"> mdi-content-copy </v-icon>
                        </v-btn>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="error"
                        variant="text"
                        @click="showDialog = false"
                    >
                        ຕົກລົງ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import FileSaver from 'file-saver'
import { useToast } from 'vue-toastification'
import { Document, Packer, Paragraph, TextRun, ImageRun } from 'docx'
const toast = useToast()
const userStore = useUserStore()
const route: any = useRoute()
const teacherPosition = ref<Number>(0)
const user = computed(() => userStore.user)
const showDialog = ref<boolean>(false)
const pwdData = ref<string | null>()
const resetLoading = ref(false)
const wordLoading = ref(false)
const { setQueryServerSide, isQueryServerSide } = useMainStore()
// mounted
onMounted(async () => {
    if (!isQueryServerSide) {
        await userStore.setUser(route.params.id)
    }
    setQueryServerSide(false)
})

onUnmounted(() => {
    userStore.setUserClear()
})

if (process.server) {
    await userStore.setUser(route.params.id)
    setQueryServerSide(true)
}

async function doResetPassword() {
    const confirm = window.confirm('ລິເສດລະຫັດຜ່ານໃຫ້ຜູ້ໃຊ້ແທ້ບໍ?')
    if (!confirm || resetLoading.value) {
        return
    }
    resetLoading.value = true
    const pwd = randomPassword(8)
    const result = await userStore.resetPassword(route.params.id, pwd)
    if (result) {
        // alert('ລະຫັດຜ່ານໃໝ່ແມ່ນ ' + pwd)
        showDialog.value = true
        pwdData.value = pwd
    } else {
        alert('ລິເສດລະຫັດຜ່ານລົ້ມເຫຼວ')
    }
    resetLoading.value = false
}

function randomPassword(length: number) {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        )
        counter += 1
    }
    return result
}

async function onExportToWord() {
    if (!user?.value?.id || wordLoading.value) return
    wordLoading.value = true
    try {
        let image: any = null
        if (user?.value?.profile) {
            const { data } = await axios.post(
                '/api/users/download',
                {
                    profile: user?.value?.profile,
                },
                {
                    responseType: 'arraybuffer',
                },
            )
            image = data
        }
        const text: any = {
            sections: [
                {
                    properties: {},
                    children: [],
                },
            ],
        }
        text.sections[0].children.push(
            new Paragraph({
                children: [
                    user?.value?.profile
                        ? new ImageRun({
                              data: image,
                              transformation: {
                                  width: 150,
                                  height: 200,
                              },
                          })
                        : new TextRun({
                              text: 'ບໍ່ມີຮູບໂປຼຟາຍລ໌',
                              font: 'Phetsarath OT',
                              bold: true,
                              size: 24,
                          }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: '',
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ຊື່ ແລະ ນາມສະກຸນ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text: user?.value?.name || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ເພດ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text:
                            GENDERS.find(
                                (item: any) =>
                                    (item?.en).toLowerCase() ==
                                    user?.value?.gender?.toLowerCase(),
                            )?.la || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ວັນເດືອນປີເກີດ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text:
                            useMoment(
                                user?.value?.birthday || '',
                                'DD/MM/YYYY',
                            ) || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ເບີໂທ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text: user?.value?.phoneNumber || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ຕຳແໜ່ງ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text: user?.value?.position || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ສິດນຳໃຊ້ລະບົບ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text: user?.value?.role?.title || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'ສະຖາບັນ: ',
                        font: 'Phetsarath OT',
                        bold: true,
                        size: 24,
                    }),
                    new TextRun({
                        text: user?.value?.institutions?.title || '...',
                        font: 'Phetsarath OT',
                        size: 24,
                    }),
                ],
            }),
        )
        if (user?.value?.division?.name) {
            text.sections[0].children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'ພະແນກ: ',
                            font: 'Phetsarath OT',
                            bold: true,
                            size: 24,
                        }),
                        new TextRun({
                            text: user?.value?.division?.name || '...',
                            font: 'Phetsarath OT',
                            size: 24,
                        }),
                    ],
                }),
            )
        }

        if (user?.value?.division?.name) {
            text.sections[0].children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'ພາກວິຊາ: ',
                            font: 'Phetsarath OT',
                            bold: true,
                            size: 24,
                        }),
                        new TextRun({
                            text: user?.value?.department?.title || '...',
                            font: 'Phetsarath OT',
                            size: 24,
                        }),
                    ],
                }),
            )
        }

        const doc = new Document(text)
        Packer.toBlob(doc).then((blob) => {
            FileSaver.saveAs(
                blob,
                `ອາຈານ-${user?.value?.id}-${user?.value?.name}-${Date.now()}`,
            )
        })
    } catch (error) {
        console.log(error)
    }
    wordLoading.value = false
}
const onCopy = () => {
    navigator.clipboard.writeText(pwdData.value as string)
    toast.warning('ກອບປີແລ້ວ')
}
</script>
