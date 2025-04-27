<template>
    <div class="w-full h-[3px] relative overflow-hidden bg-gray-300">
        <div class="absolute h-[3px] w-2/5 animate-loading-line bg-vdt-primary-500"></div>
    </div>
</template>

<style scoped>
@keyframes loading-line {
    0% {
        left: -40%;
    }

    50% {
        left: 20%;
        width: 80%;
    }

    100% {
        left: 100%;
        width: 100%;
    }
}

.animate-loading-line {
    animation: loading-line 1s linear infinite;
}
</style>
