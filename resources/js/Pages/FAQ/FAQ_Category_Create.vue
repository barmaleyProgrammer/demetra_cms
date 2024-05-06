<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
      <div class="w-full h-full px-4 mx-auto py-6">
          <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8rounded-lg">
            <h1 class="text-2xl font-bold">
              Додати категорію
            </h1>
            <form class="mt-8 space-y-6" @submit.prevent="save">
              <div class="mb-6">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Заголовок</label>
                <input
                    autocomplete="off"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="text"
                    maxlength="256"
                    minlength="2"
                    name="text"
                    placeholder="Заголовок"
                    type="text"
                    v-model.trim="form.name" />
              </div>
              <input class="w-full px-5 py-3 text-base font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 sm:w-auto" id="submit" name="submit" type="submit" value="Зберегти">
            </form>
          </div>
      </div>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import { faqCategoryCreate } from "@/api.js";

export default {
    name: 'Category',
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
                    label: 'Нова категорія',
                },
            ],
            form: {
                name: ''
            }
        };
    },
    methods: {
        save() {
            faqCategoryCreate(this.form).then(() => {
                this.$router.push('/faq');
            });
        }
    }

}
</script>
