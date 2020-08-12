import Vue from 'vue'
import App from './App.vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Chart from 'primevue/chart';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Listbox from 'primevue/listbox';
import SelectButton from 'primevue/selectbutton';

Vue.component('Button', Button)
Vue.component('DataTable', DataTable)
Vue.component('Column', Column)
Vue.component('Chart', Chart)
Vue.component('Card', Card)
Vue.component('Dialog', Dialog)
Vue.component('Textarea', Textarea)
Vue.component('Listbox', Listbox)
Vue.component('SelectButton', SelectButton)

import 'primevue/resources/themes/saga-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

Vue.config.productionTip = false

if (localStorage.getItem("matches") === null) {
  localStorage.setItem("matches", '{"data":[]}')
}

new Vue({
  render: h => h(App),
}).$mount('#app')
