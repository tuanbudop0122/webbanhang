var productList = new Produclist();
var cart = new cartItems();
let cartProduct = localStorage.getItem("arrCart")
  ? [...JSON.parse(localStorage.getItem("arrCart"))]
  : [];

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
const allSum = function () {
  var tongtien = 0;
  var price;
  var quantity;
  for (var i = 0; i < cartProduct.length; i++) {
    //tính tổng tiền = số lượng &*price của từng sản phầm sau đó gán cộng nối với tong tiền
    price = +cartProduct[i].arrcart.price;
    quantity = +cartProduct[i].quantity;
    tongtien += parseInt(price) * parseInt(quantity);
  }
  return tongtien;
};
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
                  +list[i].price
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
  for (var i = 0; i < cartProduct.length; i++) {
    if (parseInt(cartProduct[i].arrcart.id) === parseInt(id)) {
      return i;
    }
  }
  return -1;
};
//call add to cart
const addToCart = function (id) {
  var indexProduct = findIndexProduct(id);
  var indexCart = findIndexCart(id);

  if (indexProduct !== -1 && indexCart == -1) {
    var arrCartNew = {
      arrcart: productList.arr[indexProduct],
      quantity: 1,
      sumPrice: 0,
    };
    cartProduct.push(arrCartNew);
  }
  if (indexProduct !== -1 && indexCart !== -1) {
    //tăng quantiy lên 1
    cartProduct[indexCart].quantity++;
  }
  //set localStoreate
  setLocalstorate();
  renderCartItems(cartProduct);
  getEle("allSum").innerHTML = allSum().toLocaleString() + " VNĐ";
};
//render giao diện giỏ hàng
function renderCartItems(list = cartProduct) {
  var htmlContent = "";
  for (var i = 0; i < cartProduct.length; i++) {
    htmlContent += `
  <tr>
  <td>
    <img
      style="width: 200px;"
      src="${cartProduct[i].arrcart.image}"
    />
  </td>
  <td style="font-size: 25px;">Iphone 6 Plus</td>
  <td>${parseInt(cartProduct[i].arrcart.price).toLocaleString()} VNĐ</td>
  <td>
  <span id="quantity_${i}">${cartProduct[i].quantity}</span> 
    <div class="btn-group">
      <button class="btn btn-dark border-right btn-sm" onclick='deIncrease(${
        cartProduct[i].arrcart.id
      })'>-</button>
      <button class="btn btn-primary border-left btn-sm" onclick='increase(${
        cartProduct[i].arrcart.id
      })'>+</button>
    </div>
  </td>
  <td><span id='idtongtien_${cartProduct[i].arrcart.id}'>${(
      +cartProduct[i].arrcart.price * +cartProduct[i].quantity
    ).toLocaleString()} VNĐ</span></td>
  <td>
    <button class="btn btn-danger btn-sm" onclick='deleteCartItem(${
      cartProduct[i].arrcart.id
    })'>x</button>
  </td>
</tr>

  `;
  }
  getEle("tbodyCart").innerHTML = htmlContent;
  getEle("allSum").innerHTML = allSum().toLocaleString() + " VNĐ";
}

renderCartItems(cartProduct);

//Function increase
var increase = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    cartProduct[index].quantity++;
    cartProduct[index].sumPrice = sumItem(id);
    setLocalstorate();
    getEle("quantity_" + index).innerHTML = cartProduct[index].quantity;
    getEle("allSum").innerHTML = allSum().toLocaleString("de-DE") + " VNĐ";
    getEle("idtongtien_" + id).innerHTML = cartProduct[
      index
    ].sumPrice.toLocaleString();
  }
};

// Function DeIncrease
var deIncrease = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    if (parseInt(cartProduct[index].quantity) > 1) {
      cartProduct[index].quantity--;
      cartProduct[index].sumPrice = sumItem(id);
      setLocalstorate();
      getEle("allSum").innerHTML = allSum().toLocaleString() + " VNĐ";
      getEle("idtongtien_" + id).innerHTML = cartProduct[
        index
      ].sumPrice.toLocaleString();
      getEle("quantity_" + index).innerHTML = cartProduct[index].quantity;
    } else if (parseInt(cartProduct[index].quantity) <= 1) {
      //call Function Delete cartItem
      deleteCartItem(id);
    }
  }
};
//Funcion deleteCartItem
const deleteCartItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
    cartProduct.splice(index, 1);
  }
  setLocalstorate();
  renderCartItems(cartProduct);
};
//Function sumPrice của từng item
const sumItem = function (id) {
  var index = findIndexCart(id);
  var price = 0;
  var quantity = 0;
  if (index !== -1) {
    //get data price in arr và quantity ra tinh
    price = +cartProduct[index].arrcart.price;
    quantity = +cartProduct[index].quantity;
    return quantity * price;
  }
};
//all sum

//Thanhtoan
const thanhToan = function () {
  //clear rỏ hảng set mảng về []
  cartProduct = [];
  localStorage.clear("arrCart");
  renderCartItems(cartProduct);
  getEle("allSum").innerHTML = allSum();
};
//Go to Detailts
const goToDetail = function (id) {
  //get id
  window.location.assign("components/detailtsProduct.html?id=" + id);
};
const setLocalstorate = function () {
  localStorage.setItem("arrCart", JSON.stringify(cartProduct));
};
