<template>
    <Layout>
        <div class="flex justify-between items-center">
            <Breadcrumbs :items="breadcrumbs"/>
            <RouterLink to="/article/createArticle" type="button" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Додати статтю
            </RouterLink>
        </div>
        <Grid :columns="columns" :rows="news">
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
export default {
    name: 'Article',
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
            news: [

            ],
            breadcrumbs: [
                {
                    to: '',
                    label: 'Статті',
                },
            ],
            columns: [
                {
                    name: 'id',
                    title: '#',
                    class: [
                        'w-1',
                        'py-4'
                    ]
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
                },
                {
                    name: 'deleted_at',
                    title: 'АКТИВНА',
                    class: [
                        'whitespace-nowrap',
                        'w-1',
                        'py-4',
                        'text-center'
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
        }
    },
    methods: {

    },
}
</script>
