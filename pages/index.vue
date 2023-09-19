<template>
    <div>
        <h1 class="text-center">
            <span>ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບປະເມີນຫຼັກສູດ</span>
        </h1>
        <img
            style="width: 100%; opacity: 0.5"
            src="/image/dongkhamxang.jpeg"
            alt="afa"
            srcset=""
        />
    </div>
</template>

<script setup lang="ts">
const { setQueryServerSide, isQueryServerSide } = useMainStore()
const formStore = useFormStore()
onMounted(async () => {
    if (!isQueryServerSide) {
        formStore.getNotifications()
    }
    setQueryServerSide(false)
})
</script>
