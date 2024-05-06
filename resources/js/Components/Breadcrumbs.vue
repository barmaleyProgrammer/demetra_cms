<template>
    <nav class="py-5">
        <ol class="inline-flex items-center space-x-2">
            <li>
                <RouterLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500">
                    <svg class="w-3 h-3 me-2.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                </RouterLink>
            </li>
            <li v-for="(item, key) in items" :key="key">
                <template v-if="item.to">
                    <RouterLink :to="item.to" class="inline-flex items-center text-sm font-medium text-gray-500">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        {{ item.label }}
                    </RouterLink>
                </template>
                <template v-else>
                    <div class="inline-flex items-center text-sm font-medium">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="ms-1">{{ item.label }}</span>
                    </div>
                </template>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: 'Breadcrumbs',
    props: {
        items: Array
    }
}

</script>
