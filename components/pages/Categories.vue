<template>
    <div>
        <!-- <ContentTabs></ContentTabs> -->
        <!-- <CategoryTabs></CategoryTabs> -->
        <BunnyLovePromo ref="blp"></BunnyLovePromo>

        <v-container grid-list-md  fluid>

            <v-layout justify-center>
                <v-flex xs10 md10 lg6>
                <v-text-field
                v-model="search_string"
                solo-inverted
                flat
                hide-details
                label="Filter"
                prepend-inner-icon="search"
            ></v-text-field>
                </v-flex>
            </v-layout>

        <v-layout row wrap justify-start>
            <v-flex xs12 class="display-1 font-weight-thin ma-3">Starred categories</v-flex>
        </v-layout>

        <v-layout row wrap text-xs-center v-if="categories.length>0">
            <template  v-for="(genre, index) in categories" >
            <v-flex xs6 sm4 md3 lg2 :key="index" v-if="genre.starred">
                <v-card >
                    <v-img
                    :src='genre.img_url'
                    height="200px"
                    style="cursor:pointer"
                    @click="route_direct(genre.title)"
                    >
                    </v-img>

                    <v-card-title primary-title>
                    <v-layout>
                        <div class="headline g" @click="route_direct(genre.title)">{{genre.title}} </div>
                        <!-- <span class="grey--text">1,000 miles of wonder</span> -->
                        <v-spacer></v-spacer>
                        <v-icon color='amber'  @click="unstar_category(genre)">star</v-icon>
                    </v-layout>
                    </v-card-title>
                </v-card>               
            </v-flex>
            </template>
        </v-layout>


        <v-divider class="ma-5" v-if="true"></v-divider>
        <v-layout row wrap justify-start>
            <v-flex xs12 class="display-1 font-weight-thin ma-3">All categories</v-flex>
        </v-layout>
        <v-layout row wrap text-xs-center v-if="categories.length>0">
            <template  v-for="(genre, index) in categories" >
            <v-flex xs6 sm4 md3 lg2 :key="index + '_all'">
                <v-card >
                    <v-img
                    :src='genre.img_url'
                    height="200px"
                    style="cursor:pointer"
                    @click="route_direct(genre.title)"
                    >
                    </v-img>

                    <v-card-title primary-title>
                    <v-layout>
                        <div class="headline g" @click="route_direct(genre.title)">{{genre.title}} </div>
                        <!-- <span class="grey--text">1,000 miles of wonder</span> -->
                        <v-spacer></v-spacer>
                        <v-icon color='amber' v-if="genre.starred" @click="unstar_category(genre)">star</v-icon>
                        <v-icon color='amber' v-else @click="star_category(genre)">star_border</v-icon>
                    </v-layout>
                    </v-card-title>
                </v-card>               
            </v-flex>
            </template>
        </v-layout>
        </v-container>
    </div>
</template>



<script>
// import { genres } from '@/data/categories'
// import { cat_to_image } from '@/data/categories'
import axios from 'axios'
import { mapGetters } from 'vuex'
const ContentTabs = () => import('@/components/infrastructure/ContentTabs')
import CategoryTabs from '@/components/infrastructure/CategoryTabs'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'

/**
 * @vuese
 * The categories page as a component, which is embedded in `~/pages/cct.vue`. This page is a little complicated, as there is a lot of shuffling around with the categories and the starring. Best to get in touch with me if anything is unclear.
 * @group Pages
 */
export default {
    components:{ContentTabs,CategoryTabs, BunnyLovePromo},
    data(){
        return{ // @vuese
            // Search string input to search for categories.
            search_string:"", // @vuese
            // List of starred categories by the user.
            star_categories:[], // @vuese
            // List of all categories.
            category_list:[], // @vuese
            // Secondary list of categories.
            category_star:[], // @vuese
            // Another list of categories.
            categories:[], // @vuese
            // Whether the user preferences have already loaded.
            user:false
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
         // @vuese
        // Route to a specific category page.
        route(genre){
            this.$router.push('/categories/'+genre.title)
        },
         // @vuese
        // Route to a specific category page.
        route_direct(genre){
            this.$router.push('/categories/'+genre)
        },
         // @vuese
        // Get the authorisation headers for the api call.
        get_headers(){
            if(this.isLoggedIn()){
                return {headers:{Authorization : this.authenticationToken()}}
            }else{
                return {}
            }
        },
         // @vuese
        // Show the bunnylove promo dialog. Is shown if a non premium member tries to star categories.
        blp(){
            this.$refs.blp.open_dialog()
        },
         // @vuese
        // Echo function.
        get_title(cat){
            return cat
        },
         // @vuese
        // Get the category image.
        get_image(cat){
            return this.cat_dict[cat]
        },
         // @vuese
        // Toggle starring a category by the user.
        toggleCategory(category){
            this.category_star.splice(this.category_list.indexOf(category),1,(this.category_star[this.category_list.indexOf(category)]+1)%2)
            if(this.category_star[this.category_list.indexOf(category)] == 1){
                this.star_categories.push(category)
            } else{
                this.star_categories.splice(this.star_categories.indexOf(category),1)
            }

            if(this.isLoggedIn()){
                this.$axios.$post('/api/user/preferences', {star_categories:this.star_categories}, this.get_headers())
            }

        },
         // @vuese
        // Star a specific category. 
        star_category(category){
            if(this.user.tier === 0){
                this.blp()
            }else{
                let idx = this.categories.indexOf(category)
                this.categories[idx].starred = true
                if(this.isLoggedIn()){
                    let star_cats = []
                    for(let cat of this.categories){
                        if(cat.starred === true){
                            star_cats.push(cat.title)
                        }
                    }
                    this.$axios.$post('/api/user/preferences', {star_categories:star_cats}, this.get_headers())
                }
            }
        },
         // @vuese
        // Unstar a specific category.
        unstar_category(category){
            let idx = this.categories.indexOf(category)
            this.categories[idx].starred = false
            if(this.isLoggedIn()){
                let star_cats = []
                for(let cat of this.categories){
                    if(cat.starred === true){
                        star_cats.push(cat.title)
                    }
                }
                this.$axios.$post('/api/user/preferences', {star_categories:star_cats}, this.get_headers())
            }
        }

    },
    computed:{
        search_genres(){
            let filtered_genres = []
            for(let i = 0;i<this.categories.length;i++){
                if(this.categories[i]['title'].includes(this.search_string) || this.categories[i]['title'].toLowerCase().includes(this.search_string)){
                    filtered_genres.push(this.categories[i])
                }
            }
            return filtered_genres
        }
    },

    created(){
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')

        this.$axios.$get('/api/tag/categories', this.get_headers())
            .then((res)=>{
                this.categories = res.data
            })
            .catch((err)=>{
                console.log(err)
            })
    }

}

// this.$axios.$get('/api/user',this.get_headers())
//     .then((res)=>{
//         if(res.success){
//             for(let cat of res.user.star_categories){
//                 this.star_categories.push(cat)
//             }
            
//             for(let cat of this.genres){
//                 this.category_list.push(cat.title)
//                 if(this.star_categories.includes(cat.title)){
//                     this.category_star.push(1)
//                 } else{
//                     this.category_star.push(0)
//                 }
//             }
//         }
//     })

</script>

<style scoped>
.g:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>
