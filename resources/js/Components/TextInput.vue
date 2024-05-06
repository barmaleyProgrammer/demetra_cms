<template>
    <div :class="$attrs.class">
        <label v-if="label" class="text-sm" :class="{ 'required': $attrs.required }" :for="id">{{ label }}:</label>
        <input
            :id="id"
            ref="input"
            v-bind="{ ...$attrs, class: null }"
            class="text-sm outline-none rounded border border-gray-300 focus:border-gray-500 w-full p-2 disabled:bg-gray-300"
            :class="readonly ? 'text-slate-500 bg-gray-50 border border-gray-300 ' : ''"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <div v-if="error" class="text-xs mt-0.5 text-red-600">{{ error }}</div>
    </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
    inheritAttrs: false,
    name: 'TextInput',
    emits: ['update:modelValue'],
    props: {
        id: {
            type: String,
            default() {
                return `text-input-${uuid()}`
            },
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        error: {
            type: String,
            default: '',
        },
        label: String,
        modelValue: String,
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        select() {
            this.$refs.input.select();
        },
        setSelectionRange(start, end) {
            this.$refs.input.setSelectionRange(start, end);
        },
    },
}
</script>

<style scoped>
label.required:after {
    color: #e32;
    content: '*';
    display: inline;
}
</style>
