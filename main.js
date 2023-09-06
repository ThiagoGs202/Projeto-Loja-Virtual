// change navbar styles on scroll

window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("window-scroll", window.scrollY > 0);
});

// Habilitar e desabilitar nav menu

const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Função para fechar o menu
function fecharMenu() {
  hamburguer.classList.remove("active");
  navMenu.classList.remove("active");
}

// Adicionar event listener a cada opção do menu
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", fecharMenu);
});

// Obtém o elemento da modal
var modal = document.getElementById("myModal");

// Obtém o elemento de fechar
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar em qualquer lugar fora da modal, fecha a modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Função para abrir a modal
function openModal() {
  modal.style.display = "block";
  const coursePriceElement = document.querySelector(".course_price");
  const coursePriceText = coursePriceElement.textContent;
  const modalPriceElement = document.querySelector(".modal-price");
  modalPriceElement.textContent = coursePriceText;
}

// Função para fechar a modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Função para abrir e fechar sidebar carrinho

function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("show");
}

// Função para fechar a barra lateral do carrinho se estiver aberta

function closeCartIfOpen() {
  const cartSidebar = document.getElementById("cartSidebar");
  if (cartSidebar.classList.contains("show")) {
    toggleCart();
  }
}

// Adicionar evento de clique ao ícone do menu hamburguer
const hamburguerIcon = document.querySelector(".hamburguer");
hamburguerIcon.addEventListener("click", closeCartIfOpen);

// Função para adicionar os itens ao carrinho
const cartItems = []; // Array para armazenar os itens do carrinho

function addToCart() {
  const coursePriceElement = document.querySelector(".course_price");
  const coursePriceText = coursePriceElement.textContent;
  const productPrice = parseFloat(coursePriceText.replace("R$ ", ""));

  // Adicionar item ao carrinho (exemplo: nome do produto, URL da imagem e preço)
  const productName = "Nome do Produto";
  const productImage = "images/course1.jpg";

  function isItemInCart(productName) {
    return cartItems.some((item) => item.name === productName);
  }

  if (isItemInCart(productName)) {
    alert("Item já no carrinho");
    return;
  }

  cartItems.push({
    name: productName,
    image: productImage,
    price: productPrice,
    quantity: 1,
  });

  updateCart(); // Atualizar a exibição do carrinho
  closeModal(); // Fechar a modal após adicionar o item ao carrinho
}

function increaseQuantity(index) {
  cartItems[index].quantity++;
  updateCart();
}

function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    updateCart();
  }
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Limpar a lista do carrinho

  cartList.innerHTML = "";

  // Variável para calcular o preço total

  let total = 0;

  // Adicionar cada item à lista do carrinho

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("cart-item-info");

    // Criar imagem do item

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.classList.add("cart-item-image");
    itemInfo.appendChild(img);

    // Criar nome do item

    const name = document.createElement("span");
    name.textContent = item.name;
    name.classList.add("cart-item-name");
    itemInfo.appendChild(name);

    li.appendChild(itemInfo);

    // Criar botões de quantidade

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("cart-item-quantity");

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.classList.add("btn", "btn-quantity", "btn-decrease");
    decreaseBtn.addEventListener("click", () => decreaseQuantity(index));
    quantityContainer.appendChild(decreaseBtn);

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;
    quantity.classList.add("cart-item-quantity-value");
    quantityContainer.appendChild(quantity);

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.classList.add("btn", "btn-quantity", "btn-increase");
    increaseBtn.addEventListener("click", () => increaseQuantity(index));
    quantityContainer.appendChild(increaseBtn);

    li.appendChild(quantityContainer);

    // Calcular o preço total do item

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Criar botão de remover

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.classList.add("remove-button");
    removeBtn.addEventListener("click", () => removeItem(index));
    li.appendChild(removeBtn);

    cartList.appendChild(li);
  });

  // Verificar se há itens no carrinho antes de exibir o valor total
  if (cartItems.length > 0) {
    // Exibir o valor total do carrinho
    cartTotal.textContent = "Total: R$ " + total.toFixed(2);
    // Exibir o elemento do valor total
    cartTotal.style.display = "block";
  } else {
    // Ocultar o elemento do valor total quando não há itens no carrinho
    cartTotal.style.display = "none";
  }
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdownParent = event.target.parentNode;
  dropdownParent.classList.toggle("open");
}

// Script de modal para adicionar novos produtos

function openAddProductModal() {
  // Limpar os campos da modal
  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
  // Exibir a modal
  const addProductModal = document.getElementById("addProductModal");
  addProductModal.style.display = "flex"; // Alterado para 'flex'
  addProductModal.classList.add("show"); // Adicione a classe 'show' para abrir a modal centralizada
}

function addProduct() {
  // Obter os valores dos campos
  const productName = document.getElementById("productName").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImageInput = document.getElementById("productImage");
  const productImage = productImageInput.files[0]; // Obter o arquivo de imagem

  // Verificar se uma imagem foi selecionada
  if (!productImage) {
    alert("Por favor, selecione uma imagem para o produto.");
    return;
  }

  // Criar o elemento HTML para o novo produto
  const newProduct = document.createElement("article");
  newProduct.classList.add("course");

  // Ler a imagem selecionada e definir como a imagem do produto
  const reader = new FileReader();
  reader.onload = function (e) {
    newProduct.innerHTML = `
      <div class="course_image">
        <img src="${e.target.result}" />
      </div>
      <div class="course_info">
        <h4>${productName}</h4>
        <p>${productDescription}</p>
        <p class="course_price">R$ ${productPrice}</p>
        <button onclick="openModal()" class="btn btn-primary">
          SAIBA MAIS
        </button>
      </div>
    `;

    // Adicionar o novo produto à seção "produtos"
    const container = document.querySelector(".courses_container");
    container.appendChild(newProduct);

    // Fechar a modal
    closeAddProductModal();
  };

  reader.readAsDataURL(productImage); // Lê o arquivo da imagem como uma URL de dados
}

function closeAddProductModal() {
  const addProductModal = document.getElementById("addProductModal");
  addProductModal.style.display = "none";
  addProductModal.classList.remove("show"); // Remova a classe 'show' para fechar a modal
}
