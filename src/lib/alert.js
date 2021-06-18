import Swal from "sweetalert2";

//Swal for error notif
export const Error = (text) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
};

//Swal for warning notif
export const Warning = (text) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning",
    text: text,
  });
};

//Swal for success notif
export const Success = (text) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: text,
  });
};

//Swal for warning notif
export const Info = (text) => {
  return Swal.fire({
    icon: "info",
    title: "Info",
    text: text,
  });
};
