import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createSonner } from "vue-sonner";

const app = createApp(App);
app.use(createSonner());
app.mount("#app");
