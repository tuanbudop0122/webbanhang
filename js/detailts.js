const fetchDetailtsProduct = function () {
  const idProduct = window.location.search.split("=")[1];
  axios({
    url:
      "https://5f1d4b9f39d95a0016953dc8.mockapi.io/api/PRODUCTS/" + idProduct,
    method: "GET",
  })
    .then(function (res) {
      console.log(res.data);
      renderDetailtsProduct(res.data);
    })
    .catch(function (err) {});
};
fetchDetailtsProduct();
const renderDetailtsProduct = function (arr) {
  console.log(arr);
  var htmlContent = "";

  htmlContent = `
        <div class="card" style="width: 400px;">
        <img
          class="card-img-top"
          src="${arr.image}"
          alt="Card image"
        />
        <div class="card-body">
          <h4 class="card-title text-danger">
          ${arr.name}
          </h4>
          <p class="card-text text-primary"><b>${arr.price}</b></p>
          <p class="card-text">
          ${arr.description}
          </p>
        </div>
      </div>`;

  document.getElementById("idDetailts").innerHTML = htmlContent;
};
