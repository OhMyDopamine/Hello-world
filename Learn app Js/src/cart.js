let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

// console.log(shopItemsData)

let basket = JSON.parse(localStorage.getItem('data')) || []

let calculation =()=>{
    let fillTheCart = document.querySelector('.cartAmount')
    

    fillTheCart.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0)
}
calculation()

let generateCartItems =()=>{
    if(basket.length !== 0){
        shoppingCart.innerHTML = basket.map((x) =>{
            let {id, item} = x
            let search = shopItemsData.find((y) => y.id === id) || []
            let {image, name, price} = search
            return `<div class='cart-item'>
            <img src=${image} width = '' height='135'>
            <div class='details'>
                <div class='title-price-x'>
                    <h4 class='title-price'>
                        <p class='mamba' style='border-bottom:none;'>${name}</p>
                        <p class='cart-item-price' style='border-bottom:none;'>$${price}</p>
                    </h4>
                    <div onclick='removeItem(${id})' class='emoji2'>⨉</div>
                </div>
                <div class="btn">
                    <button onclick='increment(${id})' class="add">+</button>
                    <div id = ${id} class="quantity">${item}</div>
                    <button onclick='decrement(${id})' class="min">-</button>
                </div>
                <h3 class='multi' style='border-bottom:none;'>$${item * search.price}</h3>
            </div>
            </div>`
        }).join('')
    } else{
        document.querySelector('.cartAmount').style.opacity = 0
        shoppingCart.innerHTML = ``
        label.innerHTML = `<h2>Cart is Empty</h2>
        <a href='index.html'><button class='HomeBtn'>Back to Home</button>
        </a>`
    }
}

generateCartItems()

let increment =(id)=>{
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    if(search === undefined){
        basket.push({id: selectedItem.id,
            item: 1,
        })
    } else{search.item += 1}


    // console.log(basket)
    update(selectedItem.id)
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
}

let update =(id)=>{
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)

    document.getElementById(id).innerHTML = search.item
    calculation()
    totalAmount()

    
}
let decrement =(id)=>{
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if(search.item === 0) return
    else search.item -= 1

    
    // console.log(basket)
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
}

let removeItem=(id)=>{
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    calculation()
    totalAmount()
    localStorage.setItem('data', JSON.stringify(basket))

}

let clearCart=()=>{
    basket = []
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))

}

let totalAmount =()=>{
    if(basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) =>x + y, 0)
        console.log(amount)
        label.innerHTML = `<div class='center'><h2>Total Bill: $${amount}</h2>
        <button class='check-out'>Checkout</button>
        <button onclick='clearCart()' class='remove-all'>Clear-all</button>
        </div>`
        
    } else return
}

totalAmount()
