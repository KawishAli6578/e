function errorHandleMessage(err, type) {
  if (err.response && err.response.data) {
    const apiError =
      err?.response?.data?.error?.errors?.error ||
      err?.response?.data?.error?.errors ||
      err?.response?.data?.error ||
      err?.response?.data;
    console.error(apiError, `${type}: API Error`);
    return apiError;
  } else if (err?.request) {
    console.error(err?.message, `${type}: Network Error`);
    return err?.message;
  } else {
    console.error(err, `${type}: General Error`);
    return err;
  }
}

module.exports = {
  errorHandleMessage,
};
