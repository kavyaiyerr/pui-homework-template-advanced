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


//populate roll name, image, description, and price dynamically on product details page
document.querySelector('.description').textContent = rollType + " Cinnamon Roll";
document.querySelector('.item_detail_image').src = '../../assets/products/' + rollData["imageFile"];
document.querySelector('.price').textContent = '$' + rollData["basePrice"].toFixed(2);

//rest of JS code (from HW3)
//populate glazing dropdown dynamically
const glazingDropdown = document.querySelector('#glazing-dropdown');


//Loop through glazing adaptation array to populate og dropdown
for (let i = 0; i < glazingPriceAdaptations.length; i++) {
    const option = document.createElement('option');
    option.value = glazingPriceAdaptations[i].adjustment; // Use adjustment as the option value
    option.text = glazingPriceAdaptations[i].name; // Use name as the displayed option text
    glazingDropdown.appendChild(option);
}


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
    let newPrice = (((parseFloat(priceChange) + parseFloat(rollData["basePrice"]))*packValue).toFixed(2));

    //update price text based on glazing
    element.parentElement.parentElement.querySelector('.price').innerHTML = '$'+newPrice;

    return newPrice;
}


//change price based on glazing & packsize selection
function packChange(element) {
    //get value of selected pack size option
    packValue = element.value;

    //calculate price with glazing + pack size
    let updatedPrice = (glazingChange(document.querySelector('#glazing-dropdown')));

    //update price text based on glazing & pack size
    document.querySelector('.price').innerHTML = '$'+updatedPrice;

}

//cart button actions
const cartButton = document.querySelector('.cart-button');

function addToCart(element) {
    //get selected glazing and pack size option values
    const glazingVal = document.querySelector('#glazing-dropdown').value;
    const packSizeVal = document.querySelector('#packsize-dropdown').value;

    //get selected glazing and pack size options indexes
    const glazingIndex = document.querySelector('#glazing-dropdown').selectedIndex;
    const packSizeIndex = document.querySelector('#packsize-dropdown').selectedIndex;

    //get glazing and pack size names using the selected indexes
    const glazingName = document.querySelector('#glazing-dropdown').options[glazingIndex].text;
    const packSizeName = document.querySelector('#packsize-dropdown').options[packSizeIndex].text;

    //get og base price
    const price = (((parseFloat(document.querySelector('.price').innerHTML.substring(1)))/packSizeVal)-glazingVal).toFixed(2);
    
    //create a new roll instance
    const rollItem = new Roll(rollType, glazingName, packSizeName, price);

    //add new instance to the cart array
    cart.push(rollItem);

    //print the cart array to the console
    console.log(cart);

}



