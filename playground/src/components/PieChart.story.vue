<script lang="ts" setup>
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
        },
    });
</script>

<template>
    <Story title="Pie Chart" :layout="{ type: 'single', iframe: false }">
        <Plot
            style="width: 500px; height: 500px"
            :data="data"
            :layout="layout"
            :auto-refresh="true" />
    </Story>
</template>
