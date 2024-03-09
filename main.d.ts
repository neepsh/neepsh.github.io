import { Router } from 'vue-router';
declare global {
    interface Window {
        $router: Router;
        $store: any;
        $message: any;
    }
}
