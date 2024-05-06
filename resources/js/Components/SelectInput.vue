<template>
    <div :class="$attrs.class">
        <label v-if="label" class="text-sm text-gray-500 font-light" :for="id">{{ label }}:</label>
        <select
            :id="id"
            ref="input"
            v-model="selected"
            v-bind="{ ...$attrs }"
            class="text-sm bg-white text-gray-500 outline-none rounded border border-gray-300 focus:border-gray-500 w-full p-2 disabled:bg-gray-300"
            :class="{ error: error }">
            <option v-for="(item, key) in options" :key="key" :value="item.id">{{ item.label }}</option>
        </select>
        <div v-if="error" class="form-error">{{ error }}</div>
    </div>
</template>

<script>
import {v4 as uuid} from 'uuid'

export default {
    inheritAttrs: false,
    name: 'SelectInput',
    props: {
        id: {
            type: String,
            default: `select-input-${uuid()}`
        },
        error: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
        },
        modelValue: [String, Number, Boolean],
    },
    emits: ['update:modelValue'],
    data() {
        return {
            selected: this.modelValue,
        }
    },
    watch: {
        selected(value) {
            this.$emit('update:modelValue', value);
        },
        modelValue(value) {
            this.selected = value;
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        select() {
            this.$refs.input.select();
        },
    },
}
</script>
