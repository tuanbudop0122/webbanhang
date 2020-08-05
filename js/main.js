var productList = new Produclist();

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
                >Giá: ${list[i].price} VNĐ</span
              >
              <p class="product__content">
              ${list[i].description}
              </p>

              <div class="product-cart d-flex justify-content-between">
                <button class="btn btn-warning" onclick='goToDetail(${list[i].id})'>Xem chi tiết</button>
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
