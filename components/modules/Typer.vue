<template>
    <div>
        <!-- <v-layout row wrap> -->
            <v-flex xs12 text-xs-center>
                <vue-typer
                :text='taglines'
                :repeat='Infinity'
                :shuffle='true'
                initial-action='typing'
                :pre-type-delay='70'
                :type-delay='70'
                :pre-erase-delay='4000'
                :erase-delay='50'
                erase-style='backspace'
                :erase-on-complete='false'
                caret-animation='smooth'
                :class="font"
                ></vue-typer>
                <!-- class="test" -->
                <!-- class="headline font-weight-thin" -->
            </v-flex>
        <!-- </v-layout> -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
/**
 * @vuese
 * Deprecated. Was used to shoy users a loading text when recommondations were loading.
 * @group modules
 */
export default {
    props:['color'],
    data(){
        return{
            taglines:['At least hop your heart out', 'Just. Keep. Hopping.', 'Hop like you\'ve never hopped before',
            'Hop hard or don\'t hop at all', 'Hop hop hop', 'Sit back and keep going', "Pro tip: click on the first tile to BunnyFap!",
            "So.. let's talk about these bunnies...", "How do you like dem bunnies?", "So two bunnies walk into a bar...", "You're here?! Quick, hide the pizza!",
            "'You're still far from being a Hopmeister... keep hopping...'", "Well, I guess we all know why you are here..", "Well, this is taking longer than expected I guess...",
            "So now what? Did you already hear the joke about the bunny?", "Bunnies here... bunnies there... bunnies everywhere!", "You're here?! 'Quick! Pretend like we're working!'",
            "Pro tip: every new user gets three new sign up keys!", "Pretending to be using some sophisticated AI...", "I am so tired of waiting...", "Where dem bunnies at??",
            "These hopsters nowadays... not what it used to be..", "What's the deal with all these bunnies?", "They are probably pretending to be using AI...",
            "Well well well... about time you showed up..", "Pro tip: join our Discord server to stay up to date!", "Let's get ready to bunnyfap!", "Life is like a box of carrots",
            "I think its about time we had the talk...", "'I'll be back.. with more bunnies' (I hope)", "Yippee ki-yay, motherbunny!", "Hasta la vista, bunnylove!", 
            "My name is Maximus Decimus Meridius, commander of the bunnies", "It was the bunny, which killed the beast", "Pro tip: Have any suggestions for quotes? Let us know on Discord!",
            "At least you're gonna be getting a workout", "Mirror mirror on the wall..", "'Just when I thought I was out, they pull me back in'", "Wax on, wax off",
            "It's alive! It's alive! The BunnyStein (Mwahahaha)", "'Go ahead, make my day'", "And so the hoppification begins...", "Let's see where this leads us..",
            "How deep does the rabbithole go?", "'A mouse? Where we're going we don't need that.'", "I definitely did not steal those bunnies..."],
            color:'white',
            font:{headline:true,'font-weight-thin':true,dark:true}
        }
    },
    created(){
        // let h = {headers:{Authorization : this.authenticationToken()}}
        // this.$axios.$get('/api/user/mode', h)
        // .then((res)=>{
        //     if(res.success){
        //         let mode = res.mode
        //         this.night_mode= mode
        //             this.color = 'white'
        //             this.font.dark = true
        //     }
        // })
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),

    }
}
</script>

<style scoped>
.vue-typer .right{
    float: initial !important;

}

.vue-typer .left{
    float: initial !important;

}

.dark.vue-typer .custom.char.typed {
  color: white;
  
}
.dark.vue-typer .custom.char.selected {
  color: black;
  background-color:white;

}

.dark.vue-typer .custom.caret.typing {
  background-color:white;
}

.dark.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: white;
}

.dark.vue-typer .custom.caret {
  /* width: 10px; */
  background-color: white;
}
/* .dark.vue-typer .custom.caret {
  display: none;
} */
</style>
