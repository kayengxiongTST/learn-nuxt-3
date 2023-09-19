<template>
    <div class="mb-2">
        <div class="d-flex justify-space-between">
            <h1>
                {{ title }}
                <span v-if="length">({{ length }})</span>
            </h1>

            <div v-if="path">
                <v-btn
                    elevation="0"
                    color="primary"
                    @click="
                        () => {
                            router.push(path)
                        }
                    "
                >
                    {{ btnTitle }}
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const router = useRouter()

defineProps({
    title: {
        type: String,
        default: 'Title',
    },
    btnTitle: {
        type: String,
        default: 'Button Title',
    },
    path: {
        type: String,
        default: '',
    },
    length: {
        type: Number,
        default: 0,
    },
})
</script>
