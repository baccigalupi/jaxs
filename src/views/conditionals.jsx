import jsx from '../jsx'

export const If = ({ condition, children }) => {
  if (!condition) return
  return <>{children}</>
}

export const Unless = ({ condition, children }) => {
  if (condition) return
  return <>{children}</>
}

export const IfElse = ({ condition, children }) => {
  const [first, ...rest] = children

  if (condition) return <>{first}</>
  return <>{rest}</>
}
