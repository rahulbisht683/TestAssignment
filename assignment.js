// Define the pricing rules
const pricingRules = {
  op10: {
    price: 849.99,
  },
  op11: {
    price: 949.99,
    bulkDiscount: {
      quantity: 4,
      discountedPrice: 899.99,
    },
  },
  buds: {
    price: 129.99,
    deal: {
      quantity: 3,
      priceForQuantity: 2,
    },
  },
  wtch: {
    price: 229.99,
  },
};

// Define the Checkout function
function Checkout(pricingRules) {
  const cart = {};

  // Scan an item and add it to the cart
  this.scan = function (item) {
    if (pricingRules[item]) {
      cart[item] = cart[item] ? cart[item] + 1 : 1;
      // console.log(cart)
    }
  };

  // Calculate the total price
  this.total = function () {
    let totalPrice = 0;

    // Iterate over the items in the cart
    for (const item in cart) {
      const quantity = cart[item];
      const itemPrice = pricingRules[item].price;

      // Apply bulk discount if applicable
      if (
        pricingRules[item].bulkDiscount &&
        quantity > pricingRules[item].bulkDiscount.quantity
      ) {
        const discountedPrice = pricingRules[item].bulkDiscount.discountedPrice;
        totalPrice += discountedPrice * quantity;
      } else {
        // Apply deal if applicable
        if (
          pricingRules[item].deal &&
          quantity >= pricingRules[item].deal.quantity
        ) {
          const dealQuantity = pricingRules[item].deal.quantity;
          const priceForQuantity = pricingRules[item].deal.priceForQuantity;

          const numDeals = Math.floor(quantity / dealQuantity);
          const remainingItems = quantity % dealQuantity;

          totalPrice += priceForQuantity * pricingRules[item].price;
          totalPrice += remainingItems * itemPrice;
        } else {
          totalPrice += itemPrice * quantity;
        }
      }
    }

    return totalPrice;
  };
}

// Usage example
const co = new Checkout(pricingRules);

co.scan("op11");
co.scan("op11");
co.scan("op11");
co.scan("op11");
co.scan("op11");
co.scan("buds");
co.scan("buds");

co.scan("wtch");

console.log(co.total());
