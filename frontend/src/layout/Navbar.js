import "./layout.css";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <nav className="nav">
      <h2>Quiz App</h2>
      {localStorage.getItem("token") && (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}
