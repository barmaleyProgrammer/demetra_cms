<template>
    <Layout>
        <div class="flex justify-between items-center">
            <Breadcrumbs :items="breadcrumbs"/>
            <RouterLink to="/news/createNew" type="button" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 sm:w-auto">
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Додати новину
            </RouterLink>
        </div>
        <Grid :columns="columns" :rows="news">
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
            <template v-slot:checkbox="{ row }">
                <input @change="change"
                       :checked="row.is_active"
                       type="checkbox"
                       :value="row.id"
                       class="text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2">
            </template>

        </Grid>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Grid from "@/Components/Grid.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import ButtonDelete from "@/Components/ButtonDelete.vue";
import ButtonRestore from "@/Components/ButtonRestore.vue";
import ButtonEdit from "@/Components/ButtonEdit.vue";
import moment from 'moment';
import {newsList, newoneDelete, setActiveNews} from "@/api.js";
export default {
    name: 'News',
    components: {
        Layout,
        Breadcrumbs,
        Grid,
        ButtonEdit,
        ButtonRestore,
        ButtonDelete,
    },
    data() {
        return {
            news: [],
            breadcrumbs: [
                {
                    to: '',
                    label: 'Новини',
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
                    name: 'name',
                    title: 'ЗОБРАЖЕННЯ',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return `<img class="h-20 w-20" src="${row.banner}" alt="new" />`;
                    }
                },
                {
                    name: 'title',
                    title: 'ЗАГОЛОВОК',
                    class: [
                        'w-64',
                        'py-4',
                        'max-w-sm',
                        'truncate'
                    ],
                    render: (row) => {
                        return `${row.title}`;
                    }
                },
                {
                    name: 'anonce',
                    title: 'АНОНС',
                    class: [
                        'w-32',
                        'py-4'
                    ]
                },
                {
                    name: 'checkbox',
                    title: '',
                    type: 'slot',
                    class: [
                        'w-1',
                        'py-4',
                        'px-2'
                    ],
                },
                {
                    name: 'is_active',
                    title: 'АКТИВНА',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return (!row.is_active) ? 'Деактивована' : 'Активна';
                    }
                },
                {
                    name: 'publish_date',
                    title: 'ДАТА ПУБЛІКАЦІЇ',
                    class: [
                        'w-32',
                        'py-4'
                    ],
                    render: (row) => {
                        return moment(row.publish_date).format('DD.MM.YYYY');
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
        }
    },
    methods: {
        getNews() {
            newsList().then((res) => {
                this.news = res;
            });
        },
        destroy(id) {
            newoneDelete(id).then(() => {
                this.getNews();
            });
        },
        change($event) {
            const id = $event.target.value;
            const is_active = $event.target.checked;
            setActiveNews({ id, is_active }).then(() => {
                this.getNews();
            });
        },
        restore(id) {
            console.log('restore', id);
        },
        edit(id){
            this.$router.push(`/news/editNew/${id}`);
        },

    },
    mounted() {
        this.getNews();
    }
}
</script>
