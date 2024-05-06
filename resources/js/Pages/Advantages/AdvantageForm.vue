<template xmlns="http://www.w3.org/1999/html">
    <Modal :title="title">
        <div class="max-w-xl w-96 overflow-hidden">
            <form @submit.prevent="save">
                <div class="grid grid-cols-1 gap-4">
                    <TextInput
                        label="Заголовок"
                        v-model="form.title"
                        required
                    />
                    <label for="title" class="block mb-2 text-sm">Текст</label>
                    <textarea class="border border-gray-300 rounded text-xs"
                        rows="5"
                        v-model="form.body"
                        type="text"
                    />
                    <img v-if="form.icon" :src="form.icon" width="100" height="100" />
                    <input class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                           autoComplete="off"
                           type="file"
                           accept="image/*"
                           @change="onFileChange"
                    />
                </div>
                <div class="mt-5 text-right">
                    <button type="submit" class="px-3 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-800">Зберегти</button>
                    <button type="button" @click="$emit('close')" class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 border-gray-300 border rounded-lg ml-2">Закрити</button>
                </div>
            </form>
        </div>
    </Modal>
</template>

<script>
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
export default {
    name: 'TopBannerForm',
    components: {
        Modal,
        TextInput
    },
    props: {
        modelValue: Object
    },
    data() {
        return {
            form: { ...this.modelValue }
        };
    },
    methods: {
        save() {
            this.$emit('save', this.form);
        },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            const reader = new FileReader();
            reader.onloadend = () => {
                this.form.icon = reader.result;
            };
            reader.readAsDataURL(files[0]);
        }
    },
    computed: {
        title() {
            return (this.form.id) ? 'Змінити' : 'Додати';
        }
    },
}
</script>

<style scoped>

</style>
