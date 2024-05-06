<template>
    <button :title="label" :disabled="loading" class="inline-flex items-center px-3 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-800">
        <div v-show="loading" class="btn-spinner mr-2"></div>
        {{ label }}
    </button>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        label: String
    },
}
</script>

<style scoped>
.btn-spinner {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 0.2em solid white;
    border-right: 0.2em solid white;
    border-bottom: 0.2em solid white;
    border-left: 0.2em solid transparent;
    transform: translateZ(0);
    -webkit-animation: spinning 1s infinite linear;
    animation: spinning 1s infinite linear;
}
.btn-spinner, .btn-spinner:after {
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
}
</style>
