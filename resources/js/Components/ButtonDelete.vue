<template>
    <button class="inline-flex items-center px-3 py-2 text-sm text-white rounded-lg bg-red-600 hover:bg-red-800"
        :title="label"
        type="button"
        v-bind="{ ...$attrs }"
    >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
    </button>
</template>

<script>
export default {
    name: 'ButtonDelete',
    props: {
        label: String
    }
}
</script>
