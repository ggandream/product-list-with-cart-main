fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const placeholder = document.querySelector(".product-grid");

    console.log(data);

    let out = "";

    for (let element of data) {
      console.log(element.image.desktop);

      out += `
          <article class="product-card">
            <div class="product-card-img-container">
              <picture>
              <source srcset="${element.image.desktop}" media="(width >= 1201px)" />
              <source srcset="${element.image.tablet}" media="(width >= 768px)" />
              <img class="product-card-img"
                src="${element.image.mobile}"
                alt="${element.name}"
              />
              </picture>
              <button class="product-card-add-to-cart" type="button" title="Add to Cart" item="${element.name}" >
                <span><img src="assets/images/icon-add-to-cart.svg" /></span>Add
                to Cart
              </button>
              <div class="product-card-added hidden"  item="${element.name}">
                <button><img src="assets/images/icon-decrement-quantity.svg" /></button>
                <span>1</span>
                <button><img src="assets/images/icon-increment-quantity.svg" /></button>
              </div>
            </div>
            <header>
              <span>${element.category}</span>
              <h3>${element.name}</h3>
            </header>
            <span class="product-card-price">$${Number.parseFloat(element.price).toFixed(2)}</span>
          </article>
      `;
    }

    placeholder.innerHTML = out;

    const addToCartBtns = document.querySelectorAll(
      ".product-card-add-to-cart",
    );

    console.log(addToCartBtns);
    // 1. Crear una variable carrito
    // 2. Determinar de donde obtener el item a partir del nombre.
    // 3. Recuperar el item y guardarlo en la variable carrito con quantity 1.

    let cart = {};
    const cartList = document.querySelector(".cart-list");
    const cartEmpty = document.querySelector(".cart-empty");
    const addedToCartBtns = document.querySelectorAll(".product-card-added");
    let cartItem = "";

    addToCartBtns.forEach(function (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        const item = data.find(
          (itemData) => itemData.name === addToCartBtn.getAttribute("item"),
        );

        addToCartBtn.classList.add("hidden");

        console.log([...addedToCartBtns]);

        // const addedToCartBtn = [...addedToCartBtns].find(
        //   (addedToCartBtnItem) =>
        //     item.name === addedToCartBtnItem.getAttribute("item"),
        // );

        const addedToCartBtn = addToCartBtn.nextElementSibling;

        addedToCartBtn.classList.remove("hidden");

        addToCartBtn.classList.add("hidden");

        cart[item.name] = {
          qty: 1,
          price: item.price,
          image: item.image.thumbnail,
        };

        cartEmpty.classList.add("hidden");

        cartItem = `
          <div class="cart-list-item">
            <div class="item-info">
              <p class="item-name">${item.name}</p>
              <div>
                <span class="quantity">1x</span>
                <span class="unit-price">@ $${Number.parseFloat(item.price).toFixed(2)}</span>
                <span class="subtotal">$${Number.parseFloat(item.price).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              title="Remove ${item.name}"
              class="remove-item"
              aria-label="Remove ${item.name}"
            >
              <img src="./assets/images/icon-remove-item.svg" />
            </button>
          </div>`;

        cartList.insertAdjacentHTML("beforeend", cartItem);

        console.log(cart);
      });
    });
  });
