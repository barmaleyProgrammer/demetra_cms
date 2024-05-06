<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full p-6 space-y-8 rounded-lg">
                    <h1 class="text-2xl font-bold">
                        Змінити
                    </h1>
                    <form class="mt-8 space-y-6 from" @submit.prevent="send">
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="Заголовок"
                                :required="true"
                                maxlength="256"
                                minlength="2"
                                v-model.trim="form.title"
                            />
                        </div>
                        <div>
                        <label for="announcement" class="block mb-2 text-sm font-medium text-gray-900">Текст</label>
                        <textarea class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-1/2 p-2.5"
                                  autoComplete="off"
                                  id="title"
                                  maxLength="256"
                                  minLength="2"
                                  placeholder="(для розроб)не обовʼязкове поле"
                                  v-model.trim="form.body"
                        />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="Назва кнопки"
                                :required="true"
                                maxlength="256"
                                minlength="2"
                                v-model.trim="form.label_button"
                            />
                        </div>
                        <input class="w-full px-5 py-3 text-base font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 sm:w-auto" id="addNewsSubmit" name="submit" type="submit" value="Зберегти">
                    </form>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import TextInput from '@/Components/TextInput.vue';
import {indicatorInfo, indicatorEdit, setActiveNews} from "@/api.js";

export default {
    name: 'EditIndicators',
    components: {
        Layout,
        Breadcrumbs,
        TextInput,
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '/indicators',
                    label: 'Блок показників',
                },
                {
                    to: '',
                    label: 'змінити',
                },
            ],
            form: {
                title: '',
                body: '',
                label_button: '',
            }
        };
    },
    methods: {
        getIndicators() {
            indicatorInfo(this.$route.params.id).then((res) => {
                this.form = res;
            });
        },
        send(id) {
            indicatorEdit(this.form, id).then(() => {
                this.$router.push('/indicators');
            });
        },
    },
    change($event) {
        const id = $event.target.value;
        const is_active = $event.target.checked;
        setActiveIndicator({ id, is_active }).then(() => {
            this.getIndicators();
        });
    },
    mounted() {
        this.getIndicators()
    }
}
</script>
