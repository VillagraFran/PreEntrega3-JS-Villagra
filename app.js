//=====PRODUCTOS=====//
const products = [
    {
        id: 1,
        cantidad: 1,
        img:"https://www.cardamomo.news/__export/1602724862579/sites/debate/img/2020/10/14/disexo_sin_txtulo_x3x.jpg_1635092770.jpg", 
        name:"Hamburguesa clasica", 
        price:1200
    },
    {
        id: 2,
        cantidad: 1,
        img:"https://adrianacotte.com/wp-content/uploads/2021/05/hamburguesa01.jpeg", 
        name:"Hamburguesa cheddar", 
        price:1200
    },
    {
        id: 3,
        cantidad: 1,
        img:"https://assets.unileversolutions.com/recipes-v2/232001.jpg", 
        name:"Hamburguesa bacon", 
        price:1400
    },
    {
        id: 4,
        cantidad: 1,
        img:"https://truffle-assets.tastemadecontent.net/41c68cac-lomito_l_thumb.jpg", 
        name:"lomito clasico", 
        price:1600
    },
    {
        id: 5,
        cantidad: 1,
        img:"https://cdn.pedix.app/hTMCMaqGIP5KKMh7zARW/products/1622944704259.png?size=250x250", 
        name:"lomito premium", 
        price:1800
    },
    {
        id: 6,
        cantidad: 1,
        img:"https://scontent.fcor15-1.fna.fbcdn.net/v/t1.6435-9/141844953_242217384009562_3004967634108318305_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=107&ccb=1-7&_nc_sid=9e2e56&_nc_ohc=RjtCwhTqcowAX9QPw-T&_nc_ht=scontent.fcor15-1.fna&oh=00_AfCCvkj01kszgt2aO7Fxf6i49SnMFAPLH1JOYMIHTWeOBA&oe=648A1901", 
        name:"lomito palmito", 
        price:1700
    }
]

const menu = document.querySelector(".products-menu")
const btnCart = document.getElementsByClassName("btn-product")
const carNumber = document.querySelector(".carrito-number")
const carr = document.querySelector(".offcanvas-body")



//====MOSTRAR PRODUCTOS====//

const searchBtn = document.getElementById("search-value-input")
searchBtn.addEventListener("click", showProducts)


function showProducts() {

    menu.innerHTML = ""

    let dataValue = document.querySelector("#form-search").value;

    let prodFilter = products.filter((pr) => pr.name.includes(`${dataValue}`));

    prodFilter.forEach(pr => {
        
        const filterCard = document.createElement("div")
        filterCard.innerHTML = `
        <div class="card" style="width: 18rem;">
                <img src="${pr.img}" class="card-img-top" alt="${pr.name}">
                <div class="card-body">
                    <h5 class="card-title">${pr.name}</h5>
                    <p class="card-text">Precio: $${pr.price}</p>
                <button class="btn btn-primary btn-product">Añadir al Carrito</button>
            </div>
        </div>
        `
        menu.appendChild(filterCard)
    });

    for (let b = 0; b < btnCart.length; b++) {

        btnCart[b].addEventListener("click", () => {
            let product = prodFilter[b]

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)

            if (repeat === true) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        showCarrito()
                    }
                })
            } else {
                carrito.push(prodFilter[b])
                localStorage.setItem("carrito", JSON.stringify(carrito))
                showCarrito()
            }

        })  
    }

}
showProducts()


//=====AÑADIR AL CARRITO=====//

carrito = []

function showCarrito() {

    carr.innerHTML = ""

    carrito.forEach((carProduct) => {

        let carProductCard = document.createElement("div")
        carProductCard.className = "carProductCard"
        carProductCard.innerHTML = `
            <div class="card-content">
                <img class="img-fluid rounded-start" src="${carProduct.img}">
                <div class="car-text">
                    <div class="car-card-info" >
                        <p>Cantidad:</p>
                        <button class="btn btn-danger btn-substract" >-</button>
                        <p>${carProduct.cantidad}</p>
                        <button class="btn btn-success btn-add" >+</button>
                    </div>
                    <p>precio:$${carProduct.price * carProduct.cantidad}
                </div>
            </div>
            <button class="btn btn-danger btn-delete">x</button>
        `
        carr.appendChild(carProductCard)
    })

    const substractButtom = document.querySelectorAll(".btn-substract")

    for (let sb = 0; sb < substractButtom.length; sb++) {
        
        substractButtom[sb].addEventListener("click", () => {
            if (carrito[sb].cantidad > 1) {
                carrito[sb].cantidad--
                localStorage.setItem("carrito", JSON.stringify(carrito))
                showCarrito()
            } else if(carrito[sb].cantidad = 1) {
                carrito.splice(sb, 1)
                localStorage.setItem("carrito", JSON.stringify(carrito))
                showCarrito()
            }
        })
    }

    const addButton = document.querySelectorAll(".btn-add")

    for (let ab = 0; ab < addButton.length; ab++) {
        
        addButton[ab].addEventListener("click", () => {
            carrito[ab].cantidad++
            localStorage.setItem("carrito", JSON.stringify(carrito))
            showCarrito()
        })
        
    }

    const deleteButton = document.querySelectorAll(".btn-delete")

    for (let db = 0; db < deleteButton.length; db++) {
        
        deleteButton[db].addEventListener("click", () => {
            carrito[db].cantidad = 1
            carrito.splice(db, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            showCarrito()
        })
        
    }

    const totalProducts = carrito.reduce((ac, el) => ac + el.cantidad, 0)
    carNumber.innerHTML = ""
    carNumber.innerHTML = `<p>${totalProducts}</p>`

    const totalPrice = carrito.reduce((ac, el) => ac + (el.price * el.cantidad), 0)
    const carPrice = document.querySelector(".total-price")
    carPrice.innerHTML = ""
    carPrice.innerHTML = `
    <p>Total: $${totalPrice}</p>
    `

}

//====LOCAL STORAGE====//

function saveCarrito() {
    if (localStorage.length == 1) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        showCarrito()
    }
}
saveCarrito()

//====COMPRAR====//

const modal = document.querySelector(".modal")
const btnBuy = document.querySelector(".btn-buy")

btnBuy.addEventListener("click", () => {

    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Su carrito esta vacio',
          })
    } else {
        let formName= document.querySelector("#nb-input").value
        let formLastName= document.querySelector("#ap-input").value
        let formCity= document.querySelector("#inputCity").value
        if (formName !== "" && formLastName !== "" && formCity !== "") {
            buy()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'ingrese bien los datos',
              })
        }
    }

})

function buy() {
    Swal.fire({
        title: '¿Estas seguro de lo que quieres comprar?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        denyButtonText: `Volver`,
      }).then((result) => {
        if (result.isConfirmed) {
            carrito = []
            localStorage.setItem("carrito", JSON.stringify(carrito))
            showCarrito()
          Swal.fire('Su pedido ya esta hecho!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('No se realizo el pedido', '', 'info')
        }
      })
}