<template>
    <Layout>
        <Breadcrumbs :items="breadcrumbs" />
        <div class="w-full h-full px-4 mx-auto py-6">
            <div>
                <div class="w-full p-6 space-y-8 sm:p-8 rounded-lg bg-gray-100">
                    <h1 class="text-2xl font-bold">
                        Редагування сторінки FAQ
                    </h1>
                    <h1 class="mb-4 text-xl font-bold">Таблиця категорій</h1>
                    <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                        <RouterLink to="/faq_category/create" type="button" class="inline-flex items-center justify-center w-72 px-3 py-2 text-sm font-medium text-center rounded-lg bg-blue-100">
                            <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Додати категорію
                        </RouterLink>
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                        <Grid :columns="categoryColumns" :rows="categoryData">
                            <template v-slot:id="{ index }">
                                {{ index + 1 }}
                            </template>
                            <template v-slot:action="{ row }">
                                <ButtonEdit
                                    label="Змінити дані"
                                    @click="editCategory(row.id)"
                                    class="mr-2"
                                />
                                <ButtonDelete
                                    label="Видалити"
                                    @click="deleteCategory(row.id)"
                                />
                            </template>
                        </Grid>
                    </div>
                    <h1 class="mb-4 text-xl font-bold">Таблиця питань та відповідей</h1>
                    <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                        <RouterLink to="/faq_question/create" type="button" class="inline-flex items-center justify-center w-72 px-3 py-2 text-sm font-medium text-center rounded-lg bg-blue-100">
                            <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Додати питання
                        </RouterLink>
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                        <Grid :columns="answerColumns" :rows="answerData">
                            <template v-slot:id="{ index }">
                                {{ index + 1 }}
                            </template>
                            <template v-slot:action="{ row }">
                                <ButtonEdit
                                    label="Змінити дані"
                                    @click="editFaq(row.id)"
                                    class="mr-2"
                                />
                                <ButtonDelete
                                    label="Видалити"
                                    @click="deleteFaq(row.id)"
                                />
                            </template>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/Components/Layout.vue";
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import ButtonDelete from "@/Components/ButtonDelete.vue";
import ButtonEdit from "@/Components/ButtonEdit.vue";
import Grid from "@/Components/Grid.vue";
import {destroyCategory, faqList, destroyFaq} from "@/api.js";
export default {
    name: 'FAQ',
    components: {
      Grid, ButtonEdit,
      ButtonDelete,
      Breadcrumbs,
      Layout
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '',
                    label: 'Сторінка \'Часті питання\'',
                },
            ],
            categoryColumns: [
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
                    title: 'КАТЕГОРІЯ',
                    class: [
                      'w-64',
                      'py-4'
                    ],
                },
                {
                    name: 'action',
                    title: 'Дії',
                    type: 'slot',
                    class: [
                      'whitespace-nowrap',
                      'w-1',
                      'py-4',
                    ],
                }
            ],
            categoryData: [],
            answerColumns: [
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
                    name: 'category',
                    title: 'КАТЕГОРІЯ',
                    class: [
                      'w-64',
                      'py-4'
                    ],
                    render: (row) => {
                        return this.categoryData.find((item) => item.id === row.category_id).name;
                    }
                },
                {
                    name: 'title',
                    title: 'ПИТАННЯ',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                },
                {
                    name: 'action',
                    title: 'Дії',
                    type: 'slot',
                    class: [
                      'whitespace-nowrap',
                      'w-1',
                      'py-4',
                    ],
                }
              ],
            answerData: []
        };
    },
    methods: {
        getAll() {
            faqList().then((res) => {
                this.categoryData = res.categories;
                this.answerData = res.faqs;
            });
        },
        deleteCategory(id) {
            destroyCategory(id).then(() => {
                this.getAll();
            });
        },
        deleteFaq(id) {
            destroyFaq(id).then(() => {
                this.getAll();
            });
        },
        editCategory(id){
            this.$router.push(`/faq_category/edit/${id}`);
        },
        editFaq(id){
            this.$router.push(`/faq_question/edit/${id}`);
        },
    },
    mounted() {
        this.getAll();
    }
}
</script>
