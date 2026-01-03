import { useState } from "react";
import "../App.css"; // Stillerimizi buradan çekeceğiz

const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  
  // Dosya seçilince çalışır
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if(!file) return alert("Lütfen bir dosya seçin!");
    
    console.log("Yükleme işlemi başlatılıyor...", file.name);
    // Backend işlemleri buraya gelecek (Sonra yapacağız)
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Yeni Video Yükle</h3>
          <button onClick={onClose} className="close-btn">✖</button>
        </div>

        <div className="modal-body">
          {/* Dosya Seçme Alanı */}
          <div className="file-drop-zone">
            <input 
              type="file" 
              accept="video/*" 
              onChange={handleFileChange} 
              id="file-upload" 
              hidden 
            />
            <label htmlFor="file-upload" className="file-label">
              {file ? (
                <div className="file-selected">
                   <span>🎬 {file.name}</span>
                   <span className="change-text">(Değiştir)</span>
                </div>
              ) : (
                <>
                  <span className="icon">☁️</span>
                  <span>Video dosyasını buraya sürükle veya seç</span>
                </>
              )}
            </label>
          </div>

          {/* Başlık Alanı */}
          <div className="input-group">
            <label>Video Başlığı</label>
            <input 
              type="text" 
              placeholder="Örn: Mülayim sahaya sıçıyor" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="login-input" // App.css'teki stili kullandık
            />
          </div>

          <button onClick={handleUpload} className="upload-confirm-btn">
            Yüklemeyi Başlat 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;