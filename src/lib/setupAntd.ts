import {
    Layout,
    Row,
    Col,
    Button,
} from 'ant-design-vue'

import { App } from "vue"

export default {
    install: (app: App) => {
        app.use(Layout).use(Row).use(Col).use(Button)
    }
}