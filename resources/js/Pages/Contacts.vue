<template>
    <Layout>
        <div class="items-center">
            <Breadcrumbs :items="breadcrumbs"/>
            <form class="w-1/2 mt-2 space-y-6" @submit.prevent="send" action="/about" method="post" encType="multipart/form-data">
                <div class="grid grid-cols-1 gap-2">
                    <h1 class="mx-auto text-2xl">телефон</h1>
                    <div class="relative" v-for="(phone, key) in form.phones" :key="key">
                            <TextInput
                                v-model="form.phones[key]"
                                :required="true"
                            />
                            <button class="absolute right-[-6%] top-[14%]" v-if="key > 0" type="button" @click="deletePhone(key)">
                            &times;
                            </button>
                    </div>
                    <button type="button" @click="addPhone" class="px-3 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-800">додати телефон</button>
                    <h1 class="mx-auto text-2xl">email</h1>
                    <div class="relative" v-for="(email, key) in form.emails" :key="key">
                        <TextInput
                            v-model="form.emails[key]"
                            type="email"
                            :required="true"
                        />
                        <button class="absolute right-[-6%] top-[14%]" v-if="key > 0" type="button" @click="deleteEmail(key)">
                            &times;
                        </button>
                    </div>
                    <button type="button" @click="addEmail" class="px-3 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-800">додати email</button>
                    <h1 class="mx-auto text-2xl">Соціальні мережі</h1>
                    <div class="relative border-2 border-amber-300 p-2" v-for="(social, key) in form.socials" :key="key">
                        <img v-if="form.socials[key].img" :src="form.socials[key].img" width="30" height="30" />
                        <label class="text-xs">Додайте позначку соцмережі</label>
                        <input class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                               autoComplete="off"
                               type="file"
                               accept="image/*"
                               @change="onFileChange($event, key)"
                        />
                        <TextInput
                            label="url"
                            v-model="form.socials[key].url"
                            type="url"
                            :required="true"
                        />
                        <button class="absolute right-[-6%] top-[14%]" v-if="key > 0" type="button" @click="deleteSocialMedia(key)">
                            &times;
                        </button>
                    </div>
                    <button type="button" @click="addSocialMedia" class="px-3 py-2 text-sm text-white rounded-lg bg-blue-600 hover:bg-blue-800">додати соцмережу</button>
                </div>
                <LoadingButton label="Зберегти" />
            </form>
        </div>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Breadcrumbs from "@/Components/Breadcrumbs.vue";
import {contactInfo, contactUpdate} from "@/api.js";
import LoadingButton from '@/Components/LoadingButton.vue';
import TextInput from "@/Components/TextInput.vue";

export default {
    name: 'Contacts',
    components: {
        TextInput,
        LoadingButton,
        Layout,
        Breadcrumbs,
    },
    data() {
        return {
            breadcrumbs: [
                {
                    to: '',
                    label: 'контакти',
                },
            ],
            loading: false,
            form: {
                phones: [
                    ''
                ],
                emails: [
                    ''
                ],
                socials: [
                    {
                        img: '',
                        url: ''
                    }
                ]
            },
        }
    },
    methods: {
        send() {
            this.loading = true;
            contactUpdate(this.form).finally(() => this.loading = false);
        },
        addPhone() {
            this.form.phones.push('');
        },
        deletePhone(key) {
            this.form.phones.splice(key, 1);
        },
        addEmail() {
            this.form.emails.push('');
        },
        deleteEmail(key) {
            this.form.emails.splice(key, 1);
        },
        addSocialMedia() {
            this.form.socials.push({
                img: '',
                url: ''
            });
        },
        deleteSocialMedia(key) {
            this.form.socials.splice(key, 1);
        },
        onFileChange(e, key) {
            const files = e.target.files || e.dataTransfer.files;
            const reader = new FileReader();
            reader.onloadend = () => {
                this.form.socials[key].img = reader.result;
            };
            reader.readAsDataURL(files[0]);
        }

    },
    mounted() {
        contactInfo().then((res) => this.form = res);
    }
}
</script>
