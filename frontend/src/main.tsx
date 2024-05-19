import React from "react";

const HomePage: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  return (
    <div>
      {isAuthenticated ? (
        <h2>Home Page</h2>
      ) : (
        <h2>You are not authenticated. Please log in.</h2>
      )}
    </div>
  );
};

export default HomePage;
