import { TextValue } from "../types";

export const isText = <T>(child: TextValue | T) => {
  return typeof child === 'string' || typeof child === 'number';
};

// const textNode = (content: TextValue) => {
//   return new TextTemplate(content);
// };