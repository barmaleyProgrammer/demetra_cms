<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full  p-6 space-y-8 sm:p-8 rounded-lg">
                    <h1 class="text-2xl font-bold">
                        Редагування сторінки Нейронна мережа
                    </h1>
                    <Loader v-if="loading" class="absolute left-1/2 top-1/2" />
                    <form class="mt-8 space-y-6" @submit.prevent="send" action="/about" method="post" encType="multipart/form-data">
                        <div class="mb-6 lg:max-w-xl">
                            <label for="title" class="block mb-2 text-sm">Заголовок</label>
                            <input class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                   autoComplete="off"
                                   id="title"
                                   maxLength="256"
                                   minLength="2"
                                   placeholder="Заголовок"
                                   required
                                   v-model.trim="form.title"
                            />
                        </div>
                        <div class="mb-6">
                            <label for="title" class="block mb-2 text-sm">Текст</label>
                            <textarea class="w-1/2 border border-gray-300 rounded text-xs"
                                      rows="8"
                                      v-model="form.body"
                                      type="text"
                            />
                        </div>
                        <LoadingButton label="Зберегти" :loading="loading" />
                    </form>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/Components/Layout.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import Loader from '@/Components/Loader.vue';
import LoadingButton from '@/Components/LoadingButton.vue';
import {neuronInfo, neuronUpdate} from "@/api.js";

export default {
    name: 'Neuron',
    components: {
        Breadcrumbs,
        Layout,
        Loader,
        LoadingButton
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '',
                    label: 'Сторінка Нейронна мережа',
                },
            ],
            loading: false,
            form: {
                title: '',
                body: '',
            },
        };
    },
    methods: {
        send() {
            this.loading = true;
            neuronUpdate(this.form).finally(() => this.loading = false);
        },
    },
    mounted() {
        neuronInfo().then((res) => this.form = res);
    }
}
</script>
