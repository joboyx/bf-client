<template>
  <div>
      <v-layout justify-center class="text-xs-center hidden-lg-and-up">
      <!-- <vue-plotly :data="data" :layout="layout" :options="options" class="plot_large"/> -->
      </v-layout>

      <v-layout justify-center class="text-xs-center hidden-md-and-down">
      <!-- <vue-plotly :data="data" :layout="layout" :options="options" class="plot_small"/> -->
      </v-layout>





  </div>
</template>
<script>
// import VuePlotly from '@statnett/vue-plotly'
/**
 * @vuese
 * This can be used for graphing, which happens in the statistics page, as well as for some administrator functions. It takes in data and automatically graphs it using Plotly. See the Plotly online documentation for more details.
 * <br>
 * `data`
 * The graphing data. <br>
 * `layout`
 * Layout formatting for the graph. <br>
 * `options`
 * Other options for the graph.
 * @group modules
 */
export default {
    // components:{VuePlotly},
    props:['data', 'layout', 'options'],
    data(){
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
.plot_large{
    max-width:80vw;
    max-height:80vw;
}

.plot_small{
    max-width:60vw;
    max-height:60vw;
}
</style>