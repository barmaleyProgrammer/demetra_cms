<template>
    <Layout>
        <Grid :columns="columns" :rows="actions">
        </Grid>
    </Layout>
</template>

<script>
import Layout from '@/Components/Layout.vue';
import Grid from "@/Components/Grid.vue";
import moment from 'moment';
export default {
    name: 'Actions',
    components: {
        Layout,
        Grid,
    },
    data() {
        return {
            actions: [
                {
                    id: 1,
                    log: 'admin changed a position of banner \'ГЕРЦ\'',
                    action: 'CHANGE_POSITION',
                    entity: 'BANNER'
                }
            ],
            columns: [
                {
                    name: 'id',
                    title: '#',
                    class: [
                        'w-1',
                        'py-4'
                    ]
                },
                {
                    name: 'log',
                    title: 'log',
                    class: [
                        'w-64',
                        'py-4'
                    ],
                },
                {
                    name: 'action',
                    title: 'action',
                    class: [
                        'w-64',
                        'py-4',
                        'max-w-sm',
                        'truncate'
                    ],
                },
                {
                    name: 'entity',
                    title: 'ENTITY',
                    class: [
                        'w-64',
                        'py-4'
                    ]
                },
                {
                    name: 'time',
                    title: 'TIME',
                    class: [
                        'w-64',
                        'py-4',
                    ],
                    render: (row) => {
                        return moment(row.created_at).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
            ],
        }
    },
    methods: {
    },
}
</script>
