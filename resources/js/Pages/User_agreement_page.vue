<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="ml-4 space-y-8 bg-gray-50">
            <h1 class="text-2xl font-bold">
                Редагування сторінки Угода користувача
            </h1>
            <Loader v-if="loading" class="absolute left-1/2 top-1/2" />
            <form class="mt-8 space-y-6" @submit.prevent="send" action="/agreement" method="post" encType="multipart/form-data">
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
                <div class="mb-6 lg:max-w-xl">
                    <label for="title" class="block mb-2 text-sm">Опис</label>
                    <textarea rows="5" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                              autoComplete="off"
                              id="title"
                              minLength="2"
                              v-model.trim="form.description"
                    />
                </div>
                <div class="mb-6">
                    <label for="title" class="block mb-2 text-sm">Текст</label>
                        <Editor
                            :apiKey="tinymceConfig.apiKey"
                            :init="tinymceConfig.tinyMCEOptions"
                            :tagName="tinymceConfig.tagName"
                            v-model.trim="form.body"
                        />
                </div>
                <!-- input class="w-72 px-5 py-3 text-center bg-yellow-300 rounded-lg" name="submit" type="submit" value="Зберегти"/ -->
                <LoadingButton label="Зберегти" :loading="loading" />
            </form>
        </div>
    </Layout>
</template>
<script>
import Layout from "@/Components/Layout.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import {agreementInfo, agreementUpdate} from "@/api.js";
import Editor from "@tinymce/tinymce-vue";
import tinymceConfig from '@/tinyMceConfig.js';
import Loader from '@/Components/Loader.vue';
import LoadingButton from '@/Components/LoadingButton.vue';

export default {
    name: 'User_agreement_page',
    components: {
        Editor,
        Breadcrumbs,
        Layout,
        Loader,
        LoadingButton
    },
    data() {
        return {
            tinymceConfig,
            breadcrumbs: [
                {
                    to: '',
                    label: 'Угода користувача',
                },
            ],
            loading: false,
            form: {
                title: '',
                description: '',
                body: '',
            }
        };

    },
    methods: {
        send() {
            this.loading = true;
            agreementUpdate(this.form).finally(() => this.loading = false);
        },
    },
    mounted() {
        agreementInfo().then((res) => this.form = res);
    }
}
</script>
