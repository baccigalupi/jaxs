import { store } from '../../lib/jaxs'
const { createReducer, composeReducers } = store

const initialState = 0

const incrementer =  createReducer('incrementCounter')
  .transform((state) => (state || initialState) + 1)

const decrementer =  createReducer('decrementCounter')
  .transform((state) => (state || initialState) - 1)

export default composeReducers([incrementer, decrementer])
  .initialState(initialState)
  