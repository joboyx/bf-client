<template>
    <div>
<AdminTabs></AdminTabs>
<v-layout class="mt-5">

<v-card width="100%" v-if="tags.length>0">
    <v-card-title>
      All tags
      <v-spacer></v-spacer>

        <v-spacer></v-spacer>  
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        color="black"
      ></v-text-field>
    </v-card-title>
        <v-data-table
        :headers="headers"
        :items="tags"
        :search="search"
        class="elevation-1"
        :rows-per-page-items='[50,100,200,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        v-bind:pagination.sync="pagination"
        >
        <template v-slot:items="props">
            <td>
                    <v-text-field
                          v-model="props.item.tag"
                          color="black"
                          
                    ></v-text-field>
            </td>
            <td class="text-xs-centre" style="height:30px">
                    <v-text-field
                          v-model="props.item.description "
                          color="black"
                          
                    ></v-text-field></td>

                 

                <td>
                    <v-layout justify-center>
                        {{props.item.upvotes}}

                        <v-icon
                            small
                            class="ml-2 mr-2"
                            @click="unlike(props.item)"
                            color="green"
                        >
                            check
                        </v-icon>

                        {{props.item.downvotes}}

                        <v-icon
                            small
                            class="ml-2 mr-2"
                            @click="undislike(props.item)"
                            color="amber darken-4"
                        >
                            clear
                        </v-icon>

                    </v-layout>
                </td>
                <td>
                    <v-layout justify-center>

                    <v-btn @click="accept(props.item)" flat>Update</v-btn>
                    <v-btn @click="reject(props.item)" flat :disabled="!god">Reject</v-btn>
                    <v-btn @click="clear(props.item)" flat>Clear</v-btn>
                    </v-layout>
                </td>

        </template>

      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>

        </v-data-table>

  </v-card>

</v-layout>
<v-snackbar
        v-model="snackbar"
        timeout='2000'
        top
      >
      <v-container fluid text-xs-center class="ma-0 pa-0">
        <v-layout justify-center>
        Thank you for your suggestions!

        </v-layout>
      </v-container>
</v-snackbar>
{{all_tags}}
    </div>
</template>

<script>
// import { tags } from '@/data/search_items'
import axios from 'axios'
import { mapGetters } from 'vuex'
import AdminTabs from '@/components/admin/AdminTabs'

export default {
    components:{AdminTabs},
    data(){
        return {
            headers:[
                {text: 'Tag', value: 'tag', width: '10%'},
                {text: 'Description', value: 'description', width: '60%'},
                // {text: 'Upvotes', value: 'upvotes'},
                // {text: 'Downvotes', value: 'downvotes'},
                // {text: 'Score', value: 'score'},
                // {text: 'Vote', value: 'vote'},
                {text: 'Score', value: 'score', align:'center',width: '15%'},
                {text: 'Action', value: '', align:'center',width: '15%'},
            ],
            tags:[

            ],
            search:'',
            pagination: {
                rowsPerPage: 50,
                sortBy: 'score',
                descending: true,
            },
            snackbar:false,
            unvoted:true,
            god:false,
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'getUser']),

        accept(item){
            let h = {headers:{Authorization : this.authenticationToken()}}
            let self = this
            this.$axios.$post('/api/tag/existing/' + item._id + '/approve', {tag_id:item._id, tag:item.tag, description:item.description}, h)
                .then((res)=>{
                    // this.msg = res
                    if(res.success){
                        this.tags.splice(this.tags.indexOf(item),1)
                    }
                })
                .catch((res)=>{
                    this.msg = res
                })

        },
        reject(item){
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/existing/' + item._id + '/remove', {tag_id:item._id, tag:item.tag, description:item.description}, h)
                .then((res)=>{
                    // this.msg = res
                    if(res.success){
                        this.tags.splice(this.tags.indexOf(item),1)
                    }
                })
                .catch((res)=>{
                    this.msg = res
                })

        },
        clear(item){
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/existing/' + item._id + '/clear', {tag_id:item._id, tag:item.tag, description:item.description}, h)
                .then((res)=>{
                    // this.msg = res
                    if(res.success){
                        this.tags[this.tags.indexOf(item)].downvotes = 0
                        this.tags[this.tags.indexOf(item)].upvotes = 0
                    }
                })
                .catch((res)=>{
                    this.msg = res
                })

        }
    },
    mounted(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/existing/moderation', h)
            .then((res)=>{
                // this.tags = res.tags
                this.tags = res.tags
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    created(){
        if(parseInt(this.getUser().admin)>100){
            this.god = true
        }
    }
}
</script>

<style scoped>

tr {
    height: 75px;    
}
</style>
