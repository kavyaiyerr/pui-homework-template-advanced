//list of glazing price adaptation objects
const glazingPriceAdaptations = [
    {
        name: "Keep original",
        adjustment: 0.00,

    },

    {
        name: "Sugar milk",
        adjustment: 0.00,

    },

    {
        name: "Vanilla milk",
        adjustment: 0.50,

    },

    {
        name: "Double chocolate",
        adjustment: 1.50,

    },
]

//list of pack size price adaptation objects
const packPriceAdaptations = [
    {
        name: "1",
        adjustment: 1,

    },

    {
        name: "3",
        adjustment: 3,

    },

    {
        name: "6",
        adjustment: 5,

    },

    {
        name: "12",
        adjustment: 10,

    },
]



const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//access roll data from the rolls object using rollType
const rollData = rolls[rollType];


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        let glazingChange;
        for (const glazing of glazingPriceAdaptations) {
            if (glazing.name === rollGlazing) {
                glazingChange = glazing.adjustment;
                break;
            }
        }
        let packChange;
        for (const pack of packPriceAdaptations) {
            if (pack.name === packSize) {
                packChange = pack.adjustment;
                break;
            }
        }

        this.calcPrice = ((parseFloat(basePrice) + parseFloat(glazingChange))*parseFloat(packChange)).toFixed(2);
    }
}

let cart = [];

//create new roll objects
let roll1 = new Roll("Original", "Sugar milk", "1", "2.49");
let roll2 = new Roll("Walnut", "Vanilla milk", "12", "3.49");
let roll3 = new Roll("Raisin", "Sugar milk", "3", "2.99");
let roll4 = new Roll("Apple", "Keep original", "3", "3.49");

//add new roll objects to cart
cart.push(roll1);
cart.push(roll2);
cart.push(roll3);
cart.push(roll4);

//update price of cart
function updateCartPrice() {
    let totalPrice = document.querySelector(".total_price");
    let price = 0;
    if (cart.length === 0) {
        totalPrice.innerHTML = "$0.00";
    }
    else {
        for (let elem of cart) {
            price += parseFloat(elem.calcPrice);
            let finalPrice = "$" + (price.toFixed(2));
            totalPrice.innerHTML = finalPrice;
        }
    }

    console.log(cart);
}

//add the appropriate images + prices etc.
function productInfo(roll) {
    let image = roll.element.querySelector(".item_cart_image");
    image.src = "../../assets/products/" + rolls[roll.type].imageFile;

    let title = roll.element.querySelector(".item_cart_title");
    title.innerHTML = roll.type + " cinnamon roll";

    let glaze = roll.element.querySelector(".item_cart_glazing");
    glaze.innerHTML = "Glazing: " + roll.glazing;

    let packSize = roll.element.querySelector(".item_cart_packsize");
    packSize.innerHTML = "Pack Size: " + roll.size;

    let price = roll.element.querySelector(".item_cart_price");
    price.innerHTML = "$" + roll.calcPrice;

}

//function to modify cart items display
function cartMod(roll) {
    let template = document.querySelector(".cart");
    let templateContent = template.content.cloneNode(true);
  
    //access & manipulate DOM
    roll.element = templateContent.querySelector(".cart_item");
  
    let cartItems = document.querySelector(".cart-display")
    //add to cart
    cartItems.append(roll.element);
    productInfo(roll);
    updateCartPrice();
  
    let remove = roll.element.querySelector(".remove");
    //remove the roll when clicked
    remove.addEventListener("click", function(){
        removeRoll(roll);
    });

}

//removing a roll
function removeRoll(roll) {
    let index = 0;
    for (let elem of cart) {
        if (elem == roll) {
            break
        }
        else {
            index +=1;
        }
    }
    
    roll.element.remove(roll);
    cart.splice(index, 1);
    updateCartPrice();
  }

//call function on cart items
document.addEventListener("DOMContentLoaded", function() {
    for (let elem of cart) {
      cartMod(elem);
    }
  });
