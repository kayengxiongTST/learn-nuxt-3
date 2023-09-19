<template>
    <div class="mt-10">
        <v-row class="mt-5">
            <v-col cols="12" md="4" class="mx-auto text-center">
                <img src="/logoAfa.png" alt="Hello World" width="180" />
                <div>
                    <h1>ລະບົບປະເມີນຫຼັກສູດ</h1>
                    <h1>AFA-SAR</h1>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" class="mx-auto">
                <v-form @submit.prevent="submitForm">
                    <v-card flat>
                        <v-card-text>
                            <div>
                                <v-text-field
                                    v-model="form.username"
                                    variant="outlined"
                                    density="compact"
                                    type="email"
                                    label="ອີເມວ"
                                    :rules="[
                                        (v) => !!v || 'ກະລຸນາປ້ອນອີເມວ',
                                        (v) =>
                                            v.test(
                                                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                            ) || 'ອີເມວບໍ່ຖືກຕ້ອງ',
                                    ]"
                                    prepend-inner-icon="mdi-account"
                                />
                            </div>
                            <div>
                                <v-text-field
                                    v-model="form.password"
                                    variant="outlined"
                                    density="compact"
                                    label="ລະຫັດຜ່ານ"
                                    prepend-inner-icon="mdi-lock"
                                    :rules="[
                                        (v) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ',
                                    ]"
                                    :type="showPassword ? 'text' : 'password'"
                                    :append-inner-icon="
                                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append-inner="
                                        showPassword = !showPassword
                                    "
                                />
                            </div>
                            <div>
                                <v-btn
                                    type="submit"
                                    block
                                    size="large"
                                    elevation="0"
                                    color="primary"
                                    :loading="loading"
                                >
                                    ເຂົ້າສູ່ລະບົບ
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import { useToast } from 'vue-toastification'
definePageMeta({
    layout: 'blank',
})

// reference
const toast = useToast()
const showPassword = ref(false)
const loading = ref(false)
const form: any = ref({
    username: 'sdev@gmail.com',
    password: 'testing1234',
})

// method
const submitForm = async () => {
    loading.value = true
    const { data } = await useServer('auth/login', {
        method: 'POST',
        body: JSON.parse(JSON.stringify(form.value)),
    })
    const _response: any = data?.value
    if (_response?.success) {
        window.location.replace('/')
    } else {
        toast.error('ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖຶກຕ້ອງ')
    }
    loading.value = false
}
</script>
