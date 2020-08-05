var productList = new Produclist();
var cart = new cartItems();
const fetProductList = function () {
  axios({
    url: "https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS",
    method: "GET",
  })
    .then(function (res) {
      productList.arr = res.data;
      renderProductlist();
    })
    .catch(function (err) {});
};
fetProductList();
//Hàm renderProductList để render ra giao diện
const renderProductlist = function (list = productList.arr) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
    htmlContent += `<div class="col-md-3">
        <div class="card card-product mt-2">
          <div class="card-body">
            <div class="product">
              <img
                src="${list[i].image}"
                alt=""
              />
              <span class="product_name mt-1 d-block"
                >${list[i].name}</span
              >
              <span class="product_gia mb-2 d-block"
                >Giá: ${new Intl.NumberFormat("de-DE").format(
                  list[i].price
                )} VNĐ</span
              >
              <p class="product__content">
              ${list[i].description}
              </p>

              <div class="product-cart d-flex justify-content-between">
                <button class="btn btn-warning" onclick='goToDetail(${
                  list[i].id
                })'>Xem chi tiết</button>
                <button class="btn-cart" onclick='addToCart(${list[i].id})'>
                  <i class="fa fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    document.getElementById("tbody").innerHTML = htmlContent;
  }
};
// Sort Product
const sortProduct = function () {
  var value = document.getElementById("sort").value;

  if (value === "increment") {
    productList.arr.sort(compare);
    renderProductlist();
  }
  if (value === "decrement") {
    productList.arr.sort(compareDecrement);
    renderProductlist();
  }
};
//sắp sếp tăng đần theo Name
function compare(a, b) {
  // Dùng toUpperCase() để không phân biệt ký tự hoa thường
  const genreA = a.name.toUpperCase();
  const genreB = b.name.toUpperCase();

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}
//sắp sếp giảm dần theo Name
function compareDecrement(a, b) {
  //nghịch đảo giá trị trả lại bằng cách nhân với -1
  const genreA = a.name.toUpperCase();
  const genreB = b.name.toUpperCase();

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison * -1;
}
//Filter type
/**
 * Get type của select option
 *  duyệt all mảng productList.arr lớp đối tượng product
 * Nếu type option===type product.arr đã lưu thì push vào mảng mới tìm kiếm
 * sau đó render giao diện lại theo mảng mới đã lọc tyep tương ứng
 */
const filterProduct = function () {
  let typeProduct = getEle("idFilter").value;
  for (var i = 0; i < productList.arr.length; i++) {
    if (typeProduct.toUpperCase() === productList.arr[i].type.toUpperCase()) {
      productList.arrFillter.push(productList.arr[i]);
    }
  }
  //gọi hàm render lại giao diện theo mảng mới lọc được
  if (productList.arrFillter.length > 0) {
    renderProductlist(productList.arrFillter);
  } else {
    renderProductlist(productList.arr);
  }
};

var getEle = function (id) {
  return document.getElementById(id);
};
//findIndex by id product
const findIndexProduct = function (id) {
  for (var i = 0; i < productList.arr.length; i++) {
    if (parseInt(productList.arr[i].id) === parseInt(id)) {
      return i;
    }
  }
  return -1;
};
//Find index by id cartItem
var findIndexCart = function (id) {
  for (var i = 0; i < cart.arrCartItems.length; i++) {
    if (parseInt(cart.arrCartItems[i].arrcart.id) === parseInt(id)) {
      return i;
    }
  }
  return -1;
};
//call add to cart
const addToCart = function (id) {
  var indexProduct = findIndexProduct(id);
  var indexCart = findIndexCart(id);
  // console.log("index product", indexProduct);
  // console.log("index cartitem ", indexCart);
  if (indexProduct !== -1 && indexCart == -1) {
    var arrCartNew = {
      arrcart: productList.arr[indexProduct],
      quantity: 1,
      sumPrice: 0,
    };
    cart.arrCartItems.push(arrCartNew);
    // console.log(cart.arrCartItems);
    // console.log(productList.arr);
  }
  if (indexProduct !== -1 && indexCart !== -1) {
    //tăng quantiy lên 1
    cart.arrCartItems[indexCart].quantity++;
  }

  renderCartItems();
  getEle("allSum").innerHTML = allSum();

  // console.log(cart.arrCartItems);
};
//render giao diện giỏ hàng
const renderCartItems = function () {
  var htmlContent = "";
  for (var i = 0; i < cart.arrCartItems.length; i++) {
    htmlContent += `
  <tr>
  <td>
    <img
      style="width: 200px;"
      src="${cart.arrCartItems[i].arrcart.image}"
    />
  </td>
  <td style="font-size: 25px;">Iphone 6 Plus</td>
  <td>${cart.arrCartItems[i].arrcart.price} VNĐ</td>
  <td>
  <span id="quantity_${i}">${cart.arrCartItems[i].quantity}</span> 
    <div class="btn-group">
      <button class="btn btn-info border-right btn-sm" onclick='deIncrease(${
        cart.arrCartItems[i].arrcart.id
      })'>-</button>
      <button class="btn btn-info border-left btn-sm" onclick='increase(${
        cart.arrCartItems[i].arrcart.id
      })'>+</button>
    </div>
  </td>
  <td><span id='idtongtien_${
    cart.arrCartItems[i].arrcart.id
  }'>${new Intl.NumberFormat("de-DE").format(
      cart.arrCartItems[i].sumPrice
    )} VNĐ</span></td>
  <td>
    <button class="btn btn-info btn-sm" onclick='deleteCartItem(${
      cart.arrCartItems[i].arrcart.id
    })'>x</button>
  </td>
</tr>

  `;
  }
  getEle("tbodyCart").innerHTML = htmlContent;
};
//Function increase
var increase = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    cart.arrCartItems[index].quantity++;
    getEle("quantity_" + index).innerHTML = cart.arrCartItems[index].quantity;
    cart.arrCartItems[index].sumPrice = sumItem(id);
    getEle("idtongtien_" + id).innerHTML = cart.arrCartItems[index].sumPrice;
    getEle("allSum").innerHTML = allSum();
  }
};

// Function DeIncrease
var deIncrease = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    if (parseInt(cart.arrCartItems[index].quantity) !== 0) {
      cart.arrCartItems[index].quantity--;
      getEle("quantity_" + index).innerHTML = cart.arrCartItems[index].quantity;
      cart.arrCartItems[index].sumPrice = sumItem(id);
      getEle("idtongtien_" + id).innerHTML = cart.arrCartItems[index].sumPrice;
      getEle("allSum").innerHTML = allSum();
    } else if (parseInt(cart.arrCartItems[index].quantity) === 0) {
      //call Function Delete cartItem
      deleteCartItem(id);
    }
  }
};
//Funcion deleteCartItem
const deleteCartItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    //delete
    cart.arrCartItems.splice(index, 1);
  }
  renderCartItems();
};
//Function sumPrice của từng item
const sumItem = function (id) {
  var index = findIndexCart(id);
  var price = 0;
  var quantity = 0;
  if (index !== -1) {
    //get data price in arr và quantity ra tinh
    price = +cart.arrCartItems[index].arrcart.price;
    quantity = +cart.arrCartItems[index].quantity;

    return quantity * price;
  }
};
//all sum

const allSum = function () {
  var tongtien = 0;
  for (var i = 0; i < cart.arrCartItems.length; i++) {
    tongtien += parseInt(cart.arrCartItems[i].arrcart.price);
  }
  return tongtien;
};
