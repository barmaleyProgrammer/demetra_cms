<template>
    <Layout v-if="$store.state.user.role === 'admin'">
        <div class="flex justify-between items-center">
            <Breadcrumbs :items="breadcrumbs" />
            <button @click="addUser" type="button" class="inline-flex px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-800">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Додати Користувача
            </button>
        </div>
        <Grid :columns="columns" :rows="users">
            <template v-slot:id="{ index }">
                {{ index + 1 }}
            </template>
            <template v-slot:action="{ row }">
                <ButtonEdit
                    label="Змінити дані"
                    @click="currentUser = row"
                    class="mr-2"
                />
                <template v-if="row.id !== $store.state.user.id && $store.state.user.role === 'admin'">
                    <ButtonDelete v-if="!row.deleted_at"
                        label="Видалити"
                        @click="destroy(row.id)"
                    />
                    <ButtonRestore v-if="row.deleted_at"
                        label="Restore"
                        @click="restore(row.id)"
                    />
                </template>
            </template>
        </Grid>
    </Layout>
    <UserForm v-if="currentUser" v-model="currentUser" @close="currentUser = ''" @save="saveUser" />
</template>

<script>
import moment from 'moment';
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import Grid from '@/Components/Grid.vue';
import ButtonEdit from '@/Components/ButtonEdit.vue';
import ButtonDelete from '@/Components/ButtonDelete.vue';
import ButtonRestore from '@/Components/ButtonRestore.vue';
import UserForm from '@/Components/UserForm.vue';
import { userList, userDelete, userRestore, userUpdate, userCreate } from '@/api.js';

export default {
    name: 'Users',
    components: {
        Layout,
        Breadcrumbs,
        Grid,
        ButtonEdit,
        ButtonDelete,
        ButtonRestore,
        UserForm
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '',
                    label: 'Користувачі',
                },
            ],
            currentUser: '',
            columns: [
                {
                    name: 'id',
                    title: '#',
                    type: 'slot',
                    class: [
                        'w-1',
                        'py-4'
                    ],
                },
                {
                    name: 'name',
                    title: 'Імʼя',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return `${row.first_name} ${row.last_name}`;
                    }
                },
                {
                    name: 'role',
                    title: 'Опис',
                    class: [
                        'w-64',
                        'py-4'
                    ]
                },
                {
                    name: 'deleted_at',
                    title: 'Активний',
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
                    name: 'updated_at',
                    title: 'Остання активність',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return moment(row.updated_at).format('YYYY-MM-DD HH:mm:ss');
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
            users: []
        };
    },
    methods: {
        getUsers() {
            userList().then((res) => {
                this.users = res;
            });
        },
        destroy(id) {
            userDelete(id).then(() => {
                this.getUsers();
            });
        },
        restore(id) {
            userRestore(id).then(() => {
                this.getUsers();
            });
        },
        addUser() {
            this.currentUser = {
                id: '',
                email: '',
                first_name: '',
                last_name: '',
                role: ''
            };
        },
        saveUser(payload) {
            if (payload.id) {
                userUpdate(payload).then(() => {
                    this.getUsers();
                    this.currentUser = '';
                });
            } else {
                userCreate(payload).then(() => {
                    this.getUsers();
                    this.currentUser = '';
                });
            }

        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>
