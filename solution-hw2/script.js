function Roll(type, price, glazing, size) {
    this.type = type;
    this.price = price;
    this.glazing = glazing;
    this.packSize = size;
};

//list of original roll object (name + price)
let allRolls = [
    {
      type: 'original',
      basePrice: 2.49,
      id: 100,
    },
    {
        type: 'apple',
        basePrice: 3.49,
        id: 200.
    },
    {
        type: 'raisin',
        basePrice: 2.99,
        id: 300,
    },
    {
        type: 'walnut',
        basePrice: 3.49,
        id: 400,
    },
    {
        type: 'chocolate',
        basePrice: 3.99,
        id: 500,
    },
    {
        type: 'strawberry',
        basePrice: 3.99,
        id: 600,
    },
  ];


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

//populate dropdowns dynamically
const dropdowns = document.querySelectorAll('select');

//loop through all the dropdowns
for (let j = 0; j < dropdowns.length; j++) {
    //Loop through glazing adaptation array to populate og dropdown
    for (let i = 0; i < glazingPriceAdaptations.length; i++) {
        const option = document.createElement('option');
        option.value = glazingPriceAdaptations[i].adjustment; // Use adjustment as the option value
        option.text = glazingPriceAdaptations[i].name; // Use name as the displayed option text
        dropdowns[j].appendChild(option);
        }
}


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

const radioButtonsContainers = document.querySelectorAll('.radio-buttons');
//loop through all the radio button containers
for (let x = 0; x < radioButtonsContainers.length; x++) {
    //Loop through glazing adaptation array to populate og dropdown
    for (let y = 0; y < packPriceAdaptations.length; y++) {
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'pack-button-'+x; // Set the same name for all radio buttons in the group
        radioButton.id = `pack-${allRolls[x].id + y}`; //Create a unique id
        radioButton.value = packPriceAdaptations[y].adjustment; // Set the adjustment as the value
        const label = document.createElement('label');
        label.htmlFor = `pack-${allRolls[x].id + y}`;
        label.textContent = packPriceAdaptations[y].name; // Set the name as the label text

        //first pack button is default checked 
        if(y===0) {
            radioButton.checked = 'checked';
        }
      
        radioButtonsContainers[x].appendChild(radioButton);
        radioButtonsContainers[x].appendChild(label);
        radioButtonsContainers[x].appendChild(document.createElement('br'));
        }
}


//global variable for updated price
let newPrice;
//global variable for roll name
let currRoll;
//global variable for chosen glazing
let choseGlazing;
//global variable for chosen packsize
let chosePackSize;

//change price based on glazing selection
function glazingChange(element) {
    //get value of selected glazing option
    const priceChange = element.value;

    //store glazing option
    choseGlazing = element.text;
    console.log(element.text);
    console.log(choseGlazing);
    
    //find parent (roll type)
    const selectedRoll = element.parentElement.parentElement.id;

    //store current Roll
    currRoll = element.parentElement.parentElement.querySelector('h2').innerHTML;


    //find base price
    let basePrice;
    for (let i = 0; i < allRolls.length; i++) {
        if (selectedRoll == allRolls[i].type) {
            basePrice = allRolls[i].basePrice
        }
    }
    
    //calculate new price
    newPrice = parseFloat(priceChange) + parseFloat(basePrice);

    //update price text based on glazing
    element.parentElement.parentElement.querySelector('.price').innerHTML = newPrice;

    return newPrice;
}

//change price based on glazing & packsize selection
function priceChange(element) {
    //get value of selected pack size option
    const buttons = element.parentElement.parentElement.querySelector('.radio-buttons').querySelectorAll('input');
    let packButtonValue;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
           packButtonValue = buttons[i].value;
        }
    }

    //calculate price with glazing + pack size
    const updatedPrice = (glazingChange(element.parentElement.parentElement.querySelector('select'))*parseInt(packButtonValue)).toFixed(2);
    
    //update price text based on glazing & pack size
     element.parentElement.parentElement.querySelector('.price').innerHTML = updatedPrice;

     newPrice = updatedPrice;

     return newPrice;
}

//Array to store cart items
let cartItemsList = [];

//Add selected roll to cart (check which add to cart it is)
function addToCart(element) {
   const top_roll_parent = element.parentElement.parentElement.parentElement
    
   //name of roll
    currRoll = (top_roll_parent.querySelector('h2').innerHTML);
    
    //updated price based on changes
    newPrice = parseFloat(top_roll_parent.querySelector('.price').innerHTML.trim().substring(1));
    
    //selected glazing label text
    choseGlazing = top_roll_parent.querySelector('select').selectedOptions[0].text;
    
    //loop through buttons to figure out which one is checked
    const buttons = top_roll_parent.querySelector('.radio-buttons').querySelectorAll('input');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].checked) {
           packButtonValue = buttons[i].value;
        }
    }
    
    //store selected pack size
    if (packButtonValue == 1) {
        chosePackSize = 1;
    }
    else if (packButtonValue == 3) {
        chosePackSize = 3;
    }
    else if (packButtonValue == 5) {
        chosePackSize = 6;
    }
    else {
        chosePackSize = 12;
    }

    //create object for roll to be added to cart
    let cartItem = new Roll(currRoll, newPrice, choseGlazing, chosePackSize);

    console.log(cartItem);

    //add roll to cart item array
    cartItemsList.push(cartItem);

    //grab popup
    var popup = document.getElementById("myPopup");

    //create text to be displayed in pop up
    for (let i = 0; i < cartItemsList.length; i++) {
        //create a div to contain one roll
        var roll = document.createElement('div');
        document.getElementById("cartItemsDisplay").appendChild(roll);
        
        //add roll name text
        var rollName = document.createElement('p');
        var rollText = document.createTextNode(cartItemsList[i].type);
        rollName.appendChild(rollText);
        rollName.classList.add("cartTitle");
        roll.appendChild(rollName);

        //add glazing text
        var glazingName = document.createElement('p');
        var glazingText = document.createTextNode(cartItemsList[i].glazing);
        glazingName.appendChild(glazingText);
        roll.appendChild(glazingName);

        //add pack size text
        var packSize = document.createElement('p');
        var packSizeText = document.createTextNode('Pack of ' + cartItemsList[i].packSize);
        packSize.appendChild(packSizeText);
        roll.appendChild(packSize);

        //add price
        var price = document.createElement('p');
        var priceText = document.createTextNode('Price: $' + cartItemsList[i].price);
        price.appendChild(priceText);
        roll.appendChild(price);
    }

    popup.classList.toggle("show");

    //update text underneath cart label
    document.getElementById("cartitems").innerHTML = cartItemsList.length + " items"

    let totalPrice = 0.00;

    for (let j = 0; j < cartItemsList.length; j++) {
        totalPrice += cartItemsList[j].price;
    }

    document.getElementById("carttotal").innerHTML = '$'+totalPrice.toFixed(2);

    
    // Remove the popup after 3 seconds
    setTimeout(() => {
        popup.classList.toggle("show");
    }, 3000);


}
