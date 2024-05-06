<template>
    <Modal :title="title">
        <div class="max-w-xl w-full overflow-hidden">
            <form @submit.prevent="save">
                <div class="grid grid-cols-1 gap-4">
                    <TextInput
                        label="Заголовок"
                        v-model="form.title"
                        required
                    />
                    <TextInput
                        label="email"
                        v-model="form.url"
                        type="text"
                    />
                    <img v-if="form.image" :src="form.image" width="100" height="100" />
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
                this.form.image = reader.result;
            };
            reader.readAsDataURL(files[0]);
        }
    },
    computed: {
        title() {
            return (this.form.id) ? 'Змінити банер' : 'Додати банер';
        }
    }
}
</script>

<style scoped>

</style>
