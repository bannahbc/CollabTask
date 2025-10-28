import { showWarning } from "./Alert/SweetAlert";

// src/utils/logout.js
export async function logout(navigate) {
  const isConfirmed = await showWarning(
    'You will be logged out of your account.',
    'logout'
  );

  if (!isConfirmed) return;

  try {
    localStorage.removeItem('token'); // no need to await
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

