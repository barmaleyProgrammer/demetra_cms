<template>
    <Layout>
        <div class="flex justify-between items-center">
            <Breadcrumbs :items="breadcrumbs" />
            <button @click="addTopBanner" type="button" class="inline-flex px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-yellow-400 hover:bg-yellow-800">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Додати топ-банер
            </button>
        </div>
        <Grid :columns="columns" :rows="topbanners">
            <template v-slot:id="{ index }">
                {{ index + 1 }}
            </template>
            <template v-slot:position="{ row }">
                <button v-if="row.position < topbanners.length" label="Up" @click="up(row)" class="mr-2">
                    <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" xml:space="preserve">
                        <path id="XMLID_21_" d="M213.107,41.894l-37.5-37.5c-5.857-5.858-15.355-5.858-21.213,0l-37.5,37.5
                            c-4.29,4.29-5.573,10.742-3.252,16.347c2.322,5.605,7.792,9.26,13.858,9.26H150V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15
                            V67.5h22.5c6.067,0,11.537-3.655,13.858-9.26C218.68,52.635,217.397,46.184,213.107,41.894z"/>
                    </svg>
                </button>
                <button v-if="row.position > 1" label="Down" @click="down(row)" class="mr-2">
                    <svg fill="#000000" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" transform="rotate(0)">
                        <path id="XMLID_24_" d="M216.358,271.76c-2.322-5.605-7.792-9.26-13.858-9.26H180V15c0-8.284-6.716-15-15-15 c-8.284,0-15,6.716-15,15v247.5h-22.5c-6.067,0-11.537,3.655-13.858,9.26c-2.321,5.605-1.038,12.057,3.252,16.347l37.5,37.5 C157.322,328.536,161.161,330,165,330s7.678-1.464,10.607-4.394l37.5-37.5C217.396,283.816,218.68,277.365,216.358,271.76z"/>
                    </svg>
                </button>
            </template>
            <template v-slot:action="{ row }">
                <ButtonEdit
                    label="Змінити дані"
                    @click="currentBanner = row"
                    class="mr-2"
                />
                <ButtonDelete
                    label="Видалити"
                    @click="destroy(row.id)"
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
    <TopBannerForm v-if="currentBanner" v-model="currentBanner" @close="currentBanner = ''" @save="saveBanner" />
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from '@/Components/Breadcrumbs.vue';
import Grid from '@/Components/Grid.vue';
import Checkbox from '@/Components/Checkbox.vue';
import ButtonEdit from '@/Components/ButtonEdit.vue';
import ButtonDelete from '@/Components/ButtonDelete.vue';
import {
    topBannerDelete,
    topBannerRestore,
    topBannerList,
    topBannerEdit,
    topBannerCreate,
    topBannerPosition,
    setActiveTopBanners
} from "@/api.js";
import ButtonRestore from "@/Components/ButtonRestore.vue";
import TopBannerForm from '@/Pages/Top_banners/TopBannerForm.vue';

export default {
    name: 'TopBanners',
    components: {
        ButtonRestore,
        Layout,
        Breadcrumbs,
        Grid,
        Checkbox,
        ButtonEdit,
        ButtonDelete,
        TopBannerForm
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '',
                    label: 'Топ-Банери',
                },
            ],
            currentBanner: '',
            columns: [
                {
                    name: 'id',
                    title: '#',
                    type: 'slot',
                    class: [
                        'w-1',
                        'py-4',
                        'text-center'
                    ]
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
                    name: 'image',
                    title: 'TopBanner',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return `<img class="h-20 w-40" src="${row.image}" alt="banner's logo" />`;
                    }
                },
                {
                    name: 'url',
                    title: 'Посилання',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                    render: (row) => {
                        return (row.url);
                    }
                },
                {
                    name: 'checkbox',
                    title: '',
                    type: 'slot',
                    class: [
                        'w-1'
                    ],
                },
                {
                    name: 'is_active',
                    title: 'Активний',
                    class: [
                        'whitespace-nowrap',
                        'w-1',
                        'py-4',
                        'text-center'
                    ],
                    render: (row) => {
                        return (!row.is_active) ? 'Деактивований' : 'Активний';
                    }
                },
                {
                    name: 'position',
                    title: 'зміна позиції',
                    type: 'slot',
                    class: [
                        'whitespace-nowrap',
                        'w-1',
                        'py-4',
                        'text-center'
                    ],
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
            topbanners: [],
        };
    },
    methods: {
        up(item) {
            const payload = {
                id: item.id,
                action: 'up'
            };
            topBannerPosition(payload).then(() => {
                this.getTopBanners();
            });
        },
        down(item) {
            const payload = {
                id: item.id,
                action: 'down'
            };
            topBannerPosition(payload).then(() => {
                this.getTopBanners();
            });
        },
        getTopBanners() {
            topBannerList().then((res) => {
                this.topbanners = res;
            });
        },
        destroy(id) {
            if (window.confirm("Ви впевнені, що хочете видалити банер?")) {
                // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
                topBannerDelete(id).then(() => {
                    this.getTopBanners();
                });
            }
        },
        restore(id) {
            topBannerRestore(id).then(() => {
                this.getTopBanners();
            });
        },
        change($event) {
             const id = $event.target.value;
             const is_active = $event.target.checked;
             setActiveTopBanners({ id, is_active }).then(() => {
                 this.getTopBanners();
             });
        },
        addTopBanner() {
            this.currentBanner = {
                title: '',
                image: '',
                url: '',
            };
        },
        saveBanner(payload) {
            if (payload.id) {
                topBannerEdit(payload).then(() => {
                    this.getTopBanners();
                    this.currentBanner = '';
                });
            } else {
                topBannerCreate(payload).then(() => {
                    this.getTopBanners();
                    this.currentBanner = '';
                });
            }
        }
    },
    mounted() {
        this.getTopBanners();
    }
}
</script>
