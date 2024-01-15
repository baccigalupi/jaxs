import { expect, test, describe, mock } from 'bun:test'

import { State } from '../src/state'
const spy = () => mock(() => {})

describe('State', () => {
  test('creating individual stores makes them available for reading', () => {
    const publish = spy()
    const state = new State(publish)

    state.create('boolean', false)
    state.create('list', [{ id: 1, name: 'Jasper' }, { id: 42, name: 'Jesus' }])
    state.create('record', { username: 'Ahmed', password: 'secret' })
    state.create('count', 0)

    expect(state.boolean.value).toEqual(false)
    expect(state.list.value.length).toEqual(2)
    expect(state.list.value[0]).toEqual({ id: 1, name: 'Jasper' })
    expect(state.record.value.password).toEqual('secret')
    expect(state.count.value).toEqual(0)
  })

  test('when updating a store it change the value', () => {
    const publish = spy()
    const state = new State(publish)

    state.create('boolean', false)

    state.boolean.update(true)

    expect(state.boolean.value).toEqual(true)
  })

  test('when updating a store, it publishes the right event', () => {
    const publish = spy()
    const state = new State(publish)

    state.create('boolean', false)

    state.boolean.update(true)

    expect(publish).toHaveBeenCalledWith('state-change:boolean', true)
  })

  test('when changing multiple attributes in a store, you can delay publishing with a transaction', () => {
    const publish = spy()
    const state = new State(publish)

    state.create('record', { username: 'Ahmed', password: 'secret' })

    state.transaction(({ record }) => {
      record.update({ ...record.value, username: 'Guest' })
      record.update({ ...record.value, password: 'nope' })

      expect(publish).not.toHaveBeenCalled()
    })

    expect(publish).toHaveBeenCalledTimes(1)
    expect(publish.mock.calls[0]).toEqual(
      ['state-change:record', { username: 'Guest', password: 'nope' }]
    )
  })

  test('when changing multiple stores in a transaction, the publishing is delayed', () => {
    const publish = spy()
    const state = new State(publish)

    state.create('addUserForm', {
      username: '',
      email: '',
      usernameValid: null,
      emailValid: null
    })
    state.addUserForm.update({
      username: 'Wendel',
      email: 'wendel.johnson@gmail.com',
      usernameValid: true,
      emailValid: true
    })
    publish.mockClear()

    state.create('userList', [{ id: 23, username: 'Jorge', email: 'jorge@example.com' }])

    state.transaction(({ addUserForm, userList }) => {
      const { username, email } = addUserForm.value
      userList.push({ id: 24, username, email })
      addUserForm.reset()

      expect(publish).not.toHaveBeenCalled()
    })

    expect(publish).toHaveBeenCalledTimes(2)
    expect(publish.mock.calls[0]).toEqual(
      ['state-change:addUserForm', {
        username: '',
        email: '',
        usernameValid: null,
        emailValid: null
      }]
    )
    expect(publish.mock.calls[1]).toEqual(
      ['state-change:userList', [
        { id: 23, username: 'Jorge', email: 'jorge@example.com' },
        { id: 24, username: 'Wendel', email: 'wendel.johnson@gmail.com' }
      ]]
    )
  })
})
