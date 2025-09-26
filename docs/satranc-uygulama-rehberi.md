# Sıfırdan Satranç Öğreten Masaüstü Uygulaması Geliştirme Rehberi

## 1. Proje Vizyonu ve Hedef Kitle
- **Amaç:** Satranç bilmeyen veya temel bilgileri tazelemek isteyen kişilere, adım adım ilerleyen etkileşimli derslerle satranç öğretmek.
- **Hedef Kitle:** 8 yaş ve üzeri çocuklar, yetişkin başlangıç seviyesindeki oyuncular ve öğretmenler.
- **Çıktılar:** Açıklamalı ders modülleri, pratik egzersizler, minik sınavlar, ilerleme takibi.

## 2. Temel Özellikler
1. **Öğrenme Modülleri**
   - Satranç tahtası tanıtımı, taşların hareketleri, özel kurallar (rok, en passant, terfi) gibi konuları kapsayan aşamalı dersler.
   - Ders sonunda kısa etkileşimli testler veya "sürükle-bırak" egzersizleri.
2. **Etkileşimli Tahta ve Simülasyon**
   - Kullanıcılar öğrendiklerini hemen tahtada uygulayabilir.
   - İpuçları ve geri bildirimlerle yanlış hamlelerin açıklanması.
3. **Oyun Senaryoları ve Bulmacalar**
   - Mat etme bulmacaları, taktik alıştırmalar ve açılış örnekleri.
4. **İlerleme Takibi ve Profil**
   - Kullanıcının tamamladığı dersler, skorlar, başarı rozetleri.
   - Öğretmen veya ebeveynler için raporlama seçenekleri.
5. **Çevrimdışı Erişim**
   - Derslerin ve tahtanın temel fonksiyonlarının internet bağlantısı olmadan da çalışması.
6. **Çoklu Dil ve Erişilebilirlik**
   - Türkçe, İngilizce ve diğer diller.
   - Ekran okuyucu desteği, renk körlüğü temaları.

## 3. Kullanıcı Arayüzü Tasarımı
### 3.1 Bilgi Mimarisi
- **Ana Gösterge Paneli:** Dersler, alıştırmalar, profil ve ayarlara hızlı erişim.
- **Modül Sayfası:** Ders videosu/anlatımı, interaktif tahta, çalışma kağıtları.
- **Egzersiz Ekranı:** Tam ekran tahta, yönergeler, ipucu butonu, geri al/yeniden başlat.
- **Profil Ekranı:** İlerleme grafikleri, rozetler, tavsiyeler.

### 3.2 Görsel Tasarım İlkeleri
- Eğitimde rahatlatıcı renk paleti (ör. yumuşak mavi/yeşil tonlar).
- Büyük ve anlaşılır tipografi, satranç temalı ikonografi.
- Komponent kütüphanesi: Kartlar, sekmeler, modal pencereler, adım adım sihirbaz.

### 3.3 Kullanılabilirlik ve Erişilebilirlik
- Navigasyonu kolaylaştıran ekmek kırıntıları ve ilerleme çubuğu.
- Klavye kısayolları (tahta hamleleri için ok tuşları, yardım için F1).
- WCAG 2.1 AA uyumu: Kontrast, metin alternatifleri, odak görünürlüğü.

## 4. Teknoloji Seçimi
### 4.1 Uygulama İskeleti
- **Electron** veya **Tauri**: Tek kod tabanıyla Windows, macOS, Linux dağıtımı.
- Çapraz platform desteği için web teknolojileri (React veya Vue) ile arayüz.

### 4.2 Ön Yüz
- **React + TypeScript:** Bileşen tabanlı yapı, güçlü tip kontrolü.
- **State Yönetimi:** Zustand veya Redux Toolkit.
- **UI Kütüphanesi:** Chakra UI / Material UI ile hızlandırılmış tasarım.
- **SVG/Satranç Tahtası:** Chessboard.js veya React-chessboard ile interaktif tahta.

### 4.3 Arka Plan ve Mantık
- **Satranç Motoru/Doğrulama:** Chess.js ile hamle doğrulama, özel kurallar.
- **Veri Depolama:** SQLite (electron-store üzerinden) veya Tauri için `tauri-plugin-sql`.
- **Ders İçeriği Yönetimi:** Markdown tabanlı içerik veya JSON tanımları.
- **Analitik:** Öğrenme analitiği için yerel raporlama, isteğe bağlı bulut eşitleme.

### 4.4 Test ve Kalite
- **Unit Testler:** Jest + React Testing Library.
- **E2E Testleri:** Playwright veya Spectron.
- **Sürekli Entegrasyon:** GitHub Actions ile lint/test paketleri.

## 5. Eğitim Metodolojisi
1. **Mikro Öğrenme Yaklaşımı**
   - Her ders 10-15 dakikayı geçmez.
   - Teori + uygulama + mini sınav döngüsü.
2. **Spiral Öğrenme Modeli**
   - Temel kavramlara sık sık geri dönerek pekiştirme.
   - Bir önceki dersin bilgisini gerektiren yeni görevler.
3. **Oyunlaştırma**
   - Puanlar, rozetler, günlük hedefler.
   - "Strateji haftası" gibi tematik etkinlikler.
4. **Anında Geri Bildirim**
   - Hatalı hamlelerde görsel/sesli uyarı ve açıklama.
   - Başarılarla motive edici mesajlar.
5. **Metabilişsel Destek**
   - Ders sonlarında "Ne öğrendim?" not alanı.
   - İlerleme analizi ve tekrar önerileri.

## 6. Proje Planlaması
1. **Analiz ve Araştırma (2-3 Hafta)**
   - Kullanıcı ve uzman görüşmeleri.
   - Eğitim içeriklerinin kurgu ve pedagojik doğrulaması.
2. **Tasarım (3-4 Hafta)**
   - Wireframe, prototip, kullanıcı testleri.
   - Stil rehberi, komponent kütüphanesi.
3. **Geliştirme (8-10 Hafta)**
   - Modül modül geliştirme, tahta entegrasyonu, içerik yönetimi.
   - Test otomasyonu ve performans optimizasyonu.
4. **Beta ve Kullanıcı Testleri (2-3 Hafta)**
   - Pilot kullanıcı grupları, geri bildirim toplama.
   - Hataların giderilmesi ve içerik düzenlemeleri.
5. **Yayın ve Bakım**
   - Kurulum paketlerinin hazırlanması (Windows .exe, macOS .dmg, Linux AppImage).
   - Kullanıcı destek kanalları, düzenli içerik güncellemeleri.

## 7. İçerik Üretimi ve Pedagojik Süreç
- Satranç eğitmenleri ile içerik doğrulama.
- Ders materyallerinin video, görsel ve interaktif formatlarda hazırlanması.
- Öğrenme hedefleri, kazanımlar ve değerlendirme rubriklerinin netleştirilmesi.

## 8. Güvenlik ve Veri Koruma
- Yerel veriler için şifreleme (AES-256) ve isteğe bağlı parola koruması.
- Gizlilik politikası, veri saklama süresi, kullanıcı onayları.

## 9. Yayınlama ve Pazarlama
- Beta süreci sonrası referans toplama.
- Satranç kulüpleri, okullar ve ebeveyn topluluklarıyla iletişim.
- Eğitim blogları, YouTube kanalı ve sosyal medya üzerinden tanıtım.

## 10. Gelecek Geliştirme Fikirleri
- Yapay zekâ destekli koç: Hamle önerileri ve açıklamaları.
- Online maç modu ve arkadaşlarla beraber çalışma.
- Mobil platformlara (React Native) genişleme.

Bu rehber, öğretici bir masaüstü satranç uygulamasını planlamak ve geliştirmek isteyen ekipler için kapsamlı bir başlangıç noktası sunar.
