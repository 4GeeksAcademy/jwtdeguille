const backendURL = import.meta.env.VITE_BACKEND_URL;
export const newUser = async (change) => {
  try {
    const response = await fetch(`${backendURL}/register`, {
      method: "POST",
      body: JSON.stringify({ email: change.email, password: change.password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user", error);
  }
};
export const loginUser = async (change, navigate) => {
  try {
    const response = await fetch(`${backendURL}/login`, {
      method: "POST",
      body: JSON.stringify({ email: change.email, password: change.password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const token = data.token;
    sessionStorage.setItem("token", token);
    navigate("/private");
  } catch (error) {
    console.error("Login error", error);
    alert("Login failed");
  }
};
export const protectedRoute = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${backendURL}/protected`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error accessing to your protected route", error);
  }
};
