<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full p-6 space-y-8 rounded-lg">
                    <h1 class="text-2xl font-bold">
                        Змінити новину
                    </h1>
                    <form class="mt-8 space-y-6 from" @submit.prevent="send" action="/news/edit" method="post" encType="multipart/form-data">
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="Заголовок"
                                :required="true"
                                maxlength="256"
                                minlength="2"
                                v-model.trim="form.title"
                            />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <label for="announcement" class="block mb-2 text-sm font-medium text-gray-900">Анонс</label>
                            <textarea class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                      autoComplete="off"
                                      id="title"
                                      maxLength="256"
                                      minLength="2"
                                      placeholder="(для розроб)не обовʼязкове поле"
                                      v-model.trim="form.announcement"
                            />
                        </div>
                        <div class="mb-6">
                            <Editor
                                :apiKey="tinymceConfig.apiKey"
                                :init="tinymceConfig.tinyMCEOptions"
                                :tagName="tinymceConfig.tagName"
                                v-model.trim="form.body"
                            />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <label class="block mb-2 text-sm font-medium text-gray-900" for="banner">Банер<span class="text-red-600"> *</span></label>
                            <img :src="form.banner" width="100" height="100" />
                            <input class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                   id="banner"
                                   autoComplete="off"
                                   type="file"
                                   accept="image/*"
                                   @change="onFileChange"
                            />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="Вибрати дату публікації"
                                :required="true"
                                type="date"
                                v-model="form.publish_date"
                                required
                            />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="SEO: Заголовок"
                                placeholder="якщо адмін залишить пустим, то беремо тіло з заголовку новини"
                                maxlength="256"
                                minlength="2"
                                v-model.trim="form.seo_title"
                            />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="SEO: Опис"
                                maxlength="256"
                                :required="true"
                                minlength="2"
                                v-model.trim="form.seo_description"
                            />
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <TextInput
                                label="SEO Ключові слова"
                                :required="true"
                                maxlength="256"
                                minlength="2"
                                v-model.trim="form.key_words"
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
import Editor from '@tinymce/tinymce-vue';
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import TextInput from '@/Components/TextInput.vue';
import tinymceConfig from '@/tinyMceConfig.js';
import { newoneInfo, newoneEdit } from "@/api.js";

export default {
    name: 'CreateNew',
    components: {
        Layout,
        Breadcrumbs,
        TextInput,
        Editor
    },
    data() {
        return {
            tinymceConfig,
            breadcrumbs: [
                {
                    to: '/news',
                    label: 'новини',
                },
                {
                    to: '',
                    label: 'змінити новину',
                },
            ],
            form: {
                title: '',
                announcement: '',
                body: '',
                banner: '',
                publish_date: '',
                seo_title: '',
                seo_description: '',
                key_words: '',
                position: 0,
            }
        };
    },
    methods: {
        send(id) {
            newoneEdit(this.form, id).then(() => {
                this.$router.push('/news');
            });
        },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            const reader = new FileReader();
            reader.onloadend = () => {
                if (e.target.id === 'banner') {
                    this.form.banner = reader.result;
                }
            };
            reader.readAsDataURL(files[0]);
        }
    },
    mounted() {
        newoneInfo(this.$route.params.id).then((res) => {
            this.form = res;
        });
    }
}
</script>
