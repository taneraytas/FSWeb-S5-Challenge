import axios from "axios";

const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //

  const cardDiv = document.createElement("div");
  const headlineDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const imgcontDiv = document.createElement("div");
  const yazarImg = document.createElement("img");
  const yazarSpan = document.createElement("span");
  cardDiv.classList.add("card");
  headlineDiv.setAttribute("class", "headline");
  authorDiv.setAttribute("class", "author");
  imgcontDiv.setAttribute("class", "img-container");
  headlineDiv.textContent = makale.anabaslik;
  yazarImg.src = makale.yazarFoto;
  yazarSpan.textContent = `${makale.yazarAdi} tarafindan`;
  imgcontDiv.appendChild(yazarImg);
  authorDiv.append(imgcontDiv, yazarSpan);
  cardDiv.append(headlineDiv, authorDiv);
  cardDiv.addEventListener("click", (e) => {
    console.log(makale.anabaslik);
  });
  return cardDiv;
};

const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //

  const cardQuery = document.querySelector(secici);

  const makaleler = axios
    .get("http://localhost:5001/api/makaleler")
    .then((res) => {
      console.log(res.data);
      for (let item in res.data.makaleler) {
        for (let i = 0; i < res.data.makaleler[item].length; i++) {
          cardQuery.appendChild(Card(res.data.makaleler[item][i]));
        }
      }
    })
    .catch((err) => {
      console.log("Bir takım hatalar gerçekleşti....");
    });
};
export { Card, cardEkleyici };
