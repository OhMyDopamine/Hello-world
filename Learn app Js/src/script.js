const shop = document.getElementById('shop')
// console.log(shop)


let basket = JSON.parse(localStorage.getItem('data')) || []
let generateShop =()=>{
     shop.innerHTML = shopItemsData.map((x)=>{
        let {id, image, name, width, price} = x
        let search = basket.find((x) => x.id === id) || []
        return `<div id = product-id-${id} class="item">
        <img src = ${image} width = ${width} height="200">
        <div class="details">
            <h3>${name}</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
            </div>
        <div class="price-quantity">
            <h2 class="price">$${price}</h2>               
            <div class="btn">
            <button onclick='increment(${id})' class="add">+</button>
            <div id = ${id} class="quantity">
            ${search.item === undefined? 0: search.item}</div>
            <button onclick='decrement(${id})' class="min">-</button>
            </div>
        </div>
    </div>`
    }).join('')

    // console.log(shopItemsData)
}
generateShop()


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
    localStorage.setItem('data', JSON.stringify(basket))
}

let update =(id)=>{
    let search = basket.find((x) => x.id === id)
    // console.log(search.item)


    document.getElementById(id).innerHTML = search.item
    calculation() 
    empty()
}
let decrement =(id)=>{
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)

    if(search.item === 0) return
    else search.item -= 1
    

    
    // console.log(basket)
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    localStorage.setItem('data', JSON.stringify(basket))
}

let calculation =()=>{
    let fillTheCart = document.querySelector('.cartAmount')
    fillTheCart.innerText = basket.map(x => x.item).reduce((x, y) => x + y, 0)
    // console.log(basket.map(x => x.item).reduce((x, y) => x + y, 0))
    
}
calculation()

let empty =()=>{
    let fillTheCart = document.querySelector('.cartAmount')

    if(fillTheCart.innerText < 0){
        document.querySelector('.cartAmount').style.opacity = 0
    } else {document.querySelector('.cartAmount').style.opacity = 1}
}
empty()