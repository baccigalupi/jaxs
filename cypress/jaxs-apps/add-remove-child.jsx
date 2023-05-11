import { jsx, createApp, bind } from '../../lib/jaxs-1.1.3.js';

const app = createApp();

const viewModel = (state) => {
  return {
    inMembers: state.route && state.route.path &&
      state.route.path.match(/members/)
  }
};

const MembersArea = () => <><h1 class='member-content'>Hello member!</h1><p>Having a good day?</p></>;
const GuestArea = () => <><p class='guest-content'>Oh nothing to see! Move along ...</p></>

const MainContentTemplate = ({ inMembers }) => {
  if (inMembers) {
    return <MembersArea />
  } else {
    return <GuestArea />
  }
};

const ProfileAreaTemplate = ({ inMembers }) => {
  if (inMembers) return;

  return <a href='/members' onClick='navigate' class='exclusive-link'>Go to members area</a>
};

const MainContent = bind(MainContentTemplate, viewModel);
const ProfileArea = bind(ProfileAreaTemplate, viewModel);

app.render(<MainContent />, '#main-content');
app.render(<ProfileArea />, '#profile-area');