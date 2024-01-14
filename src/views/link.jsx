import jsx from '../jsx'

export const Link = ({ children, ...props }) => {
  return <a {...props} onClick='goToHref'>{children}</a>
}
