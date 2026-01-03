import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // CSS dosyasını import etmeyi unutma!

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Backend proxy ayarını yaptığımız için direkt /auth/login diyebiliriz
      const response = await axios.post("/auth/login", {
        username: username,
        password: password
      });

      console.log("Giriş Başarılı:", response.data);
      
      // Token kaydetme
      localStorage.setItem("token", response.data.token || JSON.stringify(response.data));

      navigate("/home");

    } catch (err) {
      console.error("Hata:", err);
      // Backend'den gelen özel hata mesajı varsa onu göster, yoksa genel mesaj
      setError("Giriş başarısız! Bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Giriş Yap</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              id="username"
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınız..."
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <button type="submit" className="login-button">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;