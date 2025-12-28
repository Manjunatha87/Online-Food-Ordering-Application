let cartInfo = [];
const PRICE = 10;
let currentUser = sessionStorage.getItem("user");

if (!currentUser) {
    alert("Plz login");
    window.location.href = "login.html";
}

function searchItemData() {
    let mid = document.getElementById("mid").value;
    fetch('https://dummyjson.com/recipes/' + mid)
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(error => console.log(error));
}

function showCartData() {
    document.getElementById("menu-item").style.display = "none";
    document.getElementById("cart-item").style.display = "block";

    let list = document.getElementById("cart-item");
    list.innerHTML = "";

    let total = 0;

    let table = `
        <table border="1" cellpadding="10" cellspacing="0" width="100%">
            <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Item Total</th>
                <th>Action</th>
            </tr>
    `;

    cartInfo.forEach((item, i) => {
        let itemTotal = item.qty * item.price;
        total += itemTotal;

        table += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="updateQty(${i},-1)">-</button>
                    ${item.qty}
                    <button onclick="updateQty(${i},1)">+</button>
                </td>
                <td>${itemTotal}</td>
                <td>
                    <button onclick="removeItem(${i})">Remove</button>
                </td>
            </tr>
        `;
    });

    /* TOTAL ROW */
    table += `
        <tr>
            <td colspan="3"><strong>Total Cost</strong></td>
            <td colspan="2"><strong>${total}</strong></td>
        </tr>
    `;

    /* PLACE ORDER BUTTON ROW */
    table += `
        <tr>
            <td colspan="5" style="text-align:center">
                <button 
                    onclick="placeOrder()" 
                    style="
                        font-weight: bold; 
                        padding: 10px 20px; 
                        font-size: 16px; 
                        background-color: #4CAF50; 
                        color: white; 
                        border: none; 
                        border-radius: 5px; 
                        cursor: pointer;
                    "
                >
                    Place Order
                </button>
            </td>
        </tr>
    `;

    /* CLOSE TABLE */
    table += `</table>`;

    list.innerHTML = table;
}

function placeOrder() {
    if (cartInfo.length === 0) {
        alert("Cart is empty");
        return;
    }
    window.location.href = "order.html";
}

function removeItem(index) {
    cartInfo.splice(index, 1);
    showCartData();
}

function updateQty(index, change) {
    cartInfo[index].qty += change;
    if (cartInfo[index].qty < 1) cartInfo[index].qty = 1;
    showCartData();
}

function loadFakeData() {
    let h1 = document.createElement("p");
    let user = sessionStorage.getItem("user");
    let h1TagValue = document.createTextNode(user);
    h1.appendChild(h1TagValue);
    document.getElementById("user").innerHTML = "";
    document.getElementById("user").appendChild(h1);

    hideAll();

    let menuContainer = document.getElementById("menu-item");
    menuContainer.style.display = "grid";
    menuContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    menuContainer.style.gap = "20px";
    menuContainer.innerHTML = "";

    fetch('https://dummyjson.com/recipes')
        .then(res => res.json())
        .then(result => {
            result.recipes.forEach(menu => {
                let div = document.createElement("div");
                div.className = "flex p-2 m-4";
                div.style.flexDirection = "column";
                div.style.alignItems = "center";

                let img = document.createElement("img");
                img.src = menu.image;
                img.style.width = "180px";
                img.style.height = "180px";
                img.style.objectFit = "cover";

                let p = document.createElement("p");
                p.innerText = menu.name;

                div.appendChild(img);
                div.appendChild(p);

                img.addEventListener("click", () => {
                    let result = cartInfo.find(cartItem => cartItem.name == menu.name);
                    if (result == undefined) {
                        cartInfo.push({ name: menu.name, qty: 1, price: PRICE });
                        alert("Item Added in cart");
                    } else {
                        alert("Item already present in cart");
                    }
                });

                menuContainer.appendChild(div);
            });
        });
}

function hideAll() {
    document.getElementById("cart-item").style.display = "none";
}

function logout() {
    sessionStorage.removeItem("user");
    window.location.href = "login.html";
}
