<template>
    <div class="fixed z-20 inset-0 overflow-y-auto ease-out duration-400">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                <div class="my-4 mx-6 flex flex-row justify-between">
                    <h1 class="text-xl font-bold">{{ title }}</h1>
                    <button type="button" @click="$emit('close')" title="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </button>
                </div>
                <div class="my-4 mx-6">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    emits: ['close'],
    props: {
        title: String
    },
    mounted() {
        document.body.style.overflow = 'hidden';
    },
    beforeUnmount() {
        document.body.style.overflow = 'auto';
    },
}
</script>
