import Vue from 'vue'
var VueTouch = require('vue-touch')
VueTouch.registerCustomEvent('doubletap', {
    type: 'tap',
    taps: 2
  })

// VueTouch.registerCustomEvent('swipee', {
//   type: 'swipe',
//   swipes: 1
// })

VueTouch.config.swipe = {
  direction: 'horizontal'
}

Vue.use(VueTouch, {name: 'v-touch'})