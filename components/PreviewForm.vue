<template>
    <v-card-text>
        <div v-for="(template, index) in templates" :key="index" class="my-1">
            <v-card-title>
                <div
                    class="d-flex align-center"
                    :class="
                        template.type == 'subsection'
                            ? 'pl-6'
                            : template.type == 'text' || template.type == 'file'
                            ? 'pl-12'
                            : ''
                    "
                >
                    <v-text-field
                        v-model="template.title"
                        variant="outlined"
                        density="compact"
                        hide-details="auto"
                        class="mx-2"
                        readonly
                        :bg-color="
                            template.type == 'section'
                                ? 'grey'
                                : template.type == 'subsection'
                                ? '#DCDCDC'
                                : ''
                        "
                    />
                    <div class="d-flex align-center">
                        <v-select
                            v-model="template.type"
                            :items="questionType"
                            item-title="text"
                            item-value="value"
                            density="compact"
                            label="ປະເພດຄຳຖາມ"
                            hide-details="auto"
                            variant="outlined"
                            style="width: 150px"
                            readonly
                            :bg-color="
                                template.type == 'section'
                                    ? 'grey'
                                    : template.type == 'subsection'
                                    ? '#DCDCDC'
                                    : ''
                            "
                        />
                        <v-checkbox
                            v-model="template.isComment"
                            label="ມີຄວາມຄິດເຫັນ"
                            hide-details="auto"
                            class="mr-3"
                            dense
                            readonly
                        />
                    </div>
                </div>
            </v-card-title>
        </div>
    </v-card-text>
</template>

<script setup lang="ts">
interface Template {
    id?: string | null | undefined
    title: string
    type: string | null
    isComment: boolean
    sequence: number
}

defineProps({
    displaySaveButton: {
        type: Boolean,
        default: true,
    },
    templates: {
        type: Array<Template>,
        default: () => [],
    },
})
const questionType = [
    {
        text: 'ຫົວຂໍ້ຫຼັກ',
        value: 'section',
    },
    {
        text: 'ຄຳຖາມ',
        value: 'question',
    },
    {
        text: 'ອັບໂຫລດ File',
        value: 'file',
    },
]
</script>
