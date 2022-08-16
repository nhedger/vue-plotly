<script setup lang="ts">
    import Plotly from 'plotly.js-dist';
    import { onMounted, onUnmounted, ref, unref, watchEffect, WatchStopHandle } from 'vue';

    let stopWatcher: WatchStopHandle;
    let resizeObserver: ResizeObserver;
    const plotDiv = ref<HTMLElement | undefined>();

    const props = defineProps<{
        data: Plotly.Data[];
        layout?: Plotly.Layout;
        config?: Plotly.Config;
        autoRefresh?: Boolean;
    }>();

    /**
     * Resize handler
     *
     * This method is called whenever the plotDiv is resized. This ensures the
     * plots is properly resized and fits its container.
     */
    const resizePlot = () => {
        Plotly.Plots.resize(unref(plotDiv) as HTMLElement);
    };

    /**
     * Redraw handler
     *
     * This method is called whenever the props change to redraw the plot using
     * fresh data, layout and configuration.
     */
    const redrawPlot = (refreshData: boolean = true) => {
        if (refreshData) {
            // If a layout configuration was passed to the component, replace
            // its datarevision property to trigger a redraw. If no layout config
            // was passed, create a partial configuration to set the datarevision
            // property to a random string.
            const layout = props.layout ?? ({} as Partial<Plotly.Layout>);
            layout.datarevision = Math.random();
        }

        // Redraw the plot using the updated props values
        Plotly.react(unref(plotDiv) as HTMLElement, props.data, props.layout, props.config);
    };

    onMounted(() => {
        // Setup a watcher to detect changes in the props
        stopWatcher = watchEffect(() => redrawPlot(!!unref(props.autoRefresh)));

        // Setup a resize observer on the plot div
        resizeObserver = new ResizeObserver(() => resizePlot);
        resizeObserver.observe(unref(plotDiv) as HTMLElement);
    });

    onUnmounted(() => {
        // Stop watching for props changes
        stopWatcher();

        // Stop observing for plot div resize
        resizeObserver.unobserve(unref(plotDiv) as HTMLElement);

        // Purge Plotly
        Plotly.purge(unref(plotDiv) as HTMLElement);
    });
</script>

<script lang="ts"></script>

<template>
    <div ref="plotDiv"></div>
</template>
