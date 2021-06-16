//Sunucudan dönen verilerin diğer tüm fonksiyonlarca erişilebilmesi için global değişken tanımladık.
let sunucudanGelen;

//Sunucuya bağlanmak için bir baglanti nesnesi türettik.
const baglanti = new XMLHttpRequest();

//baglanti nesnesi sunucu bağlantısına hazır olduğunda json dosyasından verileri çekilerek döndürülmesini sağladık.
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
        sunucudanGelen=JSON.parse(baglanti.responseText);
        soruGetir();
    }
    return sunucudanGelen;
};
