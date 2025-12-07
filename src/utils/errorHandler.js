export const handleError = (error) => {
  let message = "Something went wrong.";
  let type = "error";


  if (error.code) {
    switch (error.code) {
      case "auth/user-not-found":
        message = "User not found.";
        break;
      case "auth/wrong-password":
        message = "Invalid password.";
        break;
      case "auth/email-already-in-use":
        message = "Email already in use.";
        break;
      case "auth/invalid-email":
        message = "Invalid email address.";
        break;
      case "auth/too-many-requests":
        message = "Too many requests. Try again later.";
        break;
      default:
        message = error.message || "Firebase error occurred.";
        break;
    }
  }

  else if (error.response) {
   
    const status = error.response.status;
    if (error.response.data?.message) {
      message = error.response.data.message;
    } else {
     
      switch (status) {
        case 400:
          message = "Bad request.";
          break;
        case 401:
          message = "Unauthorized. Please login.";
          break;
        case 403:
          message = "Forbidden.";
          break;
        case 404:
          message = "Resource not found.";
          break;
        case 500:
          message = "Internal server error.";
          break;
        default:
          message = `Error ${status}`;
      }
    }
  }

  else if (error.request) {
    message = "Network error. Please check your connection.";
  }

  else if (error.message) {
    message = error.message;
  }

  return { message, type };
};