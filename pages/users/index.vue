<template>
    <div>
        <CustomerHeader
            title="ຜູ້ຮ່ວມປະເມີນ"
            btn-title="ເພີ່ມຜູ້ປະເມີນ"
            path="/users/create"
            :length="users?.totalCount || 0"
        />
        <v-row class="mt-5"> 
            <v-col cols="12" md="3">
                <v-autocomplete
                    v-model="filters.institutionId"
                    :items="allInsititutions"
                    item-value="id"
                    variant="outlined"
                    label="ສະຖາບັນ"
                    hide-no-data
                    density="compact"
                    @change="doClearDepartment()"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-select
                    v-model="filters.departmentId"
                    :items="
                        departments.filter(
                            (dep: any) =>
                                dep.institutionId == filters.institutionId ||
                                !dep.institutionId,
                        )
                    "
                    item-title="title"
                    item-value="id"
                    variant="outlined"
                    label="ພາກວິຊາ"
                    hide-details="auto"
                    no-data-text="ບໍ່ມີຂໍ້ມູນ"
                    density="compact"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-select
                    v-model="filters.roleId"
                    :items="allRoles"
                    item-title="title"
                    item-value="id"
                    variant="outlined"
                    label="ສິດນໍາໃຊ້"
                    hide-details="auto"
                    no-data-text="ບໍ່ມີຂໍ້ມູນ"
                    density="compact"
                />
            </v-col>
            <v-col cols="12" md="auto">
                <v-btn
                    elevation="0"
                    color="error"
                    size="large"
                    class="mr-2"
                    @click="onRefresh"
                >
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
                <v-btn
                    elevation="0"
                    color="primary"
                    size="large"
                    @click="onSearch"
                >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-card variant="flat" class="mt-5" :loading="loading">
            <v-table>
                <thead>
                    <tr>
                        <th>ຊື່</th>
                        <th>ຊື່ຜູ້ໃຊ້</th>
                        <th>ສິດນໍາໃຊ້</th>
                        <th style="width: 100px">ຈັດການ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in users.rows" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item?.role?.title }}</td>
                        <td class="d-flex align-center justify-end gap-5">
                            <v-btn
                                color="lightgreen"
                                variant="tonal"
                                icon
                                size="x-small"
                                @click="navigateTo(`/users/${item.id}`)"
                            >
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn
                                elevation="0"
                                icon
                                variant="tonal"
                                size="x-small"
                                class="ml-4"
                                @click="navigateTo(`/users/edit/${item.id}`)"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                                color="error"
                                variant="tonal"
                                icon
                                size="x-small"
                                class="ml-4"
                                @click="onDelete(item.id)"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
        <div v-if="users?.pageCount > 0" class="text-center">
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <v-container class="max-width">
                            <v-pagination
                                v-model="page"
                                class="my-4"
                                active-color="primary"
                                :length="users.pageCount"
                                @click="onSearch"
                            />
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <ErrorDialog
            v-model="displayErrorDialog"
            :loading="deleteLoading"
            @delete="onDelete"
        />
    </div>
</template>
<script setup lang="ts">
import { useToast } from 'vue-toastification'

//
const institutionStore = useInstitutionStore()
const userStore = useUserStore()
const roleStore = useRoleStore()
const departmentStore = useDepartmentStore()
const { setQueryServerSide, isQueryServerSide } = useMainStore()
// ref
const loading = ref(false)
const filters: any = ref({
    page: 1,
})
const page = ref(1)
const displayErrorDialog = ref(false)
const selectedId = ref<string>('')
const deleteLoading = ref<boolean>(false)
const toast = useToast()

// computed
const users: any = computed(() => userStore.users)

const allInsititutions: any = computed(() => [
    { id: null, title: 'ທັງຫມົດ' },
    ...institutionStore.getInstitutions,
])
const allRoles: any = computed(() => [
    { id: null, title: 'ທັງຫມົດ' },
    ...(roleStore.roles as any),
])
const departments: any = computed(() => [
    { id: null, title: 'ທັງຫມົດ' },
    ...departmentStore.getDepartments,
])

onMounted(async () => {
    loading.value = true
    if (!isQueryServerSide) {
        await userStore.setUsers(filters.value)
    }
    setQueryServerSide(false)
    loading.value = false
})

if (process.server) {
    loading.value = true
    await userStore.setUsers(filters.value)
    setQueryServerSide(true)
    loading.value = false
}

function doClearDepartment() {
    filters.value.departmentId = null
}
// methods

async function onSearch() {
    loading.value = true
    filters.value.page = page.value
    await userStore.setUsers(filters.value)
    loading.value = false
}

async function onRefresh() {
    loading.value = true
    filters.value = {
        page: page.value,
    }
    await userStore.setUsers(filters.value)

    loading.value = false
}

async function onDelete(id: string) {
    if (id) {
        selectedId.value = id
        displayErrorDialog.value = true
        return
    }
    deleteLoading.value = true

    const { data } = await useServer(`users/${selectedId.value}`, {
        method: 'DELETE',
    })

    deleteLoading.value = false
    displayErrorDialog.value = false
    await userStore.setUsers(filters.value)
    const response: any = data?.value
    if (response.success) {
        toast.success('ການລົບສຳເລັດ')
    }
}
</script>
