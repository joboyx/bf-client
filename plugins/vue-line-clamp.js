import Vue       from 'vue'
import lineClamp from 'vue-line-clamp'

Vue.use(lineClamp, {
  // plugin options
  textOverflow:"clip"
})