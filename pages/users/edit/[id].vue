<template>
    <div>
        <CustomerHeader title="ແກ້ໄຂຜູ້ຮ່ວມປະເມີນ" />
        <v-card variant="flat">
            <v-card-text>
                <v-form
                    @submit.prevent="submitForm"
                    v-model="isValidateUserEdit"
                    ref="refFormEdit"
                >
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-expansion-panels
                                v-model="teacherInfo"
                                variant="accordion"
                            >
                                <v-expansion-panel>
                                    <v-expansion-panel-title>
                                        <h3>ຂໍ້ມູນອາຈານ</h3>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <div>
                                            <v-row>
                                                <v-col>
                                                    <v-card
                                                        v-if="profileBase64"
                                                        :image="profileBase64"
                                                        tile
                                                        class="d-flex justify-center align-center object-contain cursor-pointer"
                                                        width="150px"
                                                        height="200px"
                                                        @click=""
                                                    />

                                                    <v-card
                                                        v-else-if="form.profile"
                                                        :image="
                                                            useCdn() +
                                                            form.profile
                                                        "
                                                        tile
                                                        class="d-flex justify-center align-center object-contain cursor-pointer"
                                                        width="150px"
                                                        height="200px"
                                                        @click=""
                                                    />

                                                    <v-card
                                                        v-else
                                                        class="d-flex justify-center align-center"
                                                        width="150px"
                                                        height="200px"
                                                    >
                                                        ອັບໂລດຮູບ
                                                    </v-card>
                                                    <v-btn
                                                        class="my-2"
                                                        width="150px"
                                                        @click="profile.click()"
                                                    >
                                                        <v-icon
                                                            class="w-6 h-6 text-primary"
                                                        >
                                                            mdi-upload
                                                        </v-icon>
                                                        <span>ອັບໂລດຮູບ</span>
                                                        <input
                                                            ref="profile"
                                                            type="file"
                                                            accept="image/*"
                                                            style="
                                                                display: none;
                                                            "
                                                            @change="
                                                                setUploadProfile
                                                            "
                                                        />
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </div>
                                        <div>
                                            <label for="gender"
                                                >ເພດ
                                                <span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-radio-group
                                                v-model="form.gender"
                                                id="gender"
                                                inline
                                                density="compact"
                                                :rules="[
                                                    (v) =>
                                                        !!v || 'ກະລຸນາເລືອກເພດ',
                                                ]"
                                            >
                                                <v-radio
                                                    label="ຍິງ"
                                                    value="female"
                                                />
                                                <v-radio
                                                    label="ຊາຍ"
                                                    value="male"
                                                    class="ml-5"
                                                />
                                            </v-radio-group>
                                        </div>
                                        <div class="mt-3">
                                            <label for="first-name"
                                                >ຊື່
                                                <span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="first-name"
                                                v-model="form.firstName.la"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ຊື່"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນຊື່ (ລາວ)',
                                                ]"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="last-name"
                                                >ນາມສະກຸນ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="last-name"
                                                v-model="form.lastName.la"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ນາມສະກຸນ"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນນາມສະກຸນ (ລາວ)',
                                                ]"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="first-name"
                                                >ຊື່ (ໍອັງກິດ)
                                                <!-- <span class="text-red">*</span> -->
                                            </label>
                                            <v-text-field
                                                id="first-name"
                                                v-model="form.firstName.en"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ຊື່"
                                                hide-details="auto"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="last-name"
                                                >ນາມສະກຸນ (ອັງກິດ)
                                                <!-- <span class="text-red">*</span> -->
                                            </label>
                                            <v-text-field
                                                id="last-name"
                                                v-model="form.lastName.en"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ນາມສະກຸນ"
                                                hide-details="auto"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="birthday"
                                                >ວັນເດືອນປີເກີດ
                                                <span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="birthday"
                                                v-model="form.birthday"
                                                variant="outlined"
                                                type="date"
                                                placeholder="ເລືອກວັນເດືອນປີເກີດ"
                                                hide-details="auto"
                                                density="compact"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາເລືອກວັນເດືອນປີເກີດ',
                                                ]"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="phone">
                                                ເບີໂທ
                                                <span class="text-red">*</span>
                                            </label>
                                            <v-text-field
                                                id="phone"
                                                v-model="form.phoneNumber"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ເບີໂທ"
                                                type="text"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນເບີໂທ',
                                                    (v) =>
                                                        !isNaN(v) ||
                                                        'ເບີໂທຕ້ອງເປັນຕົວເລກ',
                                                ]"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="email"
                                                >ອີເມວ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="email"
                                                v-model="form.username"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ອີເມວ"
                                                type="email"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນອີເມວ',
                                                    (v) =>
                                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
                                                            v,
                                                        ) || 'ອີເມວບໍ່ຖືກຕ້ອງ',
                                                ]"
                                                readonly
                                            />
                                        </div>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                        <v-col cols="12" sm="6">
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
                                            <label for="position"
                                                >ຕຳແຫນ່ງ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="position"
                                                v-model="form.position"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ຕຳແຫນ່ງ"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນຕຳແຫນ່ງ',
                                                ]"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="role"
                                                >ສິດນໍາໃຊ້<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-select
                                                id="role"
                                                v-model="form.roleId"
                                                :items="roles"
                                                item-title="title"
                                                item-value="id"
                                                variant="outlined"
                                                placeholder="ສິດນໍາໃຊ້"
                                                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາເລືອກສິດທິຜູ້ໃຊ້',
                                                ]"
                                                density="compact"
                                                @update:modelValue="
                                                    roleChange()
                                                "
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="institution"
                                                >ເລືອກສະຖາບັນ</label
                                            >
                                            <v-select
                                                id="institution"
                                                v-model="form.institutionId"
                                                :items="getInstitutions"
                                                item-title="title"
                                                item-value="id"
                                                variant="outlined"
                                                placeholder="ເລືອກສະຖາບັນ"
                                                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                                                hide-details="auto"
                                                density="compact"
                                                @update:modelValue="
                                                    institutionChange()
                                                "
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="division"
                                                >ເລືອກພະແນກ</label
                                            >
                                            <v-select
                                                id="division"
                                                v-model="form.divisionId"
                                                :items="
                                                    getDivisions.filter(
                                                        (div) =>
                                                            div.institutionId ==
                                                            form.institutionId,
                                                    )
                                                "
                                                :disabled="
                                                    form.roleId == 3 ||
                                                    form.roleId == 4
                                                "
                                                item-title="name"
                                                item-value="id"
                                                variant="outlined"
                                                placeholder="ເລືອກພະແນກ"
                                                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                                                hide-details="auto"
                                                density="compact"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="department"
                                                >ເລືອກພາກວິຊາ</label
                                            >
                                            <v-select
                                                id="department"
                                                v-model="form.departmentId"
                                                :items="
                                                    getDepartments.filter(
                                                        (dep) =>
                                                            dep.institutionId ==
                                                            form.institutionId,
                                                    )
                                                "
                                                item-title="title"
                                                item-value="id"
                                                variant="outlined"
                                                placeholder="ເລືອກພາກວິຊາ"
                                                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                                                hide-details="auto"
                                                density="compact"
                                                :disabled="
                                                    department(form.roleId) ===
                                                        'ສະພາວິຊາການ' ||
                                                    department(form.roleId) ===
                                                        'ປະກັນຄຸນນະພາບ'
                                                "
                                            />
                                        </div>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="10" class="mx-auto mt-10">
                            <v-row>
                                <v-col cols="12">
                                    <div class="text-end">
                                        <v-btn
                                            type="button"
                                            :elevation="0"
                                            size="large"
                                            color="error"
                                            variant="outlined"
                                            @click="router.back()"
                                        >
                                            ຍົກເລີກ
                                        </v-btn>
                                        <v-btn
                                            type="submit"
                                            :elevation="0"
                                            class="ml-2"
                                            size="large"
                                            color="primary"
                                            :loading="loading"
                                        >
                                            ບັນທຶກ
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>

        <!-- crooper dialog -->
        <v-dialog v-model="isCropperVisible" width="auto">
            <v-card color="#7f7f7f">
                <div @click="onShowCropper" />
                <div class="pa-2">
                    <v-card class="" height="70vh" width="600px">
                        <cropper
                            ref="cropperImg"
                            class="cropper"
                            :src="image.src"
                            :stencil-size="{
                                width: 148.7,
                                height: 200,
                            }"
                        />
                    </v-card>
                    <div class="pa-3 mt-2 text-center space-x-4 md:block">
                        <v-btn
                            id="btnClose"
                            color="success"
                            class="mb-2 md:mb-0 bg-white px-5 py-2 mx-3"
                            @click="onShowCropper()"
                        >
                            ກັບຄືນ
                        </v-btn>
                        <v-btn
                            id="btnSave"
                            color="primary"
                            class="mb-2 md:mb-0 bg-primary px-5 py-2 mx-3"
                            @click="cropImage()"
                        >
                            ບັນທືກ
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { useToast } from 'vue-toastification'
import { userModel } from '~/models/userModel'
const toast = useToast()

// reference
const loading = ref<boolean>(false)
const teacherInfo = ref<number>(0)
const teacherPosition = ref<Number>(0)
const isCropper = ref<boolean>(true)
const isCropperVisible = ref(false)
const cropperImg: any = ref<HTMLInputElement | null>(null)
const profileBase64: any = ref()
const profileTarget = ref<any>()
const profile = ref<any>(null)

let isValidateUserEdit = ref(false)
const refFormEdit = ref<HTMLFormElement>()

const form = ref<userModel>({
    id: null,
    name: 'Full name',
    email: null,
    username: null,
    roleId: null,
    divisionId: null,
    firstName: {
        la: null,
        en: null,
    },
    lastName: {
        la: null,
        en: null,
    },
    phoneNumber: null,
    profile: null,
    position: null,
    gender: null,
    birthday: null,
    departmentId: null,
    institutionId: null,
    department: {
        id: null,
        institutionId: null,
        title: null,
    },
    role: { id: null, title: null },
    institutions: { id: null, title: null },
    password: null,
} as userModel)

const userStore = useUserStore()
const { roles } = useRoleStore()
const { getInstitutions } = useInstitutionStore()
const { getDepartments } = useDepartmentStore()
const { getDivisions } = useDivisionStore()
const { setQueryServerSide, isQueryServerSide } = useMainStore()
const router = useRouter()
const route = useRoute()
const id: any = route?.params?.id

onMounted(async () => {
    if (!isQueryServerSide) {
        // await getUserInfo()
        await userStore.setUser(id)
    }
    if (userStore.getUser.id) {
        form.value = {
            id: userStore.getUser.id,
            name: userStore.getUser.name,
            email: userStore.getUser.email,
            username: userStore.getUser.username,
            roleId: userStore.getUser.roleId,
            divisionId: userStore.getUser.divisionId,
            firstName: userStore.getUser.firstName || {},
            lastName: userStore.getUser.lastName || {},
            phoneNumber: userStore.getUser.phoneNumber,
            profile: userStore.getUser.profile,
            position: userStore.getUser.position,
            gender: userStore.getUser.gender,
            birthday: userStore.getUser.birthday,
            departmentId: userStore.getUser.departmentId,
            institutionId: userStore.getUser.institutionId,
            department: userStore.getUser.department || {},
            role: userStore.getUser.role || {},
            institutions: userStore.getUser.institutions || {},
            password: null,
        } as userModel
    }
    setQueryServerSide(false)
})

if (process.server) {
    // await getUserInfo() /tria
    await userStore.setUser(id)
    setQueryServerSide(true)
}

onUnmounted(() => {
    userStore.setUserClear()
})

/**
 * Get student info
 */
async function getUserInfo() {
    const { data } = await useServer(`users/${route.params?.id}`, {})
    const res: any = data?.value
    if (res?.success) {
        const data = res?.data
        form.value = {
            id: data.id,
            name: data.name,
            email: data.email,
            username: data.username,
            roleId: data.roleId,
            divisionId: data.divisionId,
            firstName: data.firstName || {},
            lastName: data.lastName || {},
            phoneNumber: data.phoneNumber,
            profile: data.profile,
            position: data.position,
            gender: data.gender,
            birthday: data.birthday,
            departmentId: data.departmentId,
            institutionId: data.institutionId,
            department: data.department || {},
            role: data.role || {},
            institutions: data.institutions || {},
            password: null,
        } as userModel
    }
}

// method
const submitForm = async () => {
    await refFormEdit?.value?.validate()
    if (!(isValidateUserEdit.value == true || isValidateUserEdit.value == null))
        return
    const confirm = window.confirm('ທ່ານຕ້ອງການບັນທືກຂໍ້ມູນຜູ້ໃຊ້ແທ້ບໍ?')
    if (!confirm || loading.value) return
    loading.value = true
    const body = JSON.parse(JSON.stringify(form.value))
    const formData = new FormData()
    formData.append('name', body.firstName?.la + ' ' + body.lastName?.la)
    formData.append('firstName', JSON.stringify(body.firstName))
    formData.append('lastName', JSON.stringify(body.lastName))
    formData.append('email', body.username)
    if (body.institutionId) {
        formData.append('institutionId', body.institutionId)
    }
    if (body.divisionId) {
        formData.append('divisionId', body.divisionId)
    }
    formData.append('gender', body.gender)
    formData.append('roleId', body.roleId)
    if (body.departmentId) {
        formData.append('departmentId', body.departmentId)
    }
    formData.append('phoneNumber', body.phoneNumber)
    formData.append('birthday', body.birthday)
    formData.append('position', body.position)
    if (profileBase64.value) {
        formData.append(
            'profile',
            profileTarget.value,
            profileTarget.value?.name,
        )
    }
    const { data } = await useServer(`users/${route.params?.id}`, {
        method: 'put',
        body: formData,
    })
    const response: any = data?.value
    if (response.success) {
        toast.success('ການແກ້ໄຂສຳເລັດ', { timeout: 2000 })
        router.back()
    } else {
        toast.error('ການແກ້ໄຂບໍ່ສຳເລັດ', { timeout: 2000 })
    }
    loading.value = false
}

function roleChange() {
    form.value.departmentId = null
    form.value.divisionId = null
}

function institutionChange() {
    form.value.departmentId = null
    form.value.divisionId = null
}

const department = (input: number | null): string | null => {
    if (!input) {
        return null
    }
    const data = JSON.parse(JSON.stringify(roles))
    const res = data?.find((el: any) => el.id === input)
    return res.title
}

const image = reactive({
    src: '',
    type: 'image/png',
})
// show  Cropper  for capture
const onShowCropper = () => {
    isCropper.value = !isCropper.value
    isCropperVisible.value = !isCropper.value
}

// upload profile
const setUploadProfile = (event: any) => {
    const { files } = event.target
    if (files && files[0]) {
        const size = files[0].size
        if (image.src) {
            URL.revokeObjectURL(image.src)
        }
        const blob = URL.createObjectURL(files[0])
        Object.assign(image, {
            src: blob,
            type: files[0].type,
        })
        onShowCropper()
    }
}

// captue profile to my size (3X4)
const cropImage = () => {
    const result = cropperImg.value.getResult()
    profileBase64.value = result.canvas.toDataURL(image.type)
    result.canvas.toBlob((b: any) => {
        profileTarget.value = b
    })
    onShowCropper()
}
</script>
