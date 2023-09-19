<template>
    <div>
        <CustomerHeader title="ເພີ່ມຜູ້ຮ່ວມປະເມີນ" />
        <v-card variant="flat">
            <v-card-text>
                <v-form
                    v-model="isValidateUserAdd"
                    ref="refFormAdd"
                    @submit.prevent="submitForm"
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
                                                    ></v-card>

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
                                                    ></v-card>

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
                                                            >mdi-upload</v-icon
                                                        >
                                                        <span>ອັບໂລດຮູບ</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            style="
                                                                display: none;
                                                            "
                                                            @change="
                                                                setUploadProfile
                                                            "
                                                            ref="profile"
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
                                                    label="ຊາຍ"
                                                    value="male"
                                                    class="ml-5"
                                                />
                                                <v-radio
                                                    label="ຍິງ"
                                                    value="female"
                                                />
                                            </v-radio-group>
                                        </div>
                                        <div class="mt-3">
                                            <label for="first-name"
                                                >ຊື່ (ລາວ)
                                                <span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="first-name"
                                                v-model="form.firstName.la"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ຊື່ (ລາວ)"
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
                                                >ນາມສະກຸນ (ລາວ)<span
                                                    class="text-red"
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
                                                >ຊື່ (ອັງກິດ)
                                            </label>
                                            <v-text-field
                                                id="first-name"
                                                v-model="form.firstName.en"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ຊື່ (ອັງກິດ)"
                                                hide-details="auto"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="last-name"
                                                >ນາມສະກຸນ (ອັງກິດ)</label
                                            >
                                            <v-text-field
                                                id="last-name"
                                                v-model="form.lastName.en"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ນາມສະກຸນ (ອັງກິດ)"
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
                                            <label for="phone"
                                                >ເບີໂທ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
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
                                        <!-- <div class="mt-3">
                                            <label for="email"
                                                >ອີເມວ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="email"
                                                v-model="form.email"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ອີເມວ"
                                                type="email"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນອີເມວ',
                                                ]"
                                            />
                                        </div> -->
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
                            <v-expansion-panels
                                v-model="teacherLoginInfo"
                                variant="accordion"
                            >
                                <v-expansion-panel>
                                    <v-expansion-panel-title>
                                        <h3>ຂໍ້ມູນເຂົ້າລະບົບ</h3>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <div>
                                            <label for="username"
                                                >ອິເມວ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="username"
                                                v-model="form.username"
                                                variant="outlined"
                                                density="compact"
                                                type="email"
                                                placeholder="ຊື່ຜູ້ໃຊ້"
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
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="password"
                                                >ລະຫັດຜ່ານ<span class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="password"
                                                v-model="form.password"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ລະຫັດຜ່ານ"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາປ້ອນລະຫັດຜ່ານ',
                                                    (v) =>
                                                        v.length >= 8 ||
                                                        'ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 8 ຕົວອັກສອນ',
                                                ]"
                                                :type="
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                :append-inner-icon="
                                                    showPassword
                                                        ? 'mdi-eye'
                                                        : 'mdi-eye-off'
                                                "
                                                @click:append-inner="
                                                    showPassword = !showPassword
                                                "
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <label for="password"
                                                >ຢຶນຢັນລະຫັດຜ່ານ<span
                                                    class="text-red"
                                                    >*</span
                                                ></label
                                            >
                                            <v-text-field
                                                id="password"
                                                v-model="confirmPassword"
                                                variant="outlined"
                                                density="compact"
                                                placeholder="ລະຫັດຜ່ານ"
                                                hide-details="auto"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'ກະລຸນາຢຶນຢັນລະຫັດຜ່ານ',
                                                    (v) =>
                                                        form.password === v ||
                                                        'ລະຫັດຜ່ານບໍ່ກົງກັນ',
                                                ]"
                                                :type="
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
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
                                            ເພີ່ມຜູ້ໃຊ້
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
                <div @click="onShowCropper"></div>
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
                            color="success"
                            @click="onShowCropper()"
                            id="btnClose"
                            class="mb-2 md:mb-0 bg-white px-5 py-2 mx-3"
                        >
                            ກັບຄືນ
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="cropImage()"
                            id="btnSave"
                            class="mb-2 md:mb-0 bg-primary px-5 py-2 mx-3"
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
const showPassword = ref<boolean>(false)
const loading = ref<boolean>(false)
const teacherInfo = ref<number>(0)
const teacherPosition = ref<Number>(0)
const teacherLoginInfo = ref<number>(0)
const confirmPassword = ref<string | null>(null)
const isCropper = ref<boolean>(true)
const isCropperVisible = ref(false)
const cropperImg: any = ref<HTMLInputElement | null>(null)
const profileBase64: any = ref()
const profileTarget = ref<any>()
const profile = ref<any>(null)

let isValidateUserAdd = ref(false)
const refFormAdd = ref<HTMLFormElement>()

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

const { roles } = useRoleStore()
const { getInstitutions } = useInstitutionStore()
const { getDepartments } = useDepartmentStore()
const { getDivisions } = useDivisionStore()
const router = useRouter()
// method
const submitForm = async () => {
    await refFormAdd?.value?.validate()
    if (!(isValidateUserAdd.value == true || isValidateUserAdd.value == null))
        return
    const confirm = window.confirm('ທ່ານຕ້ອງການເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ແທ້ບໍ?')
    if (!confirm || loading.value) return
    loading.value = true
    const body = JSON.parse(JSON.stringify(form.value))
    const formData = new FormData()
    formData.append('name', body.firstName?.la + ' ' + body.lastName?.la)
    formData.append('firstName', JSON.stringify(body.firstName))
    formData.append('lastName', JSON.stringify(body.lastName))
    formData.append('email', body.username)
    formData.append('username', body.username)
    if (body.institutionId) formData.append('institutionId', body.institutionId)
    if (body.divisionId) formData.append('divisionId', body.divisionId)
    formData.append('gender', body.gender)
    formData.append('roleId', body.roleId)
    if (body.departmentId) formData.append('departmentId', body.departmentId)
    formData.append('phoneNumber', body.phoneNumber)
    formData.append('password', body.password)
    formData.append('birthday', body.birthday)
    formData.append('position', body.position)
    if (profileBase64.value) {
        formData.append(
            'profile',
            profileTarget.value,
            profileTarget.value?.name,
        )
    }
    const { data } = await useServer('auth/signup', {
        method: 'POST',
        body: formData,
    })
    const response: any = data?.value
    if (response.success) {
        toast.success('ການເພີ່ມສຳເລັດ', { timeout: 2000 })
        router.back()
    } else {
        toast.error('ການເພີ່ມບໍ່ສຳເລັດ', { timeout: 2000 })
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

const onShowCropper = () => {
    isCropper.value = !isCropper.value
    isCropperVisible.value = !isCropper.value
}
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
const cropImage = () => {
    const result = cropperImg.value.getResult()
    profileBase64.value = result.canvas.toDataURL(image.type)
    result.canvas.toBlob((b: any) => {
        profileTarget.value = b
    })
    onShowCropper()
}
</script>
