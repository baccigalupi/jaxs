export const normalizeToArray = <T>(children: T | T[]): T[] => {
  if (Array.isArray(children)) {
    return children.flat() as T[];
  }

  if (!children) {
    return [];
  }

  return [children];
};