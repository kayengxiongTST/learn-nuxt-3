<template>
    <v-dialog v-model="value" max-width="300" :persistent="true">
        <v-card>
            <v-card-text class="text-center">
                <v-icon size="52" color="error"> mdi-alert-circle </v-icon>
            </v-card-text>
            <v-card-title> ທ່ານຕ້ອງການທີ່ຈະລົບແທ້ບໍ? </v-card-title>
            <v-card-text>
                <v-btn
                    color="primary"
                    variant="flat"
                    class="mr-3"
                    :loading="props.loading"
                    @click="onConfirm"
                >
                    ຕົກລົງ
                </v-btn>
                <v-btn color="error" variant="text" @click="value = false">
                    ຍົກເລີກ
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps(['modelValue', 'loading'])
const emit = defineEmits(['update:modelValue', 'delete'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})
function onConfirm() {
    emit('delete')
}
</script>
