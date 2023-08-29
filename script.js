const products = {
  electronics: [
    { name: "Телефон", price: 500, info: "опис" },
    { name: "Ноутбук", price: 1000, info: "опис" },
  ],
  clothing: [
    { name: "Футболка", price: 20, info: "опис" },
    { name: "Джинси", price: 50, info: "опис" },
  ],
};

function showCategories() {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  const productInfoContainer = document.querySelector(".product-info");
  productInfoContainer.style.display = "none";
}

function showCategory(category) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  products[category].forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.textContent = `${product.name} - ${product.price} грн.`;
    productElement.addEventListener("click", () => showProductInfo(product));
    productsContainer.appendChild(productElement);
  });

  const productInfoContainer = document.querySelector(".product-info");
  productInfoContainer.style.display = "none";
}

function showProductInfo(product) {
  const productInfoContainer = document.querySelector(".product-info");
  productInfoContainer.style.display = "block";
  productInfoContainer.innerHTML = "";

  const productInfo = document.createElement("div");
  productInfo.innerHTML = `
    <h2>${product.name}</h2>
    <p>Ціна: ${product.price}грн.</p>
    <p>Опис: ${product.info}</p>
    <button onclick="offer('${product.name}')">Оформити замовлення</button>
  `;
  productInfoContainer.appendChild(productInfo);
}

// function buyProduct(productName) {
//   // alert(`Ви купили ${productName}!`);
//   // showCategories();
// }
const modalWindow = document.getElementById("container-modal");
function offer() {
  modalWindow.style.opacity = 1;
  modalWindow.style.pointerEvents = "auto";
}

const userName = document.getElementById("user-name");
const city = document.getElementById("city");
const post = document.getElementById("post");
const cashInputs = document.querySelectorAll("input[name='cash']");
const countProduction = document.getElementById("count");
const comments = document.getElementById("comments");

document.querySelector("#form").addEventListener("submit", function (event) {
  event.preventDefault(); // Зупиняємо відправку форми

  // Отримуємо значення вибору оплати
  let selectedCash = null;
  for (let i = 0; i < cashInputs.length; i++) {
    if (cashInputs[i].checked) {
      selectedCash = cashInputs[i].value;
      break;
    }
  }

  let cash = ""
  // Перевіряємо, чи вибрана оплата на картку
  if (selectedCash === "card") {
    cash = "Ви вибрали оплату на картку";
  } else {
    cash = "Ви вибрали післяоплату";
  }

  const selectedCity = city.options[city.selectedIndex].text;

  // Отримуємо інформацію про вибраний товар (якщо він вибраний)
  const productInfoContainer = document.querySelector(".product-info");
  if (productInfoContainer.style.display === "block") {
    const productName = productInfoContainer.querySelector("h2").textContent;
    const productPrice = productInfoContainer.querySelector("p").textContent;
  
  
  modalWindow.style.opacity = 0;
  modalWindow.style.pointerEvents = "none";
  
  let thnxBycomment = "" 
  if(comments.value === ""){
    thnxBycomment = "Шкода що ви не додали коментар"
  }else{
    thnxBycomment = `Дякуэмо за коментар!`
  }

  alert(`ПІБ: ${userName.value}
Назва товару: ${productName}
Кількість: ${countProduction.value}
${productPrice} за 1 одиницю
Місто: ${selectedCity}
Відділення нової пошти: ${post.value}
Оплата: ${cash}
${thnxBycomment}`)
  }
  showCategories();
});

// TODO: Якщо прибрати з html тегів required
// document.querySelector("form").addEventListener("submit", (e) => {
//   if(!userName || !city || !post || !countProduction || (!cash[0].checked && !cash[1].checked)){
//     e.preventDefault()
//     alert("Будь ласка, заповніть всі обов\'язкові поля.")
//   }
// })
