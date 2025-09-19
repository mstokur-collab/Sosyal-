# Sosyal Bilgiler Bilgi Yarışması

## Proje Özeti
Bu proje, ortaokul öğrencileri için hazırlanmış kapsamlı bir Sosyal Bilgiler bilgi yarışması uygulamasıdır. Çoktan seçmeli, boşluk doldurma ve eşleştirme olmak üzere üç farklı soru türünü destekler. Öğretmenler için gelişmiş bir yönetim paneli bulunur ve yarışma hem bireysel hem de grup modlarını destekler.

## Başlangıç
- `soru.html` dosyasını modern bir tarayıcıda açarak oyunu başlatabilirsiniz.
- Ana menüde oyuncu adı seçimi, sınıf ve konu seçimi, zorluk ve oyun türü adımlarını takip ederek yarışmayı başlatın.

## Oyun Özellikleri
- Her oyun oturumu üç farklı joker içerir: %50, soruyu geç ve süre uzatma. "⏰ +15 sn" jokeri oyun içindeki zamanlayıcıya 15 saniye ekler.
- Kapsamlı geribildirimler ve animasyonlar oyuncuların doğru/yanlış cevapları kolayca ayırt etmesini sağlar.
- Yüksek skor listesi ve ses/tema ayarları gibi kalite artırıcı özellikler bulunur.

## Öğretmen Paneli Özellikleri
- **Tekil soru ekleme:** Çoktan seçmeli, boşluk doldurma ve eşleştirme soruları için ayrıntılı form alanları.
- **Toplu soru içe aktarma:** JSON formatında soruları doğrulama, ön izleme ve ekleme.
- **Soru yönetimi:** Var olan soruları filtreleme, düzenleme ve silme.
- **İstatistikler:** Soru dağılımlarını ve toplam soru sayısını takip etme.

### Desteklenen Soru Türleri
- **Çoktan seçmeli (`quiz`):** En az iki seçenek ve seçenekler arasında yer alan doğru cevap gerektirir.
- **Boşluk doldurma (`fill-in`):** "___" yer tutucusunu barındıran bir cümle, doğru cevap ve en az bir çeldirici ister.
- **Eşleştirme (`matching`):** En az üç terim-açıklama çifti ile birlikte her çift için her iki alanın da doldurulması gerekir.

Öğretmen panelindeki sekme geçişleri, her butondan gelen `event` nesnesi kullanılarak yönetilir. Paneli programatik olarak kontrol etmek için `teacherPanelModule.switchTab` fonksiyonuna `currentTarget` özelliğini barındıran sentetik bir nesne geçirilebilir.

## Hazırlayan
Uygulamanın geliştiricisi arayüzde de belirtildiği üzere **MUSTAFA OKUR**'dur.

## Testleri Çalıştırma
Projede yer alan doğrulama mantığı Jest kullanılarak test edilmiştir. Jest senaryoları çoktan seçmeli, boşluk doldurma ve eşleştirme soru tipleri için farklı doğrulama kurallarını güvence altına alır. Testleri çalıştırmak için:

```bash
npm install
npm test
```

## Proje Yapısı
- `soru.html`: Uygulamanın tamamını içeren HTML, CSS ve JavaScript kodu.
- `__tests__/`: Jest ile yazılmış birim testlerini içerir.
- `package.json`: Bağımlılık ve test yapılandırmalarını barındırır.
