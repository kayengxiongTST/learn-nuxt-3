<template>
    <div class="loader" :style="styleBinding" :class="bindClass"></div>
</template>

<script setup lang="ts">
const props = defineProps({
    height: {
        type: [Number, String],
        default: 100,
    },
    width: {
        type: [Number, String],
        default: 200,
    },
    color: {
        type: String,
        default: 'rgba(0, 0, 0, 12%)',
    },
    animation: {
        type: String,
        default: 'wave',
    },
    type: {
        type: String,
        default: 'rect',
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    radius: {
        type: [Number, String],
        default: 4,
    },
})
const bindClass = computed(() => {
    return `animation--${props.animation} shape--${props.type} shape--${
        props.rounded ? 'round' : 'flat'
    }`
})
const styleBinding = ref('')
const width = typeof props.width === 'number' ? `${props.width}px` : props.width
const height =
    typeof props.width === 'number' ? `${props.height}px` : props.height
const background = `${props.color}`
const borderRadius = props.rounded ? `${props.radius}px` : 0
styleBinding.value = `width: ${width}; height: ${height}; background-color: ${background}; border-radius: ${borderRadius};`
</script>

<style scoped>
.loader {
    overflow: hidden;

    /* width: 100px;
  height: 100px; */
    position: relative;
}
.loader::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}

/* Shape stylings */
.shape--text {
    height: 20px;
}
.shape--round {
    border-radius: 8px;
}
.animation--fade {
    animation: fade 1.5s linear 0.5s infinite;
}
.animation--wave::before {
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 50%),
        transparent
    );
    background: linear-gradient(
        90deg,
        transparent,
        var(--gradient-color),
        transparent
    );
    animation: wave 1.5s linear 0.5s infinite;
}
.animation--pulse-x {
    animation: pulse-x 1.5s linear 0.5s infinite;
}
.animation--pulse-y {
    animation: pulse-y 1.5s linear 0.5s infinite;
}
.animation--pulse {
    animation: pulse 1.5s linear 0.5s infinite;
}
</style>
