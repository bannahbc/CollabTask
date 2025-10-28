import Swal from 'sweetalert2';

export const showSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    timer: 2500,
    showConfirmButton: false,
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    timer: 3000,
    showConfirmButton: false,
  });
};

export const showWarning = async (message, message2) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, ${message2}`, // ✅ combine into one string
  });

  return result.isConfirmed;
};
