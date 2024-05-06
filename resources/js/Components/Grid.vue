<template>
    <table class="w-full whitespace-nowrap border-collapse border border-slate-300">
        <thead class="text-xs text-left uppercase bg-gray-300">
            <tr>
                <th
                    class="px-6 py-3"
                    v-for="(column, columnKey) in columns"
                    :key="`column_${columnKey}`"
                    @click="column.sortable ? sortBy(column.name) : ''"
                    :class="column.sortable ? 'cursor-pointer' : ''">
                    <span class="flex items-center">
                        <span v-html="column.title"></span>
                        <span class="ml-1 flex" v-if="column.sortable">
                            <template v-if="sorting.field === column.name">
                                <svg v-if="sorting.order === 'ASC'" class="h-4 w-2 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor" d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z" />
                                </svg>
                                <svg v-if="sorting.order === 'DESC'" class="h-4 w-2 inline-block text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
                                </svg>
                            </template>
                            <template v-else>
                                <svg class="h-4 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor" d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z" />
                                </svg>
                                <svg class="h-4 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor" d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
                                </svg>
                            </template>
                        </span>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody class="text-sm">
            <tr v-for="(row, rowKey) in rows" :key="`row_${rowKey}`" class="hover:bg-gray-100 focus-within:bg-gray-100">
                <template v-for="(column, columnKey) in columns" :key="`column_${columnKey}-row_${rowKey}`">
                    <template v-if="Object.prototype.hasOwnProperty.call(column,'render')">
                        <td class="border-t p-4" :class="column.class" :style="column.style" v-html="column.render(row)"/>
                    </template>
                    <template v-else-if="Object.prototype.hasOwnProperty.call(column,'type') && column.type === 'slot'">
                        <td class="border-t p-4" :class="column.class" :style="column.style">
                            <slot :name="column.name" :row="row" :index="rowKey" />
                        </td>
                    </template>
                    <template v-else>
                        <td class="border-t p-4" :class="column.class" :style="column.style" v-html="row[column.name]" />
                    </template>
                </template>
            </tr>
            <tr v-if="!rows.length">
                <td class="px-6 py-4 text-center" :colspan="columns.length">No data found.</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            default: () => ([])
        },
        rows: {
            type: Array,
            default: () => ([])
        },
        sorting: {
            type: Object,
            default: () => ({
                field: 'id',
                order: 'ASC'
            }),
        },
    },
    methods: {
        sortBy(field) {
            let newField = field;
            let newOrder = 'ASC';
            if (field === this.sorting.field) {
                newOrder = this.sorting.order === 'ASC' ? 'DESC' : 'ASC';
            }
            this.$emit('update:sorting', {
                field: newField,
                order: newOrder,
            });
        },
    }
}
</script>
