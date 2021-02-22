
import Vue from 'vue'
import { VueShortkey } from 'vue-shortkey'

Vue.use(require('vue-shortkey'), { prevent: ['input', 'textarea'] })