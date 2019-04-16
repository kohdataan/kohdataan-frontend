/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
function transformFromSet(incoming) {
  const state = { ...incoming }

  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      if (state[key] instanceof Set) {
        state[key] = Array.from([...state[key]])
      }
    }
  }

  return state
}

function transformToSet(incoming) {
  const state = { ...incoming }

  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      state[key] = new Set(state[key])
    }
  }

  return state
}

export default function transformSet(
  incoming,
  setTransforms,
  toStorage = true
) {
  const state = { ...incoming }

  const transformer = toStorage ? transformFromSet : transformToSet

  for (const key in state) {
    if (state.hasOwnProperty(key) && setTransforms.includes(key)) {
      state[key] = transformer(state[key])
    }
  }

  return state
}
