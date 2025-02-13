// src/lib/dekodeToken.js
export const decodeToken = (token) => {
      try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                  atob(base64)
                        .split("")
                        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                        .join("")
            );
            return JSON.parse(jsonPayload);
      } catch (error) {
            throw new Error("Error decoding token.");
      }
};

export const getUserIdFromToken = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
            const decodedToken = decodeToken(token);
            return decodedToken.sub;
      }
      return null;
};
