<template>
    <div class="vdt-loading-line">
        <div class="vdt-loading-line__bar"></div>
    </div>
</template>

<style scoped>
.vdt-loading-line {
    width: 100%;
    height: 3px;
    position: relative;
    overflow: hidden;
    background-color: var(--color-vdt-surface-secondary);
}

.vdt-loading-line__bar {
    position: absolute;
    height: 3px;
    width: 40%;
    background-color: var(--color-vdt-primary);
    animation: loading-line 1s linear infinite;
}

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
</style>
