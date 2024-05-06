<template>
    <RouterView v-if="$store.state.isLoggedIn" :key="$route.fullPath" />
    <Login v-else />
</template>

<script>
import Login from '@/Pages/Login.vue';
export default {
    name: 'App',
    components: {
        Login
    }
}
</script>
