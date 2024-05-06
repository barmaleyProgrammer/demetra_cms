<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 rounded-lg">
                    <h1 class="text-2xl font-bold">
                        Додати баннер
                    </h1>
                  <form class="mt-8 space-y-6 from" @submit.prevent="send" action="/topBanner/create" method="post" encType="multipart/form-data">
                    <div class="mb-6">
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
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="logo_img">Логотип</label>
                    <input class="block w-full text-sm border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                           id="logo_img"
                           autoComplete="off"
                           required
                           type="file"
                           accept="image/*"
                           @change="onFileChange"
                    />
                    <div class="mb-6">
                      <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Посилання</label>
                      <input class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                             autoComplete="off"
                             minLength="2"
                             id="link"
                             placeholder="Посилання"
                             type="url"
                             v-model.trim="form.url"
                      />
                    </div>
                    <input class="w-72 px-5 py-3 text-center bg-yellow-300 rounded-lg" name="submit" type="submit" value="Зберегти"/>
                  </form>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import { topBannerCreate } from '@/api.js';
export default {
    name: 'CreateTopBanner',
    components: {
        Layout,
        Breadcrumbs
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '/top_banners',
                    label: 'Банери',
                },
                {
                    to: '',
                    label: 'Create top_banner',
                },
            ],
            form: {
                title: '',
                url: '',
                image: '',
            },
        };
    },
    methods: {
        send() {
            topBannerCreate(this.form).then(() => {
                this.$router.push('/topbanners');
            });
        },
        onFileChange(e) {
            const files = e.target.files || e.dataTransfer.files;
            const reader = new FileReader();
            reader.onloadend = () => {
                this.form.image = reader.result;
            };
            reader.readAsDataURL(files[0]);
        }
    }
}
</script>
