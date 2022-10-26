import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style/index.less";
import "element-plus/dist/index.css";
import { ElLoading } from "element-plus";
import web3 from "web3";
console.log(web3);

createApp(App).use(router).use(ElLoading).mount("#app");
