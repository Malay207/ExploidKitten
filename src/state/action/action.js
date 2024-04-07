export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username,
});

export const drawCard = (index) => ({
  type: 'DRAW_CARD',
  payload: index,
});

// Other actions as needed
