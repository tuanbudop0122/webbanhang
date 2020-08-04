var Validation = function () {
  this.checkEmpty = function (input, mess, spanId) {
    if (input.trim() === "") {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.color = "red";

      return false;
    } else {
      getEle(spanId).innerHTML = "";
      return true;
    }
  };
  this.checkNumner = function (input, mess, spanId) {
    var numbers = /^[0-9]+$/;
    if (input.match(numbers)) {
      getEle(spanId).innerHTML = "";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.color = "red";
      return false;
    }
  };
  this.checkLength = function (input, mess, spanId, min, max) {
    if (parseInt(input) > parseInt(min) && parseInt(input) < parseInt(max)) {
      getEle(spanId).innerHTML = "";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.color = "red";
      return false;
    }
  };
  this.checkPosition = function (input, mess, spanId) {
    if (getEle(input).selectedIndex !== 0) {
      getEle(spanId).innerHTML = "";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.color = "red";
      return false;
    }
  };
  this.checkEmail = function (input, mess, spanId) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      getEle(spanId).innerHTML = "";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.color = "red";
      return false;
    }
  };
  this.checkGioiTinh = function (chknam, chknu, mess, spanId) {
    if (!chknam.checked && !chknu.checked) {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.color = "red";
      return false;
    } else {
      getEl(spanId).innerHTML = "";
      return true;
    }
  };
};
