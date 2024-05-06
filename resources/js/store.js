import Vuex from 'vuex';
import { signIn, me } from '@/api.js';

const checkToken = () => {
    const token = localStorage.getItem('accessToken');
    return token ? true : false;
};
const checkUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        role: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    };
};


const store = new Vuex.Store({
    state: {
        isLoggedIn: checkToken(),
        user: checkUser()
    },
    mutations: {
        set(state, { name, value }) {
            state[name] = value;
        }
    },
    actions: {
        login({ commit }, payload) {
            signIn(payload).then(() => {
                me().then((res2) => {
                    commit('set', { name: 'user', value: res2 });
                    commit('set', { name: 'isLoggedIn', value: true });
                });
            });
        },
        signOut({ commit }) {
            commit('set', { name: 'isLoggedIn', value: false });
            commit('set', { name: 'user', value: {} });
            localStorage.clear();
        }
    }
});

export default store;
