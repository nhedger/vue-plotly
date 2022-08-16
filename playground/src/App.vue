<script setup lang="ts">
    import { Plot } from '@hedger/vue-plotly';
    import { ref } from 'vue';

    const data = ref([
        {
            values: [19, 26, 55],
            labels: ['Residential', 'Non-Residential', 'Utility'],
            type: 'pie',
        },
    ]);

    const layout = ref({
        showlegend: true,
        margin: {
            r: 0,
            l: 0,
            b: 0,
            t: 0,
        }
    });
</script>

<template>
    utility <input type="text" v-model="data[0].values[0]">
    non-residential <input type="text" v-model="data[0].values[1]">
    residential <input type="text" v-model="data[0].values[2]">

    <input type="checkbox" v-model="layout.showlegend">

    <Plot style="width:500px;height:500px" :data="data" :layout="layout" :auto-refresh="true" />
</template>
