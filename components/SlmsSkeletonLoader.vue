<template>
    <Circle
        v-if="type === 'circle'"
        :width="loaderWidth"
        :height="loaderHeight"
        :animation="animation"
        :color="color"
        :style="styleBinding"
    />
    <Straight
        v-else
        :width="loaderWidth"
        :height="loaderHeight"
        :animation="animation"
        :type="type"
        :color="color"
        :rounded="rounded"
        :radius="radius"
        :style="styleBinding"
    />
</template>

<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        default: 'rect',
    },
    size: {
        type: [Number, String],
        default: '',
    },
    animation: {
        type: String,
        default: 'wave',
    },
    height: {
        type: [Number, String],
        default: '20px',
    },
    width: {
        type: [Number, String],
        default: '100%',
    },
    color: {
        type: String,
        default: 'rgba(0, 0, 0, 12%)',
    },
    waveColor: {
        type: String,
        default: 'rgba(255, 255, 255, 10%)',
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
const loaderWidth = computed(() => {
    if (props.size) {
        return props.size
    } else {
        return props.width
    }
})
const loaderHeight = computed(() => {
    if (props.size) {
        return props.size
    } else {
        return props.height
    }
})
const styleBinding = ref('')
if (props.waveColor) {
    styleBinding.value = '--gradient-color: ' + props.waveColor
}
</script>

<style lang="css">
.loader {
    width: fit-content;

    --gradient-color: rgba(255, 255, 255, 10%);
}

/* Animation definitions */
@keyframes fade {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
}
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.85);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes pulse-x {
    0% {
        transform: scaleX(1);
    }
    50% {
        transform: scaleX(0.75);
    }
    100% {
        transform: scaleX(1);
    }
}
@keyframes pulse-y {
    0% {
        transform: scaleY(1);
    }
    50% {
        transform: scaleY(0.75);
    }
    100% {
        transform: scaleY(1);
    }
}
@keyframes wave {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

/* Animation classes */
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
