// frontend/src/App.jsx

import { useAuth } from "./AuthContext";
import Login from "./Login";
import Students from "./Students";

const App = () => {
  const { token, user, logout } = useAuth();

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1>Task5Finale – Student Management</h1>
        <div>
          {token && user && (
            <>
              <span style={{ marginRight: 10 }}>
                Logged in as <strong>{user.username}</strong> ({user.role})
              </span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </header>

      <main>{!token ? <Login /> : <Students />}</main>
    </div>
  );
};

export default App;
