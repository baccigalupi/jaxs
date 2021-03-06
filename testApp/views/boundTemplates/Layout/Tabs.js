import { bind } from '../../../../lib/jaxs'
import {
  TabBar,
  TabNavItem as Template
} from '../../templates/Layout/Tabs'

const viewModel = (state) => {
  return {
    currentPath: state.app.location.path 
  }
}

const TabNavItem = bind(Template, viewModel)

export {
  TabBar,
  TabNavItem
}
