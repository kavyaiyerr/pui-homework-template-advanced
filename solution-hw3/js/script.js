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

//populate glazing dropdown dynamically
const glazingDropdown = document.querySelector('#glazing-dropdown');


//Loop through glazing adaptation array to populate og dropdown
for (let i = 0; i < glazingPriceAdaptations.length; i++) {
    const option = document.createElement('option');
    option.value = glazingPriceAdaptations[i].adjustment; // Use adjustment as the option value
    option.text = glazingPriceAdaptations[i].name; // Use name as the displayed option text
    glazingDropdown.appendChild(option);
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

//populate pack size dropdown dynamically
const packDropdown = document.querySelector('#packsize-dropdown');


//Loop through packsize adaptation array to populate og dropdown
for (let y = 0; y < packPriceAdaptations.length; y++) {
    const option = document.createElement('option');
    option.value = packPriceAdaptations[y].adjustment; // Use adjustment as the option value
    option.text = packPriceAdaptations[y].name; // Use name as the displayed option text
    packDropdown.appendChild(option);
}

let packValue = 1;

//change price based on glazing selection
function glazingChange(element) {
    //get value of selected glazing option
    let priceChange = element.value;
    
    //calculate new price
    let newPrice = ((parseFloat(priceChange) + 2.49)*packValue).toFixed(2);
    console.log(newPrice);

    //update price text based on glazing
    element.parentElement.parentElement.querySelector('.price').innerHTML = '$'+newPrice;

    return newPrice;
}


//change price based on glazing & packsize selection
function packChange(element) {
    //get value of selected pack size option
    packValue = element.value;

    console.log(packValue);

    //calculate price with glazing + pack size
    let updatedPrice = (glazingChange(document.querySelector('#glazing-dropdown'))).toFixed(2);

    //update price text based on glazing & pack size
     document.querySelector('.price').innerHTML = '$'+updatedPrice;

}

