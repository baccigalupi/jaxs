import { bind, createApp, jsx } from '../../dist/jaxs.js'
import { views } from '../../src/views.js'
const { If } = views

const app = createApp()

app.state.create('form', {
  email: '',
  emailValidation: '',
  emailInvalid: false
})

export const onInput = (event, { state }) => {
  const { form } = state
  const { name, value } = event.target
  state.form.update({
    ...form,
    [name]: value
  })
}

export const onFocus = (event, { state }) => {
  const { form } = state
  const { name } = event.target
  state.form.update({
    ...form,
    [`${name}Validation`]: ''
  })
}

export const onBlur = (event, { state }) => {
  const { form } = state
  const { name, value } = event.target

  if (value !== 'kane@example.com') {
    state.form.update({
      ...form,
      [`${name}Validation`]: 'Email unknown'
    })
  }
}

const FormTemplate = ({ email, emailValidation, emailInvalid }) => {
  return (
    <form>
      <div>
        <p>
          <label for='email'>Email</label>
        </p>
        <If condition={emailInvalid}>
          <p class='validation-error'>{emailValidation}</p>
        </If>
        <input
          id='email'
          name='email'
          value={email}
          onInput='onInput'
          onBlur='onBlur'
          onFocus='onFocus'
        />
      </div>

      <input type='submit' value="Let's go!" class='button-primary mt-6' />
    </form>
  )
}

const viewModel = ({ form }) => {
  return {
    ...form,
    emailInvalid: !!form.emailValidation
  }
}

const Form = bind({
  Template: FormTemplate,
  viewModel,
  subscriptions: ['form']
})

app.subscribe('onInput', onInput)
app.subscribe('onFocus', onFocus)
app.subscribe('onBlur', onBlur)

app.render(<Form />, '#app')
