<template>
    <div class="inline-flex items-center" :class="$attrs.class">
        <input
            v-bind="{ ...$attrs, class: null, type: null }"
            :id="id"
            :checked="checked"
            type="checkbox"
            :value="modelValue"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
        />
        <label
            :for="id"
            v-text="label"
            class="ml-2"
        />
    </div>
</template>
<script>
import { v4 as uuid } from 'uuid';

export default {
    inheritAttrs: false,
    emits: ['update:modelValue'],
    props: {
        id: {
            type: String,
            default() {
                return `checkbox-input-${uuid()}`
            },
        },
        checked: {
            type: Boolean,
            default: false
        },
        labels: {
            type: Object,
            default() {
                return {
                    1: 'On',
                    0: 'Off',
                }
            },
        },
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
    computed: {
        label() {
            return this.labels[Number(this.checked)];
        }
    }
}
</script>
