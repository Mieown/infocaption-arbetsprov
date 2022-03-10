import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue'
import App from './App.vue'

import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

createApp(App).mount('#app')

const app = createApp(App);
app.component('date-picker', Datepicker);

import "bootstrap/dist/js/bootstrap.js";
