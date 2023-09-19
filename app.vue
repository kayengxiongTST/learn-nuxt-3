<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "ລະບົບປະເມີນຫຼັກສູດ",
  ogTitle: "ລະບົບປະເມີນຫຼັກສູດ",
  description: "ລະບົບປະເມີນຫຼັກສູດ",
  ogDescription: "ລະບົບປະເມີນຫຼັກສູດ",
  ogImage: "https://entrance.aef.edu.la/images/dongkhamxang.jpeg",
  
});
</script>
<style>
.wrapper {
    display: grid;
    width: 100%;
    position: relative;
    grid-template-columns: 40px 3fr 1fr;
    gap: 5px;
}
.cursor-pointer {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.cursor-pointer:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}
.cs-btn {
    padding: 6px 10px;
    background-color: #057cae;
    color: white;
    border-radius: 3px;
}
.v-expansion-panel__shadow {
    box-shadow: none !important;
}
.cs-panels {
    border: 1px solid #f1f1f1 !important;
    border-radius: 5px !important;
}
</style>
