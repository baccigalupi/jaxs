import { bind, createApp, jsx } from '../../../lib/jaxs'
const app = createApp()

const If = ({ condition, children }) => {
  if (!condition) return

  return <>{children}</>
}

app.state.create('form', {
  email: '',
  emailValidation: '',
  emailInvalid: false,
})

export const onInput = ({ payload: event, state }) => {
  const form = state.get('form')
  const { name, value } = event.target
  state.store('form').update({
    ...form,
    [name]: value,
  })
}

export const onFocus = ({ payload: event, state }) => {
  const form = state.get('form')
  const { name } = event.target
  state.store('form').update({
    ...form,
    [`${name}Validation`]: '',
  })
}

export const onBlur = ({ payload: event, state }) => {
  const form = state.get('form')
  const { name, value } = event.target

  if (value !== 'kane@example.com') {
    state.store('form').update({
      ...form,
      [`${name}Validation`]: 'Email unknown',
    })
  }
}

const FormTemplate = ({ email, emailValidation, emailInvalid }) => {
  return (
    <form>
      <div>
        <p>
          <label for="email">Email</label>
        </p>
        <If condition={emailInvalid}>
          <p class="validation-error">{emailValidation}</p>
        </If>
        <input
          id="email"
          name="email"
          value={email}
          onInput="onInput"
          onBlur="onBlur"
          onFocus="onFocus"
        />
      </div>

      <input type="submit" value="Let's go!" class="button-primary mt-6" />
    </form>
  )
}

const viewModel = ({ form }) => {
  return {
    ...form,
    emailInvalid: !!form.emailValidation,
  }
}

const Form = bind({
  Template: FormTemplate,
  viewModel,
  subscriptions: ['form'],
})

app.subscribe('onInput', onInput)
app.subscribe('onFocus', onFocus)
app.subscribe('onBlur', onBlur)

app.render(<Form />, '#app')
