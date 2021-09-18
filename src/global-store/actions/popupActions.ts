export const displayAlertBar = (dispatch: Function, type: string, message: string) => {
  dispatch({
    type: 'DISPLAY_ALERT',
    payload: { open: true, type, duration: 6000, message },
  });
};
