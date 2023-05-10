import jsx from '../jsx.js';

export const Link = ({ children, ...props }) => {
  return <a {...props} onClick='navigate'>{children}</a>;
};
