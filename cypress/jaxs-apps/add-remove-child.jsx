import { bind, createApp, jsx } from '../../lib/jaxs-dist.js';

const app = createApp();

const RenderIf = ({ isVisible, children }) => {
  if (!isVisible) return;

  return <>{children}</>;
};

const viewModel = (state) => {
  return {
    inMembers: state.route && state.route.path &&
      state.route.path.match(/members/),
  };
};

export const MainContentTemplate = ({ inMembers }) => {
  return (
    <>
      <RenderIf isVisible={!inMembers}>
        <form>
          <p class='guest-content'>
            You are a guest, and I guess that is fine.
          </p>
          <input type='submit' value='Agree! or something' />
        </form>
      </RenderIf>
      <RenderIf isVisible={inMembers}>
        <h1>Oh great crickets!</h1>
        <p>Sing me a tale of private content.</p>
      </RenderIf>
    </>
  );
};

const MainContent = bind(MainContentTemplate, viewModel);

const ProfileAreaTemplate = ({ inMembers }) => {
  if (inMembers) return;

  return (
    <a href='/members' onClick='navigate' class='exclusive-link'>
      Go to members area
    </a>
  );
};

const ProfileArea = bind(ProfileAreaTemplate, viewModel);

app.render(<MainContent />, '#main-content');
app.render(<ProfileArea />, '#profile-area');
