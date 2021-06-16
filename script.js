//Sunucudan dönen verilerin diğer tüm fonksiyonlarca erişilebilmesi için global değişken tanımladık.
let sunucudanDonen;

//Sunucuya bağlanmak için bir baglanti nesnesi türettik.
const baglanti = new XMLHttpRequest();

//baglanti nesnesi sunucu bağlantısına hazır olduğunda json dosyasından verileri çekilerek döndürülmesini sağladık.
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        sunucudanDonen=JSON.parse(baglanti.responseText);
        soruGetir();
    }
    return sunucudanDonen;
};
baglanti.open("GET" , "data.json" , true);
baglanti.send();

const sonucAlani = document.getElementsByClassName("soruAlani")[0];
const soru = document.getElementById("soru");
const secenekler = document.getElementsByName(".secenek");
const aciklamaA = document.getElementById("aAciklama");
const aciklamaB = document.getElementById("bAciklama");
const aciklamaC = document.getElementById("cAciklama");
const aciklamaD = document.getElementById("dAciklama");

const gonderButonu=document.getElementById("gonder");

let puan = 0 ;
let sira = 0 ;

function soruGetir(){
    secimiTemizle();
    console.log(sunucudanDonen);

    let siradakiSoru = sunucudanDonen.sorular[sira];

    soru.innerHTML= siradakiSoru.soru;
    aciklamaA.innerText=siradakiSoru.secenekA;
    aciklamaB.innerText=siradakiSoru.secenekB;
    aciklamaC.innerText=siradakiSoru.secenekC;
    aciklamaD.innerText=siradakiSoru.secenekD;

}

function secimiTemizle(){
    secenekler.forEach(secenek=> secenek.checked=false );

}

function secimiAl(){
    let secim;
    secenekler.forEach(secenekler =>{
        if(secenek.checked ==true){
            secim = secenek.id;
        }
    })
    return secim;

}

gonderButonu.addEventListener("click" , ()=> {
    const secilen = secimiAl();

    if(secilen){
        if(secilen === sunucudanDonen.sorular[sira].dogruCevap){
            puan++;
        }
    }
    sira++;

    if(sira < sunucudanDonen.sorular.length){
        soruGetir();
    }
    else {
        sonucAlani.innerHTML= 
        `      <h2>Mevcut sorular içerisinden ${puan}/${sunucudanDonen.sorular.length} oranında başarı sağladınız.</h2>`
        gonderButonu.setAttribute("onclick","location.reload()");
        gonderButonu.innerHTML=("Yeniden Başla");
    }
})

