import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT : ", decoded);
    return {
      name: decoded.name || "Unknown",
      email: decoded.email,
      roleNames: decoded.roleNames, // 그대로 반환
      adress: decoded.adress || "",
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export default useAuth;
