<template>
    <Layout>
        <div class="flex justify-between items-center">
            <Breadcrumbs :items="breadcrumbs"/>
            <button @click="addAdvantage" type="button" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 sm:w-auto">
                <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                    fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Додати "наша перевага"
            </button>
        </div>
        <Grid :columns="columns" :rows="advantages">
            <template v-slot:id="{ index }">
                {{ index + 1 }}
            </template>
            <template v-slot:action="{ row }">
                <ButtonEdit
                    label="Змінити 'наша перевага'"
                    @click="currentAdvantage = row"
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
    <AdvantageForm v-if="currentAdvantage" v-model="currentAdvantage" @close="currentAdvantage = ''" @save="save" />
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Grid from "@/Components/Grid.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import ButtonDelete from "@/Components/ButtonDelete.vue";
import ButtonRestore from "@/Components/ButtonRestore.vue";
import ButtonEdit from "@/Components/ButtonEdit.vue";
import moment from 'moment';
import {
    advantagesList,
    newoneDelete,
    setActiveAdvantage,
    advantageCreate,
    advantageEdit,
    advantageDelete
} from "@/api.js";
import AdvantageForm from "@/Pages/Advantages/AdvantageForm.vue";
export default {
    name: 'Advantages',
    components: {
        AdvantageForm,
        Layout,
        Breadcrumbs,
        Grid,
        ButtonEdit,
        ButtonRestore,
        ButtonDelete,
    },
    data() {
        return {
            currentAdvantage: '',
            breadcrumbs: [
                {
                    to: '',
                    label: 'Наші переваги',
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
                    name: 'icon',
                    title: 'іконка',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return `<img class="h-20 w-20" src="${row.icon}" alt="new" />`;
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
            advantages: [],
        }
    },
    methods: {
        getAdvantages() {
            advantagesList().then((res) => {
                this.advantages = res;
            });
        },
        save(payload) {
            if (payload.id) {
                advantageEdit(payload).then(() => {
                    this.getAdvantages();
                    this.currentAdvantage = '';
                });
            } else {
                advantageCreate(payload).then(() => {
                    this.getAdvantages();
                    this.currentAdvantage = '';
                });
            }
        },
        destroy(id) {
            if (window.confirm("Ви впевнені, що хочете видалити цю позицію?")) {
                advantageDelete(id).then(() => {
                    this.getAdvantages();
                });
            }
        },
        change($event) {
            const id = $event.target.value;
            const is_active = $event.target.checked;
            setActiveAdvantage({ id, is_active }).then(() => {
                this.getAdvantages();
            });
        },
        restore(id) {
            console.log('restore', id);
        },
        addAdvantage() {
            this.currentAdvantage = {
                title: '',
                icon: '',
                body: '',
            };
        },

    },
    mounted() {
        this.getAdvantages();
    }
}
</script>
