<template>
    <div>
        <v-container xs10 v-if="!loading">

            <v-layout row wrap justify-center class="text-xs-center"><span class="display-3 text-xs-center">Time to Publish</span></v-layout>

<v-layout row wrap justify-center class="text-xs-center"><p>By publishing your list, you will create a flick which will be available to the world. This is very easy to do; we will guide you through the process. Just fill in the fields below and you'll be ready to go!</p></v-layout>

        <v-layout row wrap justify-center class="text-xs-left">
            <v-flex xs12>
            <v-form dark ref="form"
      v-model="valid"
      lazy-validation>

            <v-layout>
                <span class="display-1 font-weight-light">Title</span>
            </v-layout>
            <v-layout>
                <p>Give your Flick a name! The title should be at least 1 character and can be at most 75 characters.</p>

            </v-layout>

<v-layout>

                <v-text-field
                color="#B29126"
                    v-model="flick_name"
                    :counter="75"
                    :rules="nameRules"
                    label="Title"
                    required
                    box
                    outline
                    flat
                ></v-text-field>
</v-layout>

            <v-layout class="mt-5">
                <span class="display-1 font-weight-light">Description</span>
            </v-layout>
            <v-layout>
                <p>Give your Flick a brief description, so that people will know what they can expect. The description can be at most 500 characters.</p>

            </v-layout>

                <v-textarea
                name="input-7-1"
                label="Description"
                v-model="description"
                hint="Description"
                color="#B29126"
                required
                :counter="500"
                :rules="descriptionRules"
                box
                outline

                ></v-textarea>
            <v-layout class="mt-5">
                <span class="display-1 font-weight-light">Tags</span>
            </v-layout>
            <v-layout>
                <p>Let's add some tags, so that we can better index your Flick and people will be able to find it quicker! There is a limit of 20 tags.</p>

            </v-layout>
                <v-combobox
                color="#B29126"
                v-model="select"
                :items="items"
                label="Please select tags related to your flick."
                multiple
                chips
                clearable
                deletable-chips
                counter
                :search-input.sync="search"
                
                @input="add_tag"
                ></v-combobox>
            
            <v-layout class="mt-5">
                <span class="display-1 font-weight-light">Orientation</span>
            </v-layout>
            <v-layout>
                <p>Let's set the orientation, just to avoid any confusion!</p>

            </v-layout>
            
                <v-radio-group v-model="orientation" required mandatory>
                <v-radio color="#B29126"
                    label="Straight"
                    value="straight"
                ></v-radio>
                <v-radio color="#B29126"
                    label="Solo Woman"
                    value="solo-woman"
                ></v-radio>
                <v-radio color="#B29126"
                    label="Lesbian"
                    value="lesbian"
                ></v-radio>
                <v-radio color="#B29126"
                    label="Gay"
                    value="gay"
                ></v-radio>
                <v-radio color="#B29126"
                    label="Solo Man"
                    value="solo-man"
                ></v-radio>
                <v-radio color="#B29126"
                    label="Trans"
                    value="trans"
                ></v-radio>
                </v-radio-group>

            <v-layout class="mt-5">
                <span class="display-1 font-weight-light">Art style</span>
            </v-layout>
            <v-layout>
                <p>And Let's make sure people get what they are looking for. </p>

            </v-layout>
                <v-radio-group v-model="art" required mandatory :rules="[v => !!v || 'You must agree to continue!']">
                <v-radio color="#B29126"
                    label="Real-life"
                    value="real-life"
                ></v-radio>
                <v-radio color="#B29126"
                    label="Hentai"
                    value="comic"
                ></v-radio>
                <v-radio color="#B29126"
                    label="3D"
                    value="three-d"
                ></v-radio>
                </v-radio-group>

            <v-layout class="mt-5">
                <span class="display-1 font-weight-light">Price</span>
            </v-layout>
            <v-layout>
                <p>Decide how much people have to pay to buy your Flick. The price has to be at least 1 carrot, and can be at most 50,000 carrots! </p>

            </v-layout>
                <v-flex shrink style="width: 60px">
    <v-text-field
            v-model="price"
            class="mt-0"
            single-line
            :rules="priceRules"
            type="number"
            width="70px"
            @change='check_carrots'
          ></v-text-field>
</v-flex>

            <v-layout class="mt-5">
                <span class="display-1 font-weight-light">Ready, set, go!</span>
            </v-layout>
            <v-layout>
                <p>Now that we are all done, you just have to agree with the terms and conditions. In here we set some ground rules and explain what happens if you delete your Flick. Once you agree, you are ready to publish your Flick and start earning carrots! </p>

            </v-layout>

    <v-checkbox v-model="checkbox" required 
        :rules="[v => !!v || 'You must agree to continue!']"
        color="#B29126" 
        >
      <template v-slot:label>
        <div>
          I agree with the 
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href="/privacy/FlixTerms"
                @click.stop
                v-on="on"
              >
                Terms and Conditions</a>
            </template>
            Opens in new window
          </v-tooltip>
            .
        </div>
      </template>

    </v-checkbox>

            
                <v-btn
                    :disabled="!valid || publish_loading"
                    color="#B29126"
                    @click="publish"
                    :loading="publish_loading"
                >
                    Publish!
                </v-btn>
            </v-form>
            </v-flex>
        </v-layout>

        <video src="" muted id="duration_id" preload="metadata" v-show="false"></video>
        <!-- <v-btn @click="calculate_duration(0)" outline>calculate duration</v-btn>
        {{duration}} -->
        <!-- <li v-for="item in data">
            {{item}}
        </li> -->

        </v-container>
        <v-layout justify-center v-else class="mt-5 mb-5">
            <v-progress-circular
            :size="70"
            :width="7"
            color="#B29126"
            indeterminate
            ></v-progress-circular>
        </v-layout>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

/**
 * @vuese
 * Allows the user to publish a custom list as a flick.
 * @group Content
 */
export default {
    props:['flick_id'],
    data(){
        return {
            // @vuese
            // Whether the data is still being fetched from the server or not.
            loading:true,
            // @vuese
            // The name the user gives this flick.
            flick_name: 'My New Flick',
            // @vuese
            // The description this user gives the flick.
            description: "My awesome Flick!",
            // @vuese
            // Whether the input fields are valid according to the form rules.
            valid: false,
            // @vuese
            // The list of all possible tags.
            select: [],
            // @vuese
            // The user selected tags.
            items: [],
            // @vuese
            // The user selected orientation.
            orientation:'straight',
            // @vuese
            // The user selected art style.
            art:'real-life',
            // @vuese
            // The title naming form rules.
            nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 75) || 'Name must be less than 75 characters'
            ],
            // @vuese
            // The description form rules.
            descriptionRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 500) || 'Description must be less than 200 characters'
            ],
            // @vuese
            // The price the flick will be sold at. 
            price:1,
            // @vuese
            // The pricing rules of the form.
            priceRules:[
                v => !!v || 'You must enter a price.',
                v => (v > 0 && v <= 50000) || 'The price has to be more than 0 and less than 50,000.',
            ],
            // @vuese
            // The search string for the tags.
            search:"",
            // @vuese
            // The flick data.
            data:[],
            // @vuese
            // The duration of the flick.
            duration: 0,
            // @vuese
            // Is true if the user hit publish and when we are calculating the flick duration.
            publish_loading:false

        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest']),
    // @vuese
    // Adds a tag to the flick.
    add_tag(tag){
        tag = tag[tag.length-1]
        if(!this.items.includes(tag)){
            this.select.splice(this.select.indexOf(tag),1)
        }
        this.search = ''
    },
    // @vuese
    // Called when the user hits the publish button. Will then calculate the duration of the flick.
    publish(){
        if(!this.isGuest()){
            if (this.$refs.form.validate()){
                this.publish_loading = true
                this.calculate_duration(0)
            }
        } else{
            this.$bus.emit('signupPrompt')
        }
    },
    // @vuese
    // Will iterate over all resources, and add up the duration of each resource. If an item resource does not have a duration, which is the case of a webm which has not be pre-determined, it will load that webm and retrieve the metadata for it.
    calculate_duration(count){

        let self = this
        if(count===0){
            this.duration = 0
        }
        if(count === this.data.length){
            this.validate()
            this.publish_loading = true
            return true
        }else if (this.data[count].type != 'web_video'){
            this.duration+=this.data[count].duration
            this.calculate_duration(count+=1)
        } else{
            if(this.data[count].start!=-1){
                // this.data[count].duration = this.data[count].end - this.data[count].start
                this.duration+=this.data[count].end - this.data[count].start
                this.calculate_duration(count+1)
            }else{
                let vid = document.getElementById('duration_id')
                vid.src = this.data[count].url
                vid.onerror = function(){
                    // console.log("Error")
                    self.duration += 1
                    self.calculate_duration(count+1)
                }
                vid.onloadedmetadata = function() {
                    // console.log(vid.duration)
                    self.duration += vid.duration
                    // vid.parentNode.removeChild(vid);
                    vid.src = ""
                    // console.log("Video loaded")
                    self.calculate_duration(count+1)
                };
            }
            
        }
    },
    // @vuese
    // Makes sure that the form data is in accordance with the form rules. If all is fine, send to the server and publish.
    validate () {
      if (this.$refs.form.validate()) {
        //   console.log("Duration: " + this.duration)
        let h = {headers:{Authorization : this.authenticationToken()}}
        let body = {
            title:this.flick_name,
            description:this.description,
            art : this.art,
            orientation : this.orientation,
            price : Math.round(this.price),
            tags : this.select,
            duration : this.duration

        }
        // console.log(body)
        this.$axios.$post('/api/flix/publish/'+this.$route.params.flick, body,h)
            .then((res)=>{
                // console.log(res)
                this.$router.push('/flix/published');
            })
            .catch((err)=>{
                console.log(err)
            })
      }else{
          this.publish_loading = false
      }
    },
    // @vuese
    // Make sure the number of carrots is a natural number. 
    check_carrots(c){
        this.price = Math.round(this.price)
    }
    },
    created(){
       let h = {headers:{Authorization : this.authenticationToken()}}
        
        this.$axios.$get('/api/tag/existing/clean/', h)
            .then((res)=>{
                this.items = res.tags
            })
            .catch((err)=>{
                console.log(err)
            })
        
        this.$axios.$post('/api/flix/metadata/'+this.$route.params.flick,{},h)
            .then((res)=>{
                // console.log(res)
                this.flick_name = res.title
                if(res.published_title){
                    this.flick_name = res.published_title
                    this.description = res.description
                    this.art = res.art
                    this.orientation = res.orientation
                    this.price = res.price
                    this.select = res.tags
                }else{
                    ;
                }

                this.loading = false

            })



       this.$axios.$post('/api/flix/edit/'+this.$route.params.flick, {}, h)
            .then((res)=>{
                this.data = res.data.resources
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    watch: {
      select (val) {
        if (val.length > 20) {
          this.$nextTick(() => this.select.pop())
        }
      }
    }
}
</script>

<style scoped>

</style>