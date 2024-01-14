import { bind, createApp, jsx } from '../../dist/jaxs.js';

const app = createApp();

export const onInput = (event, { setState }) => {
  const { name, value } = event.target;
  setState((state) => {
    return {
      ...state,
      [name]: value,
    };
  });
};

export const onFocus = (event, { setState }) => {
  console.log('onFocus');
  const { name } = event.target;
  setState((state) => {
    return {
      ...state,
      [`${name}Validation`]: '',
    };
  });
};

export const onBlur = (event, { setState }) => {
  console.log('onBlur');

  const { name, value } = event.target;

  if (value !== 'kane@example.com') {
    setState((state) => {
      return {
        ...state,
        [`${name}Validation`]: 'Email unknown',
      };
    });
  }
};

const RenderIf = ({ isVisible, children }) => {
  if (!isVisible) return;

  return <>{children}</>;
};

const FormTemplate = ({ email, emailValidation, emailInvalid }) => {
  return (
    <form>
      <div>
        <p>
          <label for='email'>Email</label>
        </p>
        <RenderIf isVisible={emailInvalid}>
          <p class='validation-error'>{emailValidation}</p>
        </RenderIf>
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
  );
};

const viewModel = (state) => {
  return {
    ...state,
    emailInvalid: !!state.emailValidation,
  };
};

const Form = bind(FormTemplate, viewModel);

app.subscribe('onInput', onInput);
app.subscribe('onFocus', onFocus);
app.subscribe('onBlur', onBlur);
app.render(<Form />, '#app');
