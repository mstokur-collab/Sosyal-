# Sosyal Bilgiler Bilgi Yarışması

## Proje Özeti
Bu proje, ortaokul öğrencileri için hazırlanmış kapsamlı bir Sosyal Bilgiler bilgi yarışması uygulamasıdır. Çoktan seçmeli, boşluk doldurma ve eşleştirme olmak üzere üç farklı soru türünü destekler. Öğretmenler için gelişmiş bir yönetim paneli bulunur ve yarışma hem bireysel hem de grup modlarını destekler.

## Başlangıç
- `soru.html` dosyasını modern bir tarayıcıda açarak oyunu başlatabilirsiniz.
- Ana menüde oyuncu adı seçimi, sınıf ve konu seçimi, zorluk ve oyun türü adımlarını takip ederek yarışmayı başlatın.

## Öğretmen Paneli Özellikleri
- **Tekil soru ekleme:** Çoktan seçmeli, boşluk doldurma ve eşleştirme soruları için ayrıntılı form alanları.
- **Toplu soru içe aktarma:** JSON formatında soruları doğrulama, ön izleme ve ekleme.
- **Soru yönetimi:** Var olan soruları filtreleme, düzenleme ve silme.
- **İstatistikler:** Soru dağılımlarını ve toplam soru sayısını takip etme.

## Program Geliştiricisi
Uygulamanın geliştiricisi arayüzde de belirtildiği üzere **MUSTAFA OKUR**'dur.

## Testleri Çalıştırma
Projede yer alan doğrulama mantığı Jest kullanılarak test edilmiştir. Testleri çalıştırmak için:

```bash
npm install
npm test
```

## Proje Yapısı
- `soru.html`: Uygulamanın tamamını içeren HTML, CSS ve JavaScript kodu.
- `__tests__/`: Jest ile yazılmış birim testlerini içerir.
- `package.json`: Bağımlılık ve test yapılandırmalarını barındırır.
