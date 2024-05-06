<template>
    <Layout>
        <div class="flex justify-between items-center">
            <Breadcrumbs :items="breadcrumbs" />
            <RouterLink to="/banners/createBanner" type="button" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 sm:w-auto">
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Додати банер
            </RouterLink>
        </div>
        <Grid :columns="columns" :rows="banners">
            <template v-slot:id="{ index }">
                {{ index + 1 }}
            </template>
            <template v-slot:action="{ row }">
                <ButtonEdit
                    label="Змінити дані"
                    @click="edit(row.id)"
                    class="mr-2"
                />
                <ButtonDelete v-if="!row.deleted_at"
                    label="Видалити"
                    @click="destroy(row.id)"
                />
                <ButtonRestore v-if="row.deleted_at"
                    label="Restore"
                    @click="restore(row.id)"
                />
            </template>
        </Grid>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import Grid from '@/Components/Grid.vue';
import ButtonEdit from '@/Components/ButtonEdit.vue';
import ButtonDelete from '@/Components/ButtonDelete.vue';
import ButtonRestore from '@/Components/ButtonRestore.vue';
import { bannerList, bannerDelete, bannerRestore } from '@/api.js';
import index from "vuex";

export default {
    name: 'Banners',
    computed: {
        index() {
            return index
        }
    },
    components: {
        Layout,
        Breadcrumbs,
        Grid,
        ButtonEdit,
        ButtonDelete,
        ButtonRestore
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '',
                    label: 'Банери',
                },
            ],
            columns: [
                {
                    name: 'id',
                    title: '#',
                    type: 'slot',
                    class: [
                        'w-1',
                        'py-4'
                    ]
                },
                {
                    name: 'image',
                    title: 'Логотип',
                    class: [
                        'w-20',
                        'h-20',
                        'py-4'
                    ],
                    render: (row) => {
                       return `<img class="h-20 w-20" src="${row.image}" alt="banner's logo" />`;
                    }
                },
                {
                    name: 'title',
                    title: 'Заголовок',
                    class: [
                        'w-64',
                        'py-4'
                    ]
                },
                {
                    name: 'url',
                    title: 'Посилання',
                    class: [
                        'whitespace-nowrap',
                        'w-1',
                        'py-4'
                    ],
                    render: (row) => {
                        return `<a href="${row.url}" target="_blank">${row.url}</a>`;
                    }
                },
                {
                    name: 'deleted_at',
                    title: 'Активний',
                    type: 'slot',
                    class: [
                        'whitespace-nowrap',
                        'w-1',
                        'py-4'
                    ],
                    render: (row) => {
                        return (row.deleted_at) ? 'Деактивований' : 'Активний';
                    }
                },
                {
                    name: 'action',
                    title: 'Дії',
                    type: 'slot',
                    class: [
                        'whitespace-nowrap',
                        'w-1',
                        'py-4'
                    ],
                }
            ],
            banners: []
        };
    },
    methods: {
        getBanners() {
            bannerList().then((res) => {
                this.banners = res;
            });
        },
        destroy(id) {
            bannerDelete(id).then(() => {
                this.getBanners();
            });
        },
        restore(id) {
            bannerRestore(id).then(() => {
                this.getBanners();
            });
        },
        edit(id) {
            this.$router.push(`/banners/editBanner/${id}`);
        }
    },
    mounted() {
        this.getBanners();
    }
}
</script>
