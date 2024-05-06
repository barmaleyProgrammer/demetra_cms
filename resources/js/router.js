import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/Pages/Main.vue';
import News from '@/Pages/News/News.vue';
import Banners from '@/Pages/Banners/Banners.vue';
import Users from '@/Pages/Users.vue';
import CreateBanner from "@/Pages/Banners/CreateBanner.vue";
import User_agreement_page from "@/Pages/User_agreement_page.vue";
import CreateNew from "@/Pages/News/CreateNew.vue";
import FAQ from "@/Pages/FAQ/FAQ.vue";
import About_page from "@/Pages/About_page.vue";
import Contacts from "@/Pages/Contacts.vue";
import TopBanners from "@/Pages/Top_banners/TopBanners.vue";
import Actions from "@/Pages/Actions.vue";
import FAQ_Category_Create from "@/Pages/FAQ/FAQ_Category_Create.vue";
import FAQ_Category_Edit from "@/Pages/FAQ/FAQ_Category_Edit.vue";
import FAQ_Question_Create from "@/Pages/FAQ/FAQ_Question_Create.vue";
import FAQ_Question_Edit from "@/Pages/FAQ/FAQ_Question_Edit.vue";
import EditBanner from "@/Pages/Banners/EditBanner.vue";
import EditNew from "@/Pages/News/EditNew.vue";
import Advantages from "@/Pages/Advantages/Advantages.vue";
import Neuron from "@/Pages/Neuron.vue";
import Indicators from "@/Pages/HomeBlockIndications/Indicators.vue";
import EditIndicators from "@/Pages/HomeBlockIndications/EditIndicators.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Main },
        { path: '/banners', component: Banners },
        { path: '/banners/createBanner', component: CreateBanner },
        { path: '/banners/editBanner/:id', component: EditBanner },
        { path: '/topbanners', component: TopBanners },
        // { path: '/topbanners/createTop_banners', component: CreateTopBanner },
        // { path: '/topbanner/editTop_banner/:id', component: EditTopBanner },
        { path: '/news', component: News },
        { path: '/news/createNew', component: CreateNew },
        { path: '/news/editNew/:id', component: EditNew },
        { path: '/advantages', component: Advantages },
        { path: '/neuron', component: Neuron },
        { path: '/indicators', component: Indicators },
        { path: '/indicators/editIndicators/:id', component: EditIndicators },
        { path: '/contacts', component: Contacts },
        { path: '/user_agreement_page', component: User_agreement_page },
        { path: '/users', component: Users },
        { path: '/about_page', component: About_page },
        { path: '/faq', component: FAQ },
        { path: '/faq_category/create', component: FAQ_Category_Create },
        { path: '/faq_category/edit/:id', component: FAQ_Category_Edit },
        { path: '/faq_question/create', component: FAQ_Question_Create },
        { path: '/faq_question/edit/:id', component: FAQ_Question_Edit },
        { path: '/actions', component: Actions },
    ]
});

export default router;
