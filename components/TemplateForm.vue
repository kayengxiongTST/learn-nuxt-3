<template>
  <v-card variant="flat" class="mt-5">
    <v-card-title>
      <strong>{{ title }}</strong>
    </v-card-title>
    <v-card-text>
      <VueDraggableNext v-model="templates" handle=".handle">
        <div
          v-for="(template, index) in templates"
          :key="index"
          class="my-1"
        >
          <v-card-title>
            <div class="d-flex align-center">
              <div class="cursor-pointer handle">
                <v-icon size="small" color="grey">
                  mdi-drag-horizontal-variant
                </v-icon>
              </div>
              <v-text-field
                v-model="template.title"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mx-2"
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
                />
                <v-checkbox
                  v-model="template.is_comment"
                  label="ມີຄວາມຄິດເຫັນ"
                  hide-details="auto"
                  class="mr-3"
                  dense
                />
                <v-btn
                  icon
                  elevation="0"
                  size="x-small"
                  color="error"
                  @click="onDeleteItem(index)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-title>
        </div>
      </VueDraggableNext>
    </v-card-text>
    <v-card-text class="mt-0 pt-0 text-end">
      <v-btn size="small" color="primary" icon @click="onAddMore">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
defineProps({
    title: {
        type: String,
        default: 'ຄຳຖາມປະເມີນ'
    }
})
const questionType = [
    {
        text: 'ຫົວຂໍ້ຫຼັກ',
        value: 'section'
    },
    {
        text: 'ຄຳຖາມ',
        value: 'question'
    },
    {
        text: 'ອັບໂຫລດ File',
        value: 'file'
    }
]

const templates = ref([
    {
        title: 'ຫົວຂໍ້ຫຼັກ-ຄວາມເປັນມາ',
        is_comment: false,
        type: null
    }
])

function onDeleteItem (index: number) {
    templates.value.splice(index, 1)
}
function onAddMore () {
    templates.value.push({ title: '', is_comment: false, type: null })
}
</script>
