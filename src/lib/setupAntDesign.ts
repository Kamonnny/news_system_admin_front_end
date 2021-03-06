import {
  Layout,
  Row,
  Col,
  Button,
  Input,
  Alert,
  Menu,
  PageHeader,
  Dropdown,
  Table,
  Space,
  Spin,
  Select,
  Popconfirm,
  Modal,
  Form,
} from 'ant-design-vue'

import { App } from "vue"

export default {
  install: (app: App) => {
    app.use(Layout).use(Row).use(Col).use(Button).use(Input).use(Alert).use(Menu)
      .use(PageHeader).use(Dropdown).use(Table).use(Spin).use(Popconfirm)
      .use(Modal).use(Form).use(Space).use(Select)
  }
}
