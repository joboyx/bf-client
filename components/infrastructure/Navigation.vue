<template>
    <div>
        <div class="topnav">
            <v-toolbar :color="color_theme" app clipped-left flat scroll-off-screen ref="navbar">
            <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up" id="sideBarTutorial"></v-toolbar-side-icon>

         <!--   <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon> -->
            <!-- <span class="title ml-3 mr-5 mt-0 pt-0 font-weight-light" @click="homepage" style="cursor:pointer">BunnyFap!</span> -->

            <!-- <span class="title ml-3 mr-5 mt-0 pt-0 font-weight-light" @click="homepage">

                <v-img
                    :src="require('assets/images/logo.png')"
                >
                </v-img>
            </span> -->   
        
                        <v-img
                                id="landingStep-0"
                                class="title hidden-xs-only"
                                contain
                                :src="require('assets/images/logos/logo-white-horizontal-v3.png')"
                                style="cursor:pointer; width:120px;"
                                max-width="120px"
                                @click="homepage"
                        >

                        </v-img>

            <v-toolbar-items class="hidden-sm-and-down">
                <!-- <v-btn icon small v-if="!user.patreon_connected" nuxt to="/bunnylove" target="_blank"><v-icon small color="#B29126">favorite</v-icon></v-btn> -->
            <v-btn flat nuxt to="/" class="font-weight-light subheading ml-2">
                <v-icon class="mr-2" small color="#B29126"  v-if="user.tier===2">home</v-icon>
                <v-icon class="mr-2" small v-else>home</v-icon>
                <!-- <v-icon class="mr-2" small>home</v-icon>  -->
                Home
                <!-- {{ $route.name }} -->
            </v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="isLoggedIn()" class="hidden-sm-and-down">
            <v-btn flat nuxt to="/library" class="font-weight-light subheading" id="navbarStep-0">
                <v-icon class="mr-2" small color="#B29126" v-if="user.tier===2">video_library</v-icon>
                <v-icon class="mr-2" small v-else>video_library</v-icon> My Library
            </v-btn>

            </v-toolbar-items>
            <v-toolbar-items>

            <v-btn flat nuxt to="/flix/store" class="hidden-sm-and-down font-weight-light subheading" id="navbarStep-1">
                <v-icon class="mr-2" small  color="#B29126" v-if="user.tier===2">videocam</v-icon>
                <v-icon class="mr-2" small  v-else>videocam</v-icon> Flix
            </v-btn>


            <v-btn v-if="admin" nuxt flat to="/admin/new_tags" class="hidden-sm-and-down font-weight-light subheading" >
                <v-icon class="mr-2" small color="#B29126" v-if="user.tier===2">settings</v-icon>
                <v-icon class="mr-2" small v-else>settings</v-icon> Admin
            </v-btn>
            </v-toolbar-items>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
                <!-- solo-inverted -->
                <!-- solo -->
            <!-- <v-combobox
                class="mt-1"
                v-model="select"
                flat
                :items="tags"
                label="Search"
                prepend-inner-icon="search"
                @keyup.enter="search()"
                solo-inverted
                :menu-props="menuProps"
                :search-input.sync="search_string"
            ></v-combobox> -->
                <!-- hide-no-data -->
                <!-- dont-fill-mask-blanks -->

            <multiselect v-model="search_string"
                    :options="search_items"
                    group-values="items"
                    group-label="sort"
                    :resetAfter="true"
                    :group-select="false"
                    placeholder="Type to search"
                    @select="search"
                    @search-change="update_search_query"
                    style="width:600px"
                    :preserveSearch="true"
                    :clear-on-select="false"
                    id="navbarStep-2"
                    >
                    <!-- <span slot="noResult">Oops! No elements found. Consider changing the search query.</span> -->
                    </multiselect>
                    <!-- track-by="name" label="name" -->



            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-toolbar-items v-if="!isGuest()">

            <v-menu
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-y
                  v-if="false"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn icon
                      dark
                      v-on="on"
                    >
                    <v-badge bottom overlap color="transparent">
                      <template v-slot:badge >
                          <span class="mt-1 pl- font-weight-thin subheading">{{carrots}}</span>
                      </template>
                        <v-img
                                :src="get_reward_logo('carrot')"
                               height="25px"
                               width="25px"
                               class=""
                               contain
                            >
                            </v-img>
                    </v-badge>
                    </v-btn>
                  </template>
                    <v-list>
                        <v-list-tile  @click="$router.push('/marketplace/bunnystore')" >
                            <v-list-tile-action><v-icon>store</v-icon> </v-list-tile-action>
                            <v-list-tile-title>Shop</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="$router.push('/marketplace/items')">
                            <v-list-tile-action><v-icon>work</v-icon> </v-list-tile-action>
                            <v-list-tile-title>Backpack</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
            </v-menu>


                <!-- REWARD NOTIFICATION MENU DAILY STREAK UNCOMMENT -->
            <v-menu
                  v-model="reward_notification"
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-y
                  v-if="true"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn icon
                      dark
                      v-on="on"
                    >
                    <v-badge bottom overlap color="transparent">
                      <template v-slot:badge >
                            <span class="mt-1 ml-2 font-weight-thin subheading">{{carrots}}</span>
                          <!-- <span >{{streak}}</span> -->
                      </template>
                        <v-img
                            :src="get_reward_logo('carrot')"
                            height="25px"
                            width="25px"
                            class=""
                            contain
                        >
                        </v-img>
                      <!-- <v-icon
                      >
                        card_giftcard
                      </v-icon> -->
                    </v-badge>
                    </v-btn>
                  </template>
                  <v-card >
                      <v-stepper vertical class="text-xs-center" style="padding-bottom: 10px" >
                          <div class="mt-3">
                          <span class="title mt-5 font-weight-light">Your daily rewards</span>
                          </div>
                          <!-- <v-layout justify-center><v-btn icon><v-icon>business_center</v-icon></v-btn></v-layout> -->
                          <v-stepper-step :complete="true" :step='streak' color="#B29126">
                                  <v-layout>
                              <template v-for="(reward, index) in rewards[streak] " >

                                      <v-badge bottom overlap color="transparent" :key="index + String(reward)">
                                          <template v-slot:badge>
                                      <span v-if="reward['amount']!=1" class="font-weight-light">x{{reward['amount']}}</span>
                                          </template>

                        <v-img
                                :src="get_reward_logo(reward['item'])"
                               height="25px"
                               width="25px"
                               class="ml-1 mr-1"
                               contain
                            >
                            </v-img>
                            </v-badge>

                            </template>
                                </v-layout>
                        </v-stepper-step>
                        <v-stepper-content :step="streak">
                        </v-stepper-content>
                          <v-stepper-step :step='streak+1' color="#B29126">
                              <template v-for="(reward,index) in rewards[(streak+1)%31] " >
                                      <v-badge bottom overlap color="transparent"  :key="index + String(reward)">
                                          <template v-slot:badge>
                                      <span v-if="reward['amount']!=1" class="font-weight-light">x{{reward['amount']}}</span>
                                          </template>

                        <v-img
                                :src="get_reward_logo(reward['item'])"
                               height="25px"
                               width="25px"
                               class="ml-1 mr-1"
                               contain
                            >
                            </v-img>
                            </v-badge>
                            </template>
                        </v-stepper-step>
                        <v-stepper-content step="streak+1">
                        </v-stepper-content>
                          <v-stepper-step :step='streak+2'>
                              <template v-for="(reward, index) in rewards[(streak+2)%31] " >
                                      <v-badge bottom overlap color="transparent"  :key="index + String(reward)">
                                          <template v-slot:badge>
                                      <span v-if="reward['amount']!=1" class="font-weight-light">x{{reward['amount']}}</span>
                                          </template>

                        <v-img
                                :src="get_reward_logo(reward['item'])"
                               height="25px"
                               width="25px"
                               class="ml-1 mr-1"
                               contain
                            >
                            </v-img>
                            </v-badge>
                            </template>
                        </v-stepper-step>
                        <!-- <v-stepper-content step="streak+2">

                        </v-stepper-content> -->
                    </v-stepper>
                    <v-list>
                        <v-list-tile @click="$router.push('/marketplace/items')">
                            <v-list-tile-action><v-icon>business_center</v-icon> </v-list-tile-action>
                            <v-list-tile-title>Backpack</v-list-tile-title>
                        </v-list-tile>
                        <v-layout justify-right class="text-xs-right">  <span class="ml-3 underline-on-hover caption" @click="$router.push({ name: 'marketplace-shop-browse'})">Buy more carrots</span> </v-layout>
                    </v-list>
                </v-card>
            </v-menu>
                <!---->

            <v-menu
                  v-model="notification_menu"
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-btn icon
                      dark
                      v-on="on"
                    >
                    <v-icon v-if="notifications.length!=0" color="#B29126">notification_important</v-icon>
                    <v-icon v-else>notifications</v-icon>
                    </v-btn>
                  </template>
                  <v-card max-height='500px' v-if="notifications.length!=0">
                       <v-list>
                           <v-list-tile>
                               <v-list-tile-content>
                                   <v-list-tile-title class="font-weight-bold">Notifications

                                       </v-list-tile-title>
                                       <v-list-tile-sub-title>{{notifications.length}} new notifications.</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn icon @click="dismiss_all_notifications()">
                                        <v-icon>done_all</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                               </v-list-tile>

                           </v-list>
                    <v-list v-for="notification in notifications" :key="notification['date']">
                      <v-divider></v-divider>
                      <v-list-tile avatar>
                        <v-list-tile-content class="underline-on-hover" style="cursor:pointer" @click="notification_redirect(notification['type'])">
                            <v-list-tile-title>{{notification['title']}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{notification['date'].substring(0,notification['date'].indexOf('T'))}}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-btn
                            icon
                            @click="dismiss_notification(notification)"
                          >
                            <v-icon>check</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>


                  </v-card>
                  <v-card v-else>
                      <v-list >
                      <v-list-tile avatar>
                        <v-list-tile-content >
                            <v-list-tile-title>You have no new notifications! :)</v-list-tile-title>
                        </v-list-tile-content>

                      </v-list-tile>
                    </v-list>





                      </v-card>

            </v-menu>

        </v-toolbar-items>

        <v-toolbar-items v-else class="hidden-sm-and-down" >
        <v-btn flat @click="login" class="font-weight-light subheading ml-2">
            login
        </v-btn>
        <v-btn flat @click="signup" class="font-weight-light subheading ml-2">
            sign up
        </v-btn>
        </v-toolbar-items>



            <!-- User is logged in -->
            <v-toolbar-items class="hidden-sm-and-down" v-if="!isGuest()">


                <v-menu v-for="(item, index) in topnav.itemsLoggedIn" :key="index + 'user_menu'"  open-on-hover down offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" flat class="font-weight-light subheading">
                            <!-- <v-icon left class='mr-2' v-if="user.tier===0">account_circle</v-icon>  -->
                            <v-icon left class='mr-2' v-if="user.tier===1" color="#B29126">favorite_border</v-icon>
                            <v-icon left class='mr-2' v-else-if="user.tier===2" color="#B29126">favorite</v-icon>
                            <v-icon left class='mr-2' v-else-if="user.tier===3" color="#B29126">favorite</v-icon>
                            <span style="color:#B29126;" v-if="user.tier===3" >{{truncate(username)}}</span>
                            <span v-else >{{truncate(username)}}</span>


                        </v-btn>
                    </template>
                    <v-list v-if="!item.dropdown">
                        <v-list-tile v-for="(subItem, index) in item.menu" :key="index+'user_menu_text'">
                            <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>

                    <v-list v-else>
                        <v-list-tile v-for="(subItem, index) in item.menu" :key="index+'user_menu_icon'" @click="redirect(subItem.route)">
                            <v-icon left> {{subItem.icon}} </v-icon> <v-list-tile-title> {{ subItem.text }}</v-list-tile-title>
                        </v-list-tile>

                    </v-list>
                </v-menu>

            </v-toolbar-items>


            <!-- User is not logged in -->
            <v-toolbar-items class="hidden-sm-and-down" v-else>
                <v-menu v-for="(item, index) in topnav.itemsLoggedOut" :key="index + 'user_menu'"  open-on-hover down offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" flat class="font-weight-light subheading">
                            <!-- <v-icon left class='mr-2' v-if="user.tier===0">account_circle</v-icon>  -->
                            <v-icon left class='mr-2' v-if="user.tier===1" color="#B29126">favorite_border</v-icon>
                            <v-icon left class='mr-2' v-else-if="user.tier===2" color="#B29126">favorite</v-icon>
                            <v-icon left class='mr-2' v-else-if="user.tier===3" color="#B29126">favorite</v-icon>
                            <span style="color:#B29126;" v-if="user.tier===3" >{{truncate(username)}}</span>
                            <span v-else >{{truncate(username)}}</span>


                        </v-btn>
                    </template>
                    <v-list v-if="!item.dropdown">
                        <v-list-tile v-for="(subItem, index) in item.menu" :key="index+'user_menu_text'">
                            <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>

                    <v-list v-else>
                        <v-list-tile v-for="(subItem, index) in item.menu" :key="index+'user_menu_icon'" @click="redirect(subItem.route)">
                            <v-icon left> {{subItem.icon}} </v-icon> <v-list-tile-title> {{ subItem.text }}</v-list-tile-title>
                        </v-list-tile>

                    </v-list>
                </v-menu>

            </v-toolbar-items>
                <div id="navbarStep-3"></div>
            </v-toolbar>
        </div>

        <div class="sidenav hidden-md-and-up">
            <v-navigation-drawer v-model="drawer" fixed  :class='side_nav_theme' >
                            <v-img v-if="!night_mode"
                    class="title hidden-sm-and-up"
                    contain
                    :src="require('assets/images/logo.png')"
                    style="cursor:pointer"
                    @click="homepage"

                >
                </v-img>

            <v-img v-else
                    class="title hidden-sm-and-up"
                    contain
                    :src="require('assets/images/logos/logo-white-horizontal-v3.png')"
                    style="cursor:pointer"
                    @click="homepage"
            >
            </v-img>
                <div v-if="!isGuest()">
                    <v-list>
                    <template v-for="(item, i) in sidenav.itemsLoggedIn">
                                  <v-divider v-if="item.type=='divider'" :key="i" dark class="my-3"></v-divider>
                                  <v-subheader v-else-if="item.type=='heading'" :key="i">{{item.text}}</v-subheader>

                                  <v-list-tile v-else-if="item.type=='link'" :key="i" @click="redirect(item.route)">
                                      <v-list-tile-action> <v-icon>{{item.icon}}</v-icon></v-list-tile-action>
                                      <v-list-tile-content>
                                          <v-list-tile-title>{{item.text}}</v-list-tile-title>
                                      </v-list-tile-content>
                                  </v-list-tile>


                    </template>
                        <v-list-tile v-if="false">
                            <!-- <v-icon left>remove_red_eye</v-icon>  -->
                                <v-list-tile-action v-if="false">
                                    <v-switch
                                    v-model="night_mode"
                                    label="Night mode"
                                    @change="toggle_nightmode"
                                    ></v-switch>
                                </v-list-tile-action>

                        </v-list-tile>
                    </v-list>
                </div>



                <div v-if="isGuest()">
                    <v-list>
                    <template v-for="(item, i) in sidenav.itemsLoggedOut">
                                  <v-divider v-if="item.type=='divider'" :key="i" dark class="my-3"></v-divider>
                                  <v-subheader v-else-if="item.type=='heading'" :key="i">{{item.text}}</v-subheader>
                                  <v-list-tile v-else-if="item.type=='link'" :key="i" @click="redirect(item.route)">
                                      <v-list-tile-action> <v-icon>{{item.icon}}</v-icon></v-list-tile-action>
                                      <v-list-tile-content>
                                          <v-list-tile-title>{{item.text}}</v-list-tile-title>
                                      </v-list-tile-content>
                                  </v-list-tile>
                    </template>
                    </v-list>
                </div>
                
            </v-navigation-drawer>
        </div>

        <Login></Login>
        <Signup></Signup>
        <AcceptToS></AcceptToS>
        <div  v-show="$route.name==='index'" style="position:relative; z-index:10;"><v-tour name="landing" :steps="tutorialLandingSteps" style="z-index:0" :callbacks="tutorialCallbackLanding" :options="tutorialOptions"></v-tour></div>
        <!-- <v-tour name="navbar" :steps="tutorialNavbarSteps"></v-tour> -->
        <!-- <v-tour name="theatre" :steps="tutorialTheatreSteps"></v-tour> -->
        <v-tour name="flix" :steps="tutorialFlixSteps" v-show="$route.name==='flix-store'" :callbacks="tutorialCallbackFlix" :options="tutorialOptions"></v-tour>
        <!-- <v-tour name="editor" :steps="tutorialEditorSteps" v-show="$route.name==='flix-private-flick'"></v-tour> -->
        <v-tour name="moderation" :steps="tutorialModerationSteps" v-show="$route.name==='moderation-moderation'" :callbacks="tutorialCallbackModeration" :options="tutorialOptions"></v-tour>
        <v-tour name="moderationRest" :steps="tutorialModerationRestSteps" v-show="$route.name==='moderation-moderation'" :callbacks="tutorialCallbackModerationRest" :options="tutorialOptions"></v-tour>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import SignInUp from '@/components/SignInUp'
import axios from 'axios'
// import { tags } from '@/data/search_items'
// import { search_items } from '@/data/search_items_sorted'
import { rewards } from '@/components/modules/rewards'
import  Login  from '@/components/modules/Login'
import  Signup  from '@/components/modules/Signup'
import  AcceptToS  from '@/components/modules/AcceptToS'

/**
 * @vuese
 * This components is the top (or side on mobile) navigation bar. It is very convenient to use because it is present on every page. Over time this component has accumulated a lot of functionality, making it slightly unorganised. This navbar contains the following functions:
 *  <br> <br>
 * `Navbar button` <br>
 * Logically, it contains all the buttons seen on the screen, such as home, my library etc.
 * <br> <br>
 * `Search feature` <br>
 * The search bar makes use of the `multiselect` component and vuejs plugin. The link to this is https://vue-multiselect.js.org/. The search items are pulled from the API. See backend documenation for this.
 * <br> <br>
 * `Rewards and notifcations` <br>
 * Upon loading the user (see methods), we have the daily streak. We match this with the `/modules/rewards` component to determine the prior and next rewards. We then show this under the carrot icon. The notifcations are also loaded from the user data and displayed as a list.
 * <br> <br>
 * `Tutorials` <br>
 * Since the navbar is present on all pages, it made sense to store the tutorial steps here. The tutorials are made using the `v-tour` plugin. 
 * <br> <br>
 * `A note on the vue bus` <br>
 * We make use of the vue bus to communicate between certain components on the website. See the `create` method for the listeners. 
 * @group infrastructure
 */
export default {
    components:{Login,Signup,AcceptToS},
    data(){
        return{ // @vuese
            // Whether the user has a notification in the form of a daily streak reward waiting.
            reward_notification:false, // @vuese
            // The username of the user.
            username:'', // @vuese
            // Deprecated. This used to determine whether the background was dark or white. Now its all dark.
            night_mode:true, // @vuese
            // Whether the user is an admin.
            admin:false, // @vuese
            // Deprecated.
            slider:false, // @vuese
            // Deprecated.
            model:null, // @vuese
            // Deprecated.
            select:"", // @vuese
            // Deprecated. 
            side_nav_theme:'grey darken-4', // @vuese
            // The text in the search bar.
            search_string:"", // @vuese
            // The default items in the search bar.
            search_items:[], // @vuese
            // Deprecated.
            color_theme:'grey darken-4', // @vuese
            // Deprecated.
            autoselectMenu:{value: false}, // @vuese
            // The buttons and items in the top navigation bar.
            topnav:{
                itemsLoggedOut:[
                    {icon: "account_circle", id:2, text:'', dropdown:true, menu: [
                        {icon:"account_box", route:"/profile/profile", text:"Profile"},
                        // {icon:"vpn_key", route:"/profile/keys", text:"Keys"},
                        // {icon:"gavel", route:"/moderation/moderation", text:"Moderation"},
                        // {icon:"favorite", route:"/bunnylove", text:"Bunnylove"},
                        {icon:"help", route:"/support/help", text:"Help"},
                        {icon:"security", route:"/privacy/PrivacyPolicy", text:"Privacy Policy"},
                        {icon:"insert_emoticon", route:"/partners", text:"Partners"},
                        // {icon:"exit_to_app", route:"/logout", text:"Logout"},
                    {type:"link", text:"Terms of Service", route:"/privacy/ToS", icon:"description"},
                        ]}
                    ],
                itemsLoggedIn:[
                    {icon: "account_circle", id:2, text:'', dropdown:true, menu: [
                        {icon:"account_box", route:"/profile/profile", text:"Profile"},
                        // {icon:"vpn_key", route:"/profile/keys", text:"Keys"},
                        {icon:"gavel", route:"/moderation/moderation", text:"Moderation"},
                        {icon:"favorite", route:"/bunnylove", text:"Bunnylove"},
                        {icon:"help", route:"/support/help", text:"Help"},
                        {icon:"insert_emoticon", route:"/partners", text:"Partners"},
                        {icon:"security", route:"/privacy/PrivacyPolicy", text:"Privacy Policy"},
                    {type:"link", text:"Terms of Service", route:"/privacy/ToS", icon:"description"},
                        {icon:"exit_to_app", route:"/logout", text:"Logout"},
                        ]}
                    ]
            }, // @vuese
            // The items and buttons in the side navigation - used on mobile devices.
            sidenav:{
                itemsLoggedIn:[
                    {type:"heading", text:"Home"},
                    {type:"link", text:"Home", route:"/", icon:"home"},
                    {type:"link", text:"Recommended", route:"/recommended", icon:"extension"},
                    {type:"link", text:"Top", route:"/top", icon:"star"},
                    //{type:"link", text:"Recommended", route:"/recommended", icon:"extension"},
                    {type:"link", text:"Flix", route:"/flix/store", icon:"videocam"},
                    {type:"link", text:"Categories", route:"/cct", icon:"drag_indicator"},
                    // {type:"link", text:"Moderation", route:"/moderation/moderation", icon:"gavel"},

                    {type:"heading", text:"Library"},
                    {type: "link", text:"Favourites", route:"/library/favourite", icon:"favorite_border"},
                    {type: "link", text:"Liked", route:"/library/like", icon:"thumb_up"},
                    {type: "link", text:"Seen", route:"/library/seen", icon:"remove_red_eye"},
                    {type: "link", text:"Lists", route:"/library/flicks/flicks", icon:"view_list"},
                    {type:"heading", text:"Profile & More"},
                    // {type: "link",icon:"vpn_key", route:"/profile/keys", text:"Keys"},
                    {type:"link", text:"Bunnylove", route:"/bunnylove", icon:"favorite"},
                    {type:"link", text:"Moderation", route:"/moderation/moderation", icon:"gavel"},
                    {type:"link", text:"Settings", route:"/profile/profile", icon:"account_box"},
                    {type:"link", text:"Help", route:"/support/help", icon:"help"},
                    {type:"link", text:"Privacy Policy", route:"/privacy/PrivacyPolicy", icon:"security"},
                    {type:"link", text:"Terms of Service", route:"/privacy/ToS", icon:"description"},
                    {type:"link", text:"Logout", route:"/logout", icon:"exit_to_app"},
                ],
                itemsLoggedOut:[
                    {type:"heading", text:"Home"},
                    {type:"link", text:"Login", route:"/login", icon:"how_to_reg"},
                    {type:"link", text:"Signup", route:"/signup", icon:"person_add"},
                    {type:"link", text:"Home", route:"/", icon:"home"},
                    {type:"link", text:"Recommended", route:"/recommended", icon:"extension"},
                    {type:"link", text:"Top", route:"/top", icon:"star"},
                    //{type:"link", text:"Recommended", route:"/recommended", icon:"extension"},
                    {type:"link", text:"Flix", route:"/flix/store", icon:"videocam"},
                    {type:"link", text:"Categories", route:"/cct", icon:"drag_indicator"},
                    // {type:"link", text:"Moderation", route:"/moderation/moderation", icon:"gavel"},

                    {type:"heading", text:"Library"},
                    {type: "link", text:"Favourites", route:"/library/favourite", icon:"favorite_border"},
                    {type: "link", text:"Liked", route:"/library/like", icon:"thumb_up"},
                    {type: "link", text:"Seen", route:"/library/seen", icon:"remove_red_eye"},
                    {type: "link", text:"Lists", route:"/library/flicks/flicks", icon:"view_list"},
                    {type:"heading", text:"Profile & More"},
                    // {type: "link",icon:"vpn_key", route:"/profile/keys", text:"Keys"},
                    // {type:"link", text:"Bunnylove", route:"/bunnylove", icon:"favorite"},
                    // {type:"link", text:"Moderation", route:"/moderation/moderation", icon:"gavel"},
                    {type:"link", text:"Settings", route:"/profile/profile", icon:"account_box"},
                    {type:"link", text:"Help", route:"/support/help", icon:"help"},
                    {type:"link", text:"Privacy Policy", route:"/privacy/PrivacyPolicy", icon:"security"},
                    {type:"link", text:"Terms of Service", route:"/privacy/ToS", icon:"description"},
                    {type:"link", text:"Logout", route:"/logout", icon:"exit_to_app"},
                ]
            }, // @vuese
            // Whether the side bar is open or not.
            drawer:null, // @vuese
            // Array of notification objects.
            notifications:[], // @vuese
            // Whether the notification menu is open or not.
            notification_menu : false, // @vuese
            // List of rewards 
            rewards: rewards.data, // @vuese
            // The daily streak value
            streak: 1, // @vuese
            // Number of carrots the user has
            carrots:'', // @vuese
            // The user data object. (Username, carrots, preferences, etc.)
            user:{}, // @vuese
            // The data for the landing page tutorial.
            tutorialLandingSteps: [
                {
                    target: '#landingStep-0',
                    content: '<strong>Welcome to BunnyFap!</strong><br>If you are new, we can quickly show you around. Alternatively, if you click ‘Skip tutorial’, and the guides will stop showing.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#landingStep-1',
                    content: '<strong>Made for you</strong><br>This is the landing page and shows you content tailored to you based on the content you like, dislike and favourite. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#landingStep-2',
                    content: '<strong>However you want it</strong><br>You can click on the filter button to exactly pinpoint what type of content you want to see. You can filter by content type, tags, and categories. You can filter by multiple tags and categories.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#landingStep-3',
                    content: '<strong>Media tiles!</strong><br>If you want to view media, you can click on any of the tiles to open the theatre! If you click on the first tile, it will start playing with Autofap enabled, meaning it will automatically go to the next item once finished playing.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-0',
                    content: '<strong>My library</strong><br>Click on My Library to view content you have liked, disliked, favourited, seen, and your lists.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-1',
                    content: '<strong>Flix</strong><br>Here you can view Bunnyfap’s unique Flix: these are user generated “movies” and themed collections.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-2',
                    content: '<strong>Search</strong><br>You can search for content as well, or show individual categories, tags, and channels.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-3',
                    content: '<strong>Your Profile</strong><br>Lastly, you can view your profile here and view other organisational matters of the website.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], // @vuese
            // The data for the mobile landing page tutorial.
            tutorialLandingMobile:[
                {
                    target: '#landingStep-0',
                    content: '<strong>Welcome to BunnyFap!</strong><br>If you are new, we can quickly show you around. Alternatively, if you click ‘Skip tutorial’, and the guides will stop showing.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#landingStep-1',
                    content: '<strong>Made for you</strong><br>This is the landing page and shows you content tailored to you based on the content you like, dislike and favourite. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#landingStep-2',
                    content: '<strong>However you want it</strong><br>You can click on the filter button to exactly pinpoint what type of content you want to see. You can filter by content type, tags, and categories. You can filter by multiple tags and categories.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#landingStep-3',
                    content: '<strong>Media tiles!</strong><br>If you want to view media, you can click on any of the tiles to open the theatre! If you click on the first tile, it will start playing with Autofap enabled, meaning it will automatically go to the next item once finished playing.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#sideBarTutorial',
                    content: '<strong>Sidebar</strong><br>By clicking on the sidebar, you can view several sections of the website. Your Library contains all your seen, liked, diskliked, favourits, and lists. Bunnyfap’s unique Flix are user generated “movies” and themed collections. And you can view your profile for organisational matters.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-2',
                    content: '<strong>Search</strong><br>You can search for content as well, or show individual categories, tags, and channels.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], // @vuese
            // The data for the theatre tutorial.
            tutorialTheatreSteps: [
                {
                    target: '#theatreStep-0',
                    content: '<strong>The Globe Theatre</strong><br>Welcome to theatre view. Here you can view media elements in all of their glory. It is important to like and dislike content, so that we can show you what you want to see. These can later also be viewed in “My Library”.',
                    params:{
                        position:"top",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-1',
                    content: '<strong>Just. Keep. Hopping.</strong><br>By enabling Autofap, we will automatically show you the next item as soon as this one is done playing. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-2',
                    content: '<strong>Custom lists</strong><br>You can also create lists which contain a collection of images/videos. These will be available in My Library. Lists can be published as a Flix for everyone to see!',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-3',
                    content: '<strong>Tags</strong><br>You can click on tags to see only content from the tag in a new tab. Tags which are in an orange color, have not yet been moderated. Click on the tick if you think this tag suits the content or click the cross if you think the tag does not suit the content.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-4',
                    content: '<strong>Channels</strong><br>Below are the channels where the content originates. You can view more items from this channel by clicking on them. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-5',
                    content: '<strong>Report</strong><br> Lastly, if you feel that something is not right, either the content is missing, or it is wrongly categorised, then you can report this, which would help us a lot!',
                    params:{
                        position:"left",
                        enableScrolling: false
                    }
                }
            ], // @vuese
            // The data for the navigation bar tutorial.
            tutorialNavbarSteps: [
                {
                    target: '#navbarStep-0',
                    content: '<strong>My library</strong><br>Likes and dislikes.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-1',
                    content: '<strong>Flix</strong><br>Autofap',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-2',
                    content: '<strong>Search</strong><br>',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#navbarStep-3',
                    content: '<strong>Profile</strong><br>CLick on a tile to view it in the theatre.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], // @vuese
            // The data for the flix store tutorial.
            tutorialFlixSteps: [
                {
                    target: '#flixStep-0',
                    content: '<strong>What are Flix?</strong><br>Flix are movies created using the content provided on Bunnyfap. There are flix for all different types of content, whether you like big, small, skinny, or heavy. Flix are purchased using “carrots”, which can be freely earned by simply registering and using the platform (there is no need to pay real money). Alternately, you can freely publish your own flix to earn carrots, this way you can buy memberships! ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#flixTutorial0',
                    content: '<strong>All about the stats.</strong><br>These icons show important stats about the flix, namely the duration, the number of media elements, and how often it has been purchased.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#flixStep-2',
                    content: '<strong>Sorting</strong><br>Feel free to sort flix according to your likes.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#flixStep-3',
                    content: '<strong>Purchased and published</strong><br>If you have an account, it will also show which flix you have already purchased, and the flix you have published.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], // @vuese
            // The data for the moderation page tutorial.
            tutorialModerationSteps: [
                {
                    target: '#moderationStep-0',
                    content: '<strong>Moderation: what you need to know</strong><br>You are currently in a very powerful position. You are about to determine if and how content will be shown on Bunnyfap. These items are reported by the community to have something wrong or missing. The suggestions are shown as well. It is your job to decide whether the suggestions are right or wrong. When enough people have moderated it and consensus has been reached, it will be propagated through the website and you will be occasionally rewarded with carrots. You can filter the content shown in moderating using the ‘Filter’ button. This way you don’t have to moderate anything you are not comfortable with seeing. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#moderationStep-1',
                    content: '<strong>Tags</strong><br>Suggested tags are shown in orange-gold. If you agree with these suggestions, click on the tick mark. If you disagree, click on the ‘x’. Similarly, tags which are proposed to be wrong, are shown in red. When you are done with the tags, a second tick mark will appear and it will turn to green. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#moderationStep-2',
                    content: '<strong>Type, Orientation, Art</strong><br>If there is something wrong with the content descriptor, it will show up here with an exclamation mark. If you don’t see this and all the tick marks are green, then you don’t have to change anything here (unless you disagree with the current options).',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#moderationStep-3',
                    content: '<strong>Actions</strong><br>Once you are done moderating, the Save button should be enabled, and you can record your changes. If you accidentally changed something, you can reset the options back to how there were initially. If you don’t know how to moderate this item, you can also skip it.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#moderationStep-4',
                    content: '<strong>Like and dislike</strong><br>Also while moderating you can like and dislike items!',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], // @vuese
            // The continued data for the moderation page tutorial?
            tutorialModerationRestSteps: [
                {
                    target: '#moderationRestStep-0',
                    content: '<strong>New tags</strong><br>If you feel like a tag is missing on Bunnyfap, you can suggest here. Please also include a description, this will increase the likelihood of the tag being accepted.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#moderationRestStep-1',
                    content: '<strong>Existing tags</strong><br>Suggested tags can be upvoted (if you agree) or downvoted (if you disagree).',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#moderationRestStep-2',
                    content: '<strong>Channels</strong><br>Here you can assign how channels should be categorised in terms of their sexual orientation and art style. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], // @vuese
            // Call back functions for the skip and finished buttons for the landing page tutorial.
            tutorialCallbackLanding:{
                    onSkip: this.skipTour,
                    onFinish: this.finishLanding
            }, // @vuese
            // Call back functions for the skip and finished buttons for the flix tutorial.
            tutorialCallbackFlix:{
                    onSkip: this.skipTour,
                    onFinish: this.finishFlix
            }, // @vuese
            // Call back functions for the skip and finished buttons for the moderation page tutorial.
            tutorialCallbackModeration:{
                    onSkip: this.skipTour,
                    onFinish: this.finishModeration
            }, // @vuese
            // Call back functions for the skip and finished buttons for the continued moderation tutorial?
            tutorialCallbackModerationRest:{
                    onSkip: this.skipTour,
                    onFinish: this.finishModerationRest
            }, // @vuese
            // Parameters for the tutorial.
            tutorialOptions:{
                useKeyboardNavigation:false,
                labels:{
                    buttonSkip: 'Skip all tutorials',
                    buttonPrevious: 'Previous',
                    buttonNext: 'Next',
                    buttonStop: 'Finish'
                }
            },
            }
    },
    computed:{
          menuProps() {
                return !this.search_string ? {value: false} : {}
            }
    },
    methods:{
        // @vuese
        // Iterates over all the tours and calls their respective 'finished' api endpoints.
        skipTour(){
            for (let x in this.getUser().tutorial){
                this.finishSingleTutorial(x)
            }
            for (let x in this.$tours){
              this.$tours[x].stop()
            }
            this.$axios.$post('/api/user/tutorial/all', {}, {headers:{Authorization : this.authenticationToken()}})
                // .then((res)=>{console.log("You skipped the tutorial.")})
                .catch((err)=>{console.log(err)})
        },
        // @vuese
        // This function is called when the user finishes a specific tutorial so that it is stored in the vuex store user data. Useful when the user does not login.
        finishSingleTutorial(tutorial){
            this.finishTutorial(tutorial)
            // this.$axios.$post('/api/user/tutorial', {"tutorial":tutorial}, {headers:{Authorization : this.authenticationToken()}})
        },
        // @vuese
        // Is called when the landing page tutorial is finished. 
        finishLanding(){
            this.finishSingleTutorial('landing')
            this.$axios.$post('/api/user/tutorial', {"tutorial":'landing'}, {headers:{Authorization : this.authenticationToken()}})
                // .then((res)=>{console.log("You finished a tutorial!")})
                .catch((err)=>{console.log(err)})
        },
        // @vuese
        // Is called when the flix tutorial is finished. 
        finishFlix(){
            this.finishSingleTutorial('flix')
            this.$axios.$post('/api/user/tutorial', {"tutorial":'flix'}, {headers:{Authorization : this.authenticationToken()}})
                // .then((res)=>{console.log("You finished a tutorial!")})
                .catch((err)=>{console.log(err)})
        },
        // @vuese
        // Is called when the landing moderation tutorial is finished. 
        finishModeration(){
            this.finishSingleTutorial('moderation_main')
            this.$axios.$post('/api/user/tutorial', {"tutorial":'moderation_main'}, {headers:{Authorization : this.authenticationToken()}})
                // .then((res)=>{console.log("You finished a tutorial!")})
                .catch((err)=>{console.log(err)})
        },
        // @vuese
        // Is called when the landing moderation rest tutorial is finished. 
        finishModerationRest(){
            this.finishSingleTutorial('moderation_new_tags')
            this.$axios.$post('/api/user/tutorial', {"tutorial":'moderation_new_tags'}, {headers:{Authorization : this.authenticationToken()}})
                // .then((res)=>{console.log("You finished a tutorial!")})
                .catch((err)=>{console.log(err)})
        },
        // @vuese
        // Is used the truncate the username, so that long usernames do not use of the entirety of the top bar.
        truncate(s){
            if(s){

            let max_ = 15
            if(s.length >= max_)
                return s.substring(0,max_)+"...";
            else
                return s
            } else{
                return "Guest"
            }

        },
        // @vuese
        // Used for testing and debugging.
        log(){
            // console.log("enter")
        },
        // @vuese
        // Used for testing and debugging as well.
        test(){
            this.autoselectMenu=true
        },
        // @vuese
        // Map getters from vuex store.
        ...mapGetters(
                        'auth',['isLoggedIn', 'authenticationToken', 'isGuest','getUser'],
                    ),
        ...mapActions('auth',['setUser', 'finishTutorial']),
        // @vuese
        // Used to push to the homepage.
        homepage(){
            this.$router.push('/');
        },
        // @vuese
        // Logs out the user. 
        logout(){
            this.$axios.$post('/api/auth/logout', null, {headers:{Authorization : this.authenticationToken()}})
            this.$store.commit('auth/logout')
            this.$bus.emit('load_user')
            this.$router.go();

        },
        // @vuese
        // Can be used to nagivate to a different page. 
        redirect(link){
            //this.slider=true
            if(link === '/logout'){
                this.logout()
            } else if(link==='/login'){
                this.login()
            } else if(link==='/signup'){
                this.signup()
            }
            else{
                this.$router.push(link)
            }
        },
        // @vuese
        // Deprecated.
        setSlider(){
            this.slider =true
        },
        // @vuese
        // Called when the user makes a search request. We first determine whether a category was selected, a tag was selected, a channel was selected, or whether the user made a free request. We then redirect accordingly.
        search(search_){
            // [Category, Tag, Channel]
            if(this.search_items[0].items.includes(search_)){
                this.$router.push('/categories/'+search_)
            } else if(this.search_items[1].items.includes(search_)){
                search_ = search_.slice(0, -1);
                this.$router.push('/tags/'+search_)
            } else if(this.search_items[2].items.includes(search_)){
                this.$router.push('/channels/'+search_)
            } else{
                this.$router.push('/search/'+search_)
            }

        },
        // @vuese
        // Whenever the user types something in the search bar, we update the values accordingly.
        update_search_query(search_value){
            this.search_items[3].items[0] = search_value
        },
        // @vuese
        // Deprecated. 
        toggle_nightmode(mode){
            let h = {headers:{Authorization : this.authenticationToken()}}
            // Deprecated
            this.$emit('nightmode', mode)
            if(mode){
                this.color_theme = 'grey darken-4'
                this.side_nav_theme ='grey darken-4'
                this.$axios.$post('/api/user/mode/dark', {}, h)
                    .then((res)=>{
                        // console.log(res)
                    })
                    .catch((err)=>{
                        // console.log(res)
                    })
            } else{
                this.color_theme = 'white'
                this.side_nav_theme = 'white'
                this.$axios.$post('/api/user/mode/light', {}, h)

            }




        },
        // @vuese
        // Clear a single specific notifications.
        dismiss_notification(notification){

            let h = {headers:{Authorization : this.authenticationToken()}}
            let idx = this.notifications.indexOf(notification)
            let id = this.notifications[idx]._id
            this.$axios.$post('/api/fication/notifications/' + id + '/dismiss', {}, h)
                .then((res)=>{
                    // console.log(res)
                    this.notifications.splice(idx,1)
                    if(this.notifications.length === 0){
                        this.notification_menu = false
                    }

                })
        },
        // @vuese
        // Clear all notifications.
        dismiss_all_notifications(){
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/fication/notifications/dismiss', {}, h)
                .then((res)=>{
                    this.notifications = []
                    this.notification_menu = false
                })
        },
        // @vuese
        // Depending on the type of reward for the day, get the appropriate icon.
        get_reward_logo(item){

           if(item==='carrot'){
                return require('assets/images/carrot.png')
            } else if(item==='bronze_egg'){
                return require('assets/images/egg-bronze.png')
            } else if(item==='silver_egg'){
                return require('assets/images/egg-silver.png')
            } else if(item==='gold_egg'){
                return require('assets/images/egg-golden.png')
            }
                return require('assets/images/logo.png')

        },
        // @vuese
        // Sometimes the user spends the carrots on a specific page, in which case we want to update here on the navbar the total amount of carrots. We use the vue bus for this. See `created()`.
        refresh_carrots(){

        let h = {headers:{Authorization : this.authenticationToken()}}
        this.$axios.$get('/api/user', h)
            .then((res)=>{
                this.user = res.user
                this.carrots = res.user.carrots

        })
        },
        // @vuese
        // Set the number of carrots.
        // @arg The new number of carrots.
        update_carrots(arg){
        //   console.log("updating carrots: " + arg)
          this.carrots = arg
        },
        // @vuese
        // Uses the view bus to emit to all components the user data.
        emit_user(){
            this.$bus.emit('user', this.user)
        },
        // @vuese
        // Used to show login box.
        login(){
            this.$bus.emit('loginPrompt')
        },
        // @vuese
        // Used to show the sign up box.
        signup(){
            this.$bus.emit('signupPrompt')
        },
        // @vuese
        // After the user data pulled from the users, we use this function parse it.
        load_user(){
            // console.log("Loading user")
            let h = {headers:{Authorization : this.authenticationToken()}}
            
            this.$axios.$get('/api/user', h)
                .then((res)=>{

                    if(res.success){
                        // console.log(res)
                        this.user = res.user
                        this.setUser(this.user)
                        // console.log(this.getUser())
                        this.emit_user()
                        this.username = res.user.username
                        // console.log(res.user)
                        if(parseInt(res.user.admin)>0){
                            this.admin=true
                        }
                        // let mode = res.user.mode
                        this.night_mode= true
                        /*
                        if(mode==='dark'){
                            this.night_mode = true
                            mode = true
                        } else{
                            this.night_mode = false
                            mode = false
                        }*/
                        //this.toggle_nightmode(mode)
                        this.notifications = res.user.notifications
                        this.carrots = res.user.carrots

                        if(res.user.streak){
                            this.streak = res.user.streak
                        } else{
                            this.streak = 1
                        }

                        // Start tutorial
                        // console.log(this.user)

                        if(!this.user.tos_accepted && !this.isGuest()){
                            this.$bus.emit('tos_popup')
                        }

                        if(this.user.tutorial.landing){
                            // console.log("Route: " + this.$route.name)
                            if(document.documentElement.clientWidth < 960){
                                document.getElementById('landingStep-2').id = 'desktopFilter'
                                document.getElementById('mobileFilter').id = 'landingStep-2'
                                this.tutorialLandingSteps = this.tutorialLandingMobile
                                 this.$tours['landing'].start()

                            } else{
                                this.$tours['landing'].start()
                            }
                            // this.$tours['theatre'].start()
                        }

                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
        }

    },

  created(){
    if(!this.isLoggedIn()){
        // this.$router.push('/login')
    }

    let h = {headers:{Authorization : this.authenticationToken()}}

    if(!this.isGuest()){
        this.$axios.$post('/api/user/activity/visit', {}, h)
        .then((res)=>{
            
            })
        .catch((err)=>{
            console.log(err)
            this.$router.push('/maintenance')
        })
    } else {
        this.tutorialFlixSteps.pop()
    }

    this.load_user()


    this.$axios.$get('/api/tag/existing/search', h)
        .then((res)=>{
            for (let i = 0; i < res.data[1].items.length; i++) {
                res.data[1].items[i] = res.data[1].items[i] + ' '
            }
            this.search_items = res.data
            // console.log("Search items")
            // console.log(this.search_items)
        })
        .catch((err)=>{
            console.log(err)
            this.$router.push('/maintenance')
        })


/*      this.$axios.$get('/api/fication/inventory',h)
          .then((res)=>{
              console.log(res)
          })
          .catch((err)=>{
              console.log(err)
          })
          */
    // this.get_nightmode()
      let self = this
      this.$bus.$on('refresh_carrots', function(arg) {
            self.refresh_carrots()

        })
      this.$bus.$on('update_carrots', this.update_carrots)
      this.$bus.$on('get_user', function(){
          self.emit_user()
      })
      this.$bus.$on('load_user', function(){
          self.load_user()
      })
  }
}
</script>

<style scoped>
#homepage{
    cursor: pointer;
}
.underline-on-hover:hover {
    text-decoration: underline;
    cursor:pointer;
}
.noOpacity:focus::before {
  opacity: 0 !important;
}
</style>
