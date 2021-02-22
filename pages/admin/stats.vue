<template>
    <div>

        <h1>Daily visits</h1>


        <no-ssr placeholder="loading...">
                    <Plotly :data="daily_stats" :layout="scatter_tag_layout" :options="scatter_tag_options" ></Plotly>
        </no-ssr>

        <li v-for="(elem,index) in daily_stats_raw" :key="index+'daily'">{{elem.day}} : {{elem.visits}} </li>


        <h1>Weekly visits</h1>


        <no-ssr placeholder="loading...">
                    <Plotly :data="weekly_stats" :layout="scatter_tag_layout" :options="scatter_tag_options" ></Plotly>
        </no-ssr>

        <li v-for="(elem,index) in weekly_stats_raw" :key="index+'weekly'">{{elem.start}} - {{elem.end}} : {{elem.visits}} </li>



        <h1>Monthly visits</h1>


        <no-ssr placeholder="loading...">
                    <Plotly :data="monthly_stats" :layout="scatter_tag_layout" :options="scatter_tag_options" ></Plotly>
        </no-ssr>

        <li v-for="(elem,index) in monthly_stats_raw" :key="index+'weekly'">{{elem.start}} - {{elem.end}} : {{elem.visits}} </li>


        <h1>Daily registrations</h1>


        <no-ssr placeholder="loading...">
                    <Plotly :data="daily_registrations" :layout="scatter_tag_layout" :options="scatter_tag_options" ></Plotly>
        </no-ssr>

        <li v-for="(elem,index) in daily_registrations_raw" :key="index+'weekly'">{{elem.day}} : {{elem.registrations}} </li>


        <h1>Weekly registrations</h1>


        <no-ssr placeholder="loading...">
                    <Plotly :data="weekly_registrations" :layout="scatter_tag_layout" :options="scatter_tag_options" ></Plotly>
        </no-ssr>

        <li v-for="(elem,index) in weekly_registrations_raw" :key="index+'weekly'">{{elem.start}} - {{elem.end}} : {{elem.registations}} </li>


    </div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import AdminTabs from '@/components/admin/AdminTabs'

export default {
    components:{AdminTabs,'Plotly':()=> import('@/components/modules/Plotly.vue')},
    data(){
        return {
            tmp :{},
            daily_stats : [],
            daily_stats_raw : [],

            weekly_stats: [],
            weekly_stats_raw :[],

            monthly_stats :[],
            montly_stats_raw :[],

            daily_registrations :[],
            weekly_registrations: [],

            daily_registrations_raw : [],
            weekly_registrations_raw :[],

            scatter_tag_layout: {
                xaxis: {
                    // range: [-1.1, 1.1],
                    showgrid: false,
                    // title: '← Frequency →',
                    color: 'white',
                    },
                yaxis: {
                    // range: [-1.1, 1.1],
                    showgrid: false,
                    // title: '← Sentiment →',
                    color: 'white',
                },
                paper_bgcolor: '#212121',
                plot_bgcolor: '#212121',
                dragmode: false,
                hovermode:'closest',
                height: 'auto'

            },
            scatter_tag_options: {
                scrollZoom: false,
                // displayModeBar: false,
                reponsive:false,
                modeBarButtonsToRemove:['sendDataToCloud', 'hoverCompareCartesian','editInChartStudio','zoom2d','pan2d', 'select2d','lasso2d','zoomIn2d','zoomOut2d','autoScale2d','resetScale2d','hoverClosestCartesian','hoverCompareCartesian','toggleSpikelines'],
                displaylogo: false,
                staticPlot: false
            },
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
    },
    created(){
        let h = {headers:{Authorization : this.authenticationToken()}}
        this.$axios.$post('/api/admin/stats/daily_visits', {index:0},h)
            .then((res)=>{
                // this.tags = res.tags
                this.daily_stats_raw = res.visits
                let daily_visits = []
                let daily_dates = []
                for (let visit of res.visits){
                    daily_visits.push(visit.visits)
                    daily_dates.push(visit.day)
                }

                this.daily_stats = [{
                    x: daily_dates,
                    y: daily_visits,
                    color:'#212121',
                }]


            })
            .catch((err)=>{
                console.log(err)
            })

        this.$axios.$post('/api/admin/stats/weekly_visits', {index:0},h)
            .then((res)=>{
                // this.tags = res.tags
                console.log(res)
                this.weekly_stats_raw = res.visits
                let weekly_visits = []
                let weekly_dates = []
                for (let visit of res.visits){
                    weekly_visits.push(visit.visits)
                    weekly_dates.push(visit.start + "-" + visit.end)
                }

                this.weekly_stats = [{
                    x: weekly_dates,
                    y: weekly_visits,
                    color:'#212121',
                }]

            })
            .catch((err)=>{
                console.log(err)
            })

        this.$axios.$post('/api/admin/stats/monthly_visits', {index:0},h)
            .then((res)=>{
                // this.tags = res.tags
                console.log(res)
                this.monthly_stats_raw = res.visits
                let monthly_visits = []
                let monthly_dates = []
                for (let visit of res.visits){
                    monthly_visits.push(visit.visits)
                    monthly_dates.push(visit.start + "-" + visit.end)
                }

                this.monthly_stats = [{
                    x: monthly_dates,
                    y: monthly_visits,
                    color:'#212121',
                }]

            })
            .catch((err)=>{
                console.log(err)
            })

        this.$axios.$post('/api/admin/stats/daily_registrations', {index:0},h)
            .then((res)=>{
                // this.tags = res.tags
                console.log(res)
                this.daily_registrations_raw = res.registrations
                let daily_registrations = []
                let daily_dates = []
                for (let visit of res.registrations){
                    daily_registrations.push(visit.registrations)
                    daily_dates.push(visit.day)
                }

                this.daily_registrations = [{
                    x: daily_dates,
                    y: daily_registrations,
                    color:'#212121',
                }]


                // this.tmp = res
            })
            .catch((err)=>{
                console.log(err)
            })


        this.$axios.$post('/api/admin/stats/weekly_registrations', {index:0},h)
            .then((res)=>{
                // this.tags = res.tags
                console.log(res)
                this.weekly_registrations_raw = res.registrations
                let weekly_registrations = []
                let weekly_dates = []
                for (let visit of res.registrations){
                    weekly_registrations.push(visit.registrations)
                    weekly_dates.push(visit.start + "-" + visit.end)
                }

                this.weekly_registrations = [{
                    x: weekly_dates,
                    y: weekly_registrations,
                    color:'#212121',
                }]

            })
            .catch((err)=>{
                console.log(err)
            })

    }

}
</script>

<style>

</style>