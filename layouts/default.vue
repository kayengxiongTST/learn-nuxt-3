<template>
    <div>
        <v-app class="sar-primary-backgorund">
            <v-navigation-drawer v-model="drawerModel">
                <div class="text-center py-4">
                    <v-icon icon="mdi-account" size="x-large" />
                    <br />
                    <strong>{{ name }}</strong>
                </div>
                <v-divider />
                <v-list-item
                    v-if="roleId == '2'"
                    v-for="(item, index) in sideNavs2"
                    :key="index"
                    :to="item.to"
                >
                    <template #prepend>
                        <v-icon :icon="item.icon" />
                    </template>
                    <v-list-item-title>{{ item.name }} </v-list-item-title>
                    <template v-slot:append v-if="item.to == '/forms'">
                        <v-badge
                            :model-value="notificationCount > 0"
                            :content="
                                notificationCount < 10
                                    ? notificationCount
                                    : '10+'
                            "
                            size="small"
                            color="error"
                        ></v-badge>
                    </template>
                </v-list-item>

                <v-list-item
                    v-else
                    v-for="(item, idx) in sideNavs"
                    :key="idx"
                    :to="item.to"
                >
                    <template #prepend>
                        <v-icon :icon="item.icon" />
                    </template>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <template v-slot:append v-if="item.to == '/forms'">
                        <v-badge
                            :model-value="notificationCount > 0"
                            :content="
                                notificationCount < 10
                                    ? notificationCount
                                    : '10+'
                            "
                            size="small"
                            color="error"
                        ></v-badge>
                    </template>
                </v-list-item>
            </v-navigation-drawer>

            <v-app-bar color="primary">
                <v-app-bar-nav-icon @click.stop="drawerModel = !drawerModel">
                    <v-icon>
                        {{ drawerModel ? 'mdi-close' : 'mdi-menu' }}
                    </v-icon>
                </v-app-bar-nav-icon>
                <v-app-bar-title>AFA-SAR</v-app-bar-title>
                <v-spacer />
                <v-badge
                    :model-value="notificationCount > 0"
                    :content="
                        notificationCount < 10 ? notificationCount : '10+'
                    "
                    size="small"
                    color="error"
                    class="pointer"
                >
                    <v-icon>mdi-bell</v-icon>
                    <v-menu
                        activator="parent"
                        max-height="234px"
                        v-if="notificationCount > 0"
                    >
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in notifications"
                                :key="index"
                                :value="index"
                                @click="navigateTo('/forms/view/' + item.id)"
                            >
                                <v-list-item-title>
                                    {{ item.title }}
                                </v-list-item-title>
                                <v-list-item-subtitle class="text-end">
                                    {{ useMoment(item.updatedAt) }}
                                </v-list-item-subtitle>
                                <template v-slot:append>
                                    <v-badge
                                        :model-value="item.unRead > 0"
                                        :content="item.unRead"
                                        size="small"
                                        color="error"
                                        class="pointer"
                                    >
                                    </v-badge>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-badge>
                <v-menu location="bottom">
                    <template #activator="{ props }">
                        <v-btn
                            append-icon="mdi-menu-down"
                            class="ml-2"
                            v-bind="props"
                        >
                            {{ name }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="(item, index) in dropdowns"
                            :key="index"
                            link
                            @click="item.clickEvt()"
                        >
                            <v-list-item-title :class="item.color">
                                <v-icon>{{ item.icon }}</v-icon>
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>

            <v-main class="mx-4 mt-5">
                <slot />
            </v-main>
        </v-app>

        <v-dialog
            v-model="changePasswordDialog"
            max-width="360"
            :persistent="true"
        >
            <v-card>
                <v-card-title>ປ່ຽນລະຫັດຜ່ານ</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form
                            v-model="isValidatePassword"
                            ref="refFormPassword"
                        >
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="form.oldPassword"
                                        type="password"
                                        variant="outlined"
                                        density="compact"
                                        hide-details="auto"
                                        class="mx-2"
                                        label="ລະຫັດຜ່ານເກົ່າ"
                                        placeholder="ລະຫັດຜ່ານເກົ່າ"
                                        :rules="[
                                            (v) =>
                                                !!v ||
                                                'ກະລຸນາປ້ອນລະຫັດຜ່ານເກົ່າ',
                                        ]"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="form.newPassword"
                                        type="password"
                                        variant="outlined"
                                        density="compact"
                                        hide-details="auto"
                                        class="mx-2"
                                        label="ລະຫັດຜ່ານໃໝ່"
                                        placeholder="ລະຫັດຜ່ານໃໝ່"
                                        :rules="[
                                            (v) =>
                                                !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່',
                                        ]"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="form.confirmPassword"
                                        type="password"
                                        variant="outlined"
                                        density="compact"
                                        hide-details="auto"
                                        class="mx-2"
                                        label="ຢືນຢັນລະຫັດຜ່ານ"
                                        placeholder="ຢືນຢັນລະຫັດຜ່ານ"
                                        :rules="[
                                            (v) => !!v || 'ກະລຸນາຢືນຢັນລະຫັດ',
                                            (v) =>
                                                v == form.newPassword ||
                                                'ຢືນຢັນລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
                                        ]"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn
                                        color="primary"
                                        variant="flat"
                                        class="mr-3"
                                        block
                                        :loading="changePasswordLoading"
                                        @click="onChangePassword"
                                    >
                                        ຕົກລົງ
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn
                                        color="error"
                                        variant="outlined"
                                        block
                                        @click="onCancleChange"
                                    >
                                        ຍົກເລີກ
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
/*const { fetchRoles } = useRoleStore()
const { setInstitutions } = useInstitutionStore()
const { setDepartments } = useDepartmentStore()
const { setDegrees } = useDegreeStore()*/

const { setQueryServerSide, isQueryServerSide } = useMainStore()
const cookie = useCookie('token')
const name = useCookie('name')
const roleId = useCookie('roleId')
const formStore = useFormStore()
const userStore = useUserStore()

const notificationCount = computed(() => formStore.notificationCount)
const notifications = computed(() => formStore.notifications)

const drawerModel = ref(false)
const sideNavs2 = ref([
    { name: 'ໜ້າຫຼັກ', icon: 'mdi-view-dashboard', to: '/' },
    { name: 'ຮ່າງປະເມີນ', icon: 'mdi-form-select', to: '/templates' },
    { name: 'ປະເມີນຫຼັກສູດ', icon: 'mdi-file-document', to: '/forms' },
    { name: 'ຜູ້ຮ່ວມປະເມີນ', icon: 'mdi-account-group', to: '/users' },
])
const sideNavs = ref([
    { name: 'ໜ້າຫຼັກ', icon: 'mdi-view-dashboard', to: '/' },
    { name: 'ປະເມີນຫຼັກສູດ', icon: 'mdi-file-document', to: '/forms' },
])

const dropdowns = ref([
    {
        title: 'ປ່ຽນລະຫັດຜ່ານ',
        icon: 'mdi-key',
        color: '',
        clickEvt: () => {
            changePasswordDialog.value = true
        },
    },
    {
        title: 'ອອກຈາກລະບົບ',
        icon: 'mdi-logout',
        color: 'text-error',
        clickEvt: () => {
            logout()
        },
    },
])

const isValidatePassword = ref(false)
const refFormPassword = ref<HTMLFormElement>()
const changePasswordDialog = ref(false)
const changePasswordLoading = ref(false)
const form = ref({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
})

// onMounted(async () => {
//     if (!isQueryServerSide) {
//         formStore.getNotifications()
//     }
//     setQueryServerSide(false)
// })

if (process.server) {
    formStore.getNotifications()
    setQueryServerSide(true)
}

if (process.client) {
    const wd: any = window || {}
    if (wd.innerWidth >= 1280) {
        drawerModel.value = true
    } else {
        drawerModel.value = false
    }
}
async function onChangePassword() {
    await refFormPassword?.value?.validate()
    if (!isValidatePassword.value) return
    const confirm = window.confirm('ປ່ຽນລະຫັດຜ່ານແທ້ບໍ?')
    if (!confirm || changePasswordLoading.value) return
    changePasswordLoading.value = true
    const result = await userStore.changePassword(
        form.value.oldPassword,
        form.value.newPassword,
    )
    if (result) {
        changePasswordDialog.value = false
        refFormPassword.value?.reset()
        alert('ປ່ຽນລະຫັດຜ່ານສຳເລັດແລ້ວ')
    } else {
        alert('ປ່ຽນລະຫັດຜ່ານລົ້ມເຫຼວ')
    }
    changePasswordLoading.value = false
}
function onCancleChange() {
    if (changePasswordLoading.value) return
    changePasswordDialog.value = false
    changePasswordLoading.value = false
}

// method
const logout = () => {
    cookie.value = ''
    navigateTo('/login')
}
</script>
