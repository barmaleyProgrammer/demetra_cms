<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full p-6 space-y-8 rounded-lg">
                    <h1 class="text-2xl font-bold">
                        Додати статтю
                    </h1>
                    <form class="mt-3 space-y-6" action="/news/create">
                        <div class="mb-6 lg:max-w-xl">
                            <label for="title" class="block mb-2 text-sm font-medium">Ключ посилання<span class="text-red-600"> *</span></label>
                            <textarea autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  id="title" maxlength="256" minlength="2" name="title" placeholder="Заголовок" required="">Ключ посилання</textarea>
                        </div>
                        <div class="mb-6">
                            <label for="link" class="block mb-2 text-sm font-medium">Посилання</label>
                            <a href="" id="articleLink" class="font-medium text-blue-600 hover:underline"></a>
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <label for="announcement" class="block mb-2 text-sm font-medium text-gray-900">Тег Н1<span class="text-red-600"> *</span></label>
                            <textarea autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="announcement" maxlength="256" minlength="2" name="announcement" placeholder="Анонс">заголовок</textarea>
                        </div>
                        <div class="w-1/2 text-gray-900 text-sm bg-gray-100">
                            <textarea autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" id="announcement" maxlength="256" minlength="2" name="announcement" placeholder="Редактор текста"></textarea>
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <label for="seo_title" class="block mb-2 text-sm font-medium text-gray-900">SEO: Заголовок</label>
                            <input autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " id="seo_title" maxlength="256" minlength="2" name="seo_title" placeholder="SEO Заголовок" type="text" value="">
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900">SEO: Опис<span class="text-red-600"> *</span></label>
                            <input autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" id="description" maxlength="256" minlength="2" name="description" placeholder="SEO Опис" required="" type="text" value="">
                        </div>
                        <div class="mb-6 lg:max-w-xl">
                            <label for="key_words" class="block mb-2 text-sm font-medium text-gray-900">SEO: Ключові слова<span class="text-red-600"> *</span></label>
                            <input autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5" id="key_words" maxlength="256" minlength="2" name="key_words" placeholder="SEO Ключові слова" required="" type="text" value="">
                        </div>
                    </form></div>
                <input class="w-full px-5 py-3 text-base font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800" id="addNewsSubmit" name="submit" type="submit" value="Зберегти">


            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
export default {
    name: 'CreateArticle',
    components: {
        Layout,
        Breadcrumbs
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '/article',
                    label: 'статті',
                },
                {
                    to: '',
                    label: 'нова стаття',
                },
            ],
        };
    },
}
</script>
