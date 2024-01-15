import { RecordStore } from '../state/stores'

export const createRouteState = (state) => {
  const store = new RecordStore({
    name: 'route',
    value: {
      host: '',
      path: '',
      query: ''
    },
    parent: state
  })

  state.add(store)
}
