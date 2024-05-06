<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <div class="flex flex-row items-center shadow-lg overflow-hidden rounded-lg bg-white">
            <form class="block p-6" @submit.prevent="signIn">
                <h1 class="text-center">Увійти до Demetra CMS</h1>
                <TextInput
                   v-model.trim="email"
                   type="email"
                   class="py-2 w-full"
                   label="Email"
                   required
                />
                <TextInput
                   v-model.trim="password"
                   type="password"
                   class="py-2 w-full"
                   label="Password"
                   required
                   readonly
                />
                <div class="flex justify-end pt-2">
                    <LoadingButton
                        :loading="loading"
                        type="submit"
                        label="SignIn"
                    />
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import TextInput from '@/Components/TextInput.vue';
import LoadingButton from '@/Components/LoadingButton.vue';

export default {
    name: 'Login',
    components: {
        TextInput,
        LoadingButton
    },
    data() {
        return {
            loading: false,
            email: (process.env.NODE_ENV === 'development') ? 'admin@local.com' : '',
            password: (process.env.NODE_ENV === 'development') ? 'admin' : ''
        };
    },
    methods: {
        signIn() {
            this.loading = true;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then(() => {
                this.loading = false;
            });
            this.$router.push('/news');
        }
    }
}
</script>
