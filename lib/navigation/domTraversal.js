// export const findTag = (tagName, node) => {
//   tagName = tagName.toUpperCase();
//   while (node.tagName !== tagName) {
//     node = node.parentNode;
//   }
//   return node;
// };

// export const findHref = (node) => {
//   if (!node || !node.getAttribute) return '';

//   while (!node.getAttribute('href')) {
//     node = node.parentNode;
//     if (!node || !node.getAttribute) return '';
//   }

//   return node.getAttribute('href');
// };
