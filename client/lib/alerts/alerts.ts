import swal from "sweetalert";

export const errorMessage = {
  fetch: {
    title: "Connection error!",
    text: "Server not responding...",
  },
  auth: {
    title: "Access denied",
    text: "Wrong auth data",
  },
  maxLocations: {
    title: "Could not add :(",
    text: "Maximum locations exceeded",
  },
  locationExist: {
    title: "Location has already been added",
    text: "Please choose another one",
  },
};

export const showErrorAlert = (message: { title: string; text: string }) => {
  return swal({
    icon: "error",
    buttons: {
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        className: "btn btn-danger",
        closeModal: true,
      },
    },
    ...message,
  });
};

export const showWarningAlert = (message: { title: string; text: string }) => {
  return swal({
    icon: "warning",
    buttons: {
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        className: "btn btn-warning",
        closeModal: true,
      },
    },
    ...message,
  });
};
