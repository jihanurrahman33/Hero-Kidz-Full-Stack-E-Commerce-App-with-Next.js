"use client";

import Swal from "sweetalert2";

const useAlert = () => {
  const showSuccess = (title, text = "") => {
    return Swal.fire({
      icon: "success",
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const showError = (title, text = "") => {
    return Swal.fire({
      icon: "error",
      title,
      text,
    });
  };

  const showToast = (title, icon = "success") => {
    return Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1000,
      toast: true,
    });
  };

  const confirmAction = async (
    title = "Are you sure?",
    text = "You won't be able to revert this!",
    confirmButtonText = "Yes, do it!"
  ) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    });
    return result.isConfirmed;
  };

  return {
    showSuccess,
    showError,
    showToast,
    confirmAction,
  };
};

export default useAlert;
