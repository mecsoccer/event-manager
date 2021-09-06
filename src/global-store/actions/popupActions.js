export const displayAlertBar = (dispatch, type, message) => {
  dispatch({
    type: 'DISPLAY_ALERT',
    payload: { open: true, type, duration: 6000, message },
  });
};
