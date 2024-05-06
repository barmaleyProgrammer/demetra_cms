<template>
    <Modal :title="title">
        <div class="max-w-xl w-full overflow-hidden">
            <form @submit.prevent="save">
                <div class="grid grid-cols-2 gap-4">
                    <TextInput
                        label="Прізвище"
                        v-model="user.last_name"
                        required
                    />
                    <TextInput
                        label="Імʼя"
                        v-model="user.first_name"
                        required
                    />
                    <TextInput
                        label="Ел. пошта"
                        type="email"
                        v-model="user.email"
                        required
                    />
                    <SelectInput
                        label="Роль"
                        v-model="user.role"
                        :options="[
                            { id: 'admin', label: 'Admin' },
                            { id: 'editor', label: 'Editor' },
                            { id: 'user', label: 'User' }
                        ]"
                    />
                    <TextInput
                        label="Новий пароль"
                        type="password"
                        v-model="user.password"
                        :required="!user.id"
                    />
                    <TextInput
                        label="Підтвердження нового паролю"
                        type="password"
                        v-model="user.password_confirm"
                        :required="!user.id"
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
import SelectInput from '@/Components/SelectInput.vue';
import LoadingButton from '@/Components/LoadingButton.vue';

export default {
    name: 'UserForm',
    components: {
        Modal,
        TextInput,
        SelectInput,
        LoadingButton
    },
    props: {
        modelValue: Object
    },
    data() {
        return {
            user: {...this.modelValue}
        }
    },
    methods: {
        save() {
            this.$emit('save', this.user);
        }
    },
    computed: {
        title() {
            return (this.user.id) ? 'Зміна даних користувача' : 'Додати нового користувача';
        }
    }
}
</script>
