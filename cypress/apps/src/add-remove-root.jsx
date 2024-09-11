import { createApp, jsx, bind } from '../../../lib/jaxs'

const app = createApp()

const If = ({ condition, children }) => {
  if (!condition) return

  return <>{children}</>
}
const Unless = ({ condition, children }) => {
  if (condition) return

  return <>{children}</>
}

export const MainContentTemplate = ({ inMembers }) => {
  return (
    <>
      <Unless condition={inMembers}>
        <form>
          <p class="guest-content">
            You are a guest, and I guess that is fine.
          </p>
          <input type="submit" value="Agree! or something" />
        </form>
      </Unless>
      <If condition={inMembers}>
        <h1 class="member-content">Oh great crickets!</h1>
        <p class="member-content">Sing me a tale of private content.</p>
      </If>
    </>
  )
}
const ProfileAreaTemplate = ({ inMembers }) => {
  return (
    <Unless condition={inMembers}>
      <a href="/members" onClick="go-to-href" class="exclusive-link">
        Go to members area
      </a>
    </Unless>
  )
}

const viewModel = ({ route }) => {
  return {
    inMembers: route && route.path && route.path.match(/members/),
  }
}

const MainContent = bind({
  Template: MainContentTemplate,
  viewModel,
  subscriptions: ['route'],
})

const ProfileArea = bind({
  Template: ProfileAreaTemplate,
  viewModel,
  subscriptions: ['route'],
})

app.render(<MainContent />, '#main-content')
app.render(<ProfileArea />, '#profile-area')
