import { createApp } from 'vue';
import '@/assets/base.less';
import '@/assets/iconfont.css'; // 引入阿里云图标
import '@/assets/global.less'; // 引入全局css
import App from './App.vue';
import { setup } from './setup';

const app = createApp(App);
setup(app);

app.mount('#app');
