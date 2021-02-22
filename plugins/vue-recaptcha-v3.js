import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
 
// For more options see below
Vue.prototype.$recaptcha = Vue.use(VueReCaptcha, { siteKey: '6LcMlK8UAAAAAPGj5JGdf_4wU_kO8kkm7lkIP1Tp' })
