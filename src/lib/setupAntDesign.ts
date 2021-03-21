import {
  Layout,
  Row,
  Col,
  Button,
  Input,
  Alert,
  Menu,
  PageHeader
} from 'ant-design-vue'

import { App } from "vue"

export default {
  install: (app: App) => {
    app.use(Layout).use(Row).use(Col).use(Button).use(Input).use(Alert).use(Menu)
    .use(PageHeader)
  }
}
