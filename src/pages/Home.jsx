import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import UploadModal from "../components/UploadModal";
import logoImg from "../assets/loblobi-logo.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sayfa açılınca çalışır
  useEffect(() => {
    // Token var mı kontrol et (Güvenlik)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Token yoksa giriş sayfasına şutla
    } else {
      // Şimdilik sahte bir kullanıcı adı gösterelim
      setUser({ username: "Kullanıcı" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* Üst Menü (Navbar) */}
      <nav className="navbar">
        <div 
            className="logo-container"
            onClick={() => navigate("/home")}
        >
            <img className="logo-img" src={logoImg} alt="Loblobi Logo" />
            <h1 className="logo-text">Loblobi <span className="logo-icon">▶</span></h1>
        </div>
        <div className="nav-right">
          <span className="welcome-text">Hoş geldin, <strong>{user?.username}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
        </div>
      </nav>

      {/* Ana İçerik */}
      <main className="main-content">
        
        {/* Video Yükleme Alanı */}
        <div className="action-area">
        <button 
            className="upload-btn-animated"
            onClick={() => setIsModalOpen(true)}
        >
            <span className="btn-text">+ Video Yükle</span>
            <span className="btn-icon">🚀</span>
        </button>
            <p className="info-text">Videolarınızı yükleyin ve bombofellerle paylaşın.</p>
        </div>

        <h3 className="section-title">Son Videolar</h3>
        <div className="video-grid">
            <div className="video-card">
                <div className="video-thumbnail"></div>
                <div className="video-info">
                    <h4>Örnek Video 1</h4>
                    <p>Henüz video yok...</p>
                </div>
            </div>
            
             <div className="video-card">
                <div className="video-thumbnail"></div>
                <div className="video-info">
                    <h4>Örnek Video 2</h4>
                    <p>Çok yakında...</p>
                </div>
            </div>
        </div>

      </main>
        {isModalOpen && (
            <UploadModal onClose={() => setIsModalOpen(false)} />
        )}    
    </div>
  );
};

export default Home;