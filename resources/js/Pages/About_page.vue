<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full  p-6 space-y-8 sm:p-8 rounded-lg">
                    <h1 class="text-2xl font-bold">
                        Редагування сторінки про нас
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
                            <Editor
                                :apiKey="tinymceConfig.apiKey"
                                :init="tinymceConfig.tinyMCEOptions"
                                :tagName="tinymceConfig.tagName"
                                v-model.trim="form.body"
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
import tinymceConfig from '@/tinyMceConfig.js';
import Loader from '@/Components/Loader.vue';
import LoadingButton from '@/Components/LoadingButton.vue';
import {aboutInfo, aboutUpdate} from "@/api.js";
import Editor from "@tinymce/tinymce-vue";

export default {
    name: 'About_page',
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
                    label: 'Сторінка Про нас',
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
            aboutUpdate(this.form).finally(() => this.loading = false);
        },
    },
    mounted() {
        aboutInfo().then((res) => this.form = res);
    }
}
</script>
