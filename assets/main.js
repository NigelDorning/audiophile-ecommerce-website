const cartTrigger = document.querySelector('.cart-trigger');
const cartSidebar = document.querySelector('.cart-sidebar');

// cartSidebar.showModal();

cartTrigger.addEventListener('click', () => {
    cartSidebar.showModal();
});

/**
 * Increase/Decrease the quantity of items in the cart
 * 
 * 1. Get item qty DOM element
 * 2. Loop through all instances of item qty DOM element
 * 3. Whenever the increase/decrease buttons are clicked then
 *    update the value of the quantity input
 * 4. After updating the quantity then use the Shopify ajax
 *    api to update pricing.
 */

const itemQty = document.querySelectorAll('.cart-sidebar__item-qty');

itemQty.forEach(el => {

  let decreaseQtyBtn = el.querySelector('.cart-sidebar__decrease-qty');
  let increaseQtyBtn = el.querySelector('.cart-sidebar__increase-qty');
  let qtyInput = el.querySelector('.cart-sidebar__qty-input');
  let productId = el.dataset.itemId;

  decreaseQtyBtn.addEventListener('click', () => {
    if (qtyInput.value > 0) {
      qtyInput.value--;
      changeCart(productId, qtyInput.value);
    } else {
      removeCartProduct(5);
    }
  });

  increaseQtyBtn.addEventListener('click', () => {
    qtyInput.value++;
  });

});

function changeCart(productId, qty) {
  fetch(window.Shopify.routes.root + 'cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      id: productId,
      quantity: qty
    }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

function removeCartProduct(productId) {
  console.log(productId);
}



