export const updateState = (state, obj) => {
  return {
    ...state,
    ...obj
  }
}

export const headers = token => {
  return {
    'Content-Type': "application/json",
    'Authorization': `Bearer ${token}`
  }
}