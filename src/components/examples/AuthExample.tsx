import React, { useEffect } from "react";
import { useAuth } from "@/stores/hooks/useAuth";

export const AuthExample: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    userEmail,
    userName,
    userSubscription,
    login,
    register,
    logout,
    checkAuth,
    clearAuthError,
  } = useAuth();

  // Kiểm tra token khi component mount
  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      await login({
        email: "user@example.com",
        password: "password123",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        email: "newuser@example.com",
        password: "password123",
        name: "New User",
        website: "example.com",
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Auth Status</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          Error: {error}
          <button onClick={clearAuthError} style={{ marginLeft: "10px" }}>
            Clear Error
          </button>
        </div>
      )}

      {isAuthenticated ? (
        <div>
          <h3>Welcome, {userName}!</h3>
          <p>Email: {userEmail}</p>
          <p>Role: {user?.role}</p>

          {userSubscription && (
            <div>
              <h4>Subscription Info:</h4>
              <p>Plan: {userSubscription.plan.name}</p>
              <p>Status: {userSubscription.status}</p>
              {userSubscription.expiresAt && (
                <p>
                  Expires:{" "}
                  {new Date(userSubscription.expiresAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>Please Login or Register</h3>
          <button onClick={handleLogin} style={{ marginRight: "10px" }}>
            Test Login
          </button>
          <button onClick={handleRegister}>Test Register</button>
        </div>
      )}
    </div>
  );
};

export default AuthExample;
