<template>
    <v-dialog v-model="value" max-width="300" :persistent="true">
        <v-card>
            <v-card-text class="text-center">
                <v-icon size="52" color="error"> mdi-alert-circle </v-icon>
            </v-card-text>
            <v-card-title> {{ props.title }} </v-card-title>
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
                <v-btn color="error" variant="text" @click="onCancle">
                    ຍົກເລີກ
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps(['modelValue', 'loading', 'title'])
const emit = defineEmits(['update:modelValue', 'confirm', 'cancle'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})
function onConfirm() {
    emit('confirm')
}
function onCancle() {
    value.value = false
    emit('cancle')
}
</script>
