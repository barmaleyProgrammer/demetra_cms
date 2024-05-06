<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8rounded-lg">
                <h1 class="text-2xl font-bold">
                    Додати питання
                </h1>
                <form class="mt-8 space-y-6" @submit.prevent="save">
                    <label for="categories" class="block mb-2 text-sm font-medium text-gray-900">Виберіть до якої категорії відноситься питання</label>
                    <select
                        id="categories"
                        name="category_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        v-model="form.category_id"
                    >
                        <option v-for="(item, key) in categories" :key="key" :value="item.id">{{ item.name }}</option>
                    </select>
                    <div class="mb-6">
                        <label for="question" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input autocomplete="off"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               id="question" maxlength="256" minlength="2" name="question" placeholder="Питання"
                               type="text" v-model.trim="form.title">
                    </div>
                    <div class="text-gray-900 text-sm">
                        <label for="answer" class="block mb-2 text-sm font-medium text-gray-900">Body</label>
                        <textarea autocomplete="off"
                                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                  cols="33" id="text" name="text" placeholder="Текст" rows="8" v-model.trim="form.description" />
                    </div>
                    <input
                        class="w-full px-5 py-3 text-base font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                        id="submit" name="submit" type="submit" value="Зберегти">
                </form>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import { faqCreate, faqList } from "@/api.js";

export default {
    name: 'Question',
    components: {
        Layout,
        Breadcrumbs
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '/faq',
                    label: 'Сторінка \'Часті питання\'',
                },
                {
                    to: '',
                    label: 'Нове питання',
                },
            ],
            categories: [],
            form: {
                category_id: '',
                title: '',
                description: '',
            }
        };
    },
    methods: {
        getAll() {
            faqList().then((res) => {
                this.categories = res.categories;
            });
        },
        save() {
            faqCreate(this.form).then(() => {
                this.$router.push('/faq');
            });
        }
    },
    mounted() {
        this.getAll();
    }
}
</script>
