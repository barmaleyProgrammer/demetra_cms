<template>
    <button class="inline-flex items-center px-2 py-1 pb-2 rounded-lg bg-green-600 hover:bg-green-800"
        :title="label"
        type="button"
        v-bind="{ ...$attrs }"
    >
      <svg fill="white" class="w-6 h-5" viewBox="0 0 24 20"><path d="M14,14H16L12,10L8,14H10V18H14V14M6,7H18V19C18,19.5 17.8,20 17.39,20.39C17,20.8 16.5,21 16,21H8C7.5,21 7,20.8 6.61,20.39C6.2,20 6,19.5 6,19V7M19,4V6H5V4H8.5L9.5,3H14.5L15.5,4H19C" /></svg>
    </button>
</template>

<script>
export default {
    name: 'ButtonRestore',
    props: {
        label: String
    }
}
</script>
