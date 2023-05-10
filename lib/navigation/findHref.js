export const findHref = (node) => {
  if (!node || !node.getAttribute) return '';

  while (!node.getAttribute('href')) {
    node = node.parentNode;
    if (!node || !node.getAttribute) return '';
  }

  return node.getAttribute('href');
};
