import swal from 'sweetalert';

export const errorMessage = {
  fetch: {
    title: 'Connection error!',
    text: 'Server not responding...',
  },
  auth: {
    email: {
      title: 'Access denied',
      text: 'Wrong login',
    },
    password: {
      title: 'Access denied',
      text: 'Wrong password',
    },
  },
  unknown: {
    title: 'Something went wrong',
    text: 'Unknown error...',
  },
  server: {
    title: 'Something went wrong',
    text: 'Internal server error',
  },
  maxLocations: {
    title: 'Could not add :(',
    text: 'Maximum locations exceeded',
  },
  locationExist: {
    title: 'Location has already been added',
    text: 'Please choose another one',
  },
  cities: {
    title: 'Something went wrong',
    text: 'Could not load city list',
  },
};

export const showErrorAlert = (message: { title: string; text: string }) => {
  return swal({
    icon: 'error',
    buttons: {
      confirm: {
        text: 'OK',
        value: true,
        visible: true,
        className: 'btn btn-danger',
        closeModal: true,
      },
    },
    ...message,
  });
};

export const showWarningAlert = (message: { title: string; text: string }) => {
  return swal({
    icon: 'warning',
    buttons: {
      confirm: {
        text: 'OK',
        value: true,
        visible: true,
        className: 'btn btn-warning',
        closeModal: true,
      },
    },
    ...message,
  });
};
