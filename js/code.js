var ticketData = [];
var totalSeats = 40;

const showSectionButton = document.getElementById("showSectionButton");
const btnApplyCoupon = document.getElementById("btnApplyCoupon");
const txtCoupon = document.getElementById("txtCoupon");

const ticket_section = document.getElementById("ticket_section");

const tblTotal = document.getElementById("tblTotal");
const lblGrandTotal = document.getElementById("grandTotal");
const lblSeatCount = document.getElementById("lblSeatCount");
const lblSeatsLeft = document.getElementById("lblSeatsLeft");
const discountArea = document.getElementById("discountArea");
const lblDiscountAmt = document.getElementById("lblDiscountAmt");
const couponArea = document.getElementById("couponArea");

var txtPassengerPhone = document.getElementById("txtPassengerPhone");
var txtPassengerName = document.getElementById("txtPassengerName");
var txtPassengerEmail = document.getElementById("txtPassengerEmail");
var btnNext = document.getElementById("btnNext");

discountArea.style.display = "none";
couponArea.style.display = "none";

function checkValidity() {
  if (txtPassengerPhone.value && ticketData.length > 0) {
    btnNext.disabled = false;
  } else {
    btnNext.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  txtPassengerPhone.addEventListener("input", checkValidity);
  checkValidity();
});
showSectionButton.addEventListener("click", function () {
  ticket_section.scrollIntoView({ behavior: "smooth" });
});

btnNext.addEventListener("click", function () {
  window.location = "success.html";
});

btnApplyCoupon.addEventListener("click", function () {
  var couponText = txtCoupon.value;
  if (couponText.toLowerCase() == "new15") {
    var tblTotalString = tblTotal.textContent;
    var totalAmt = parseFloat(tblTotalString.replace(/[^0-9.-]+/g, ""));

    var netTotal = totalAmt * 0.85;
    var discount = totalAmt * 0.15;

    // grandTotal.textContent = netTotal.toLocaleString("en-US", {
    //   style: "currency",
    //   currency: "BDT",
    // });

    lblGrandTotal.textContent = netTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });

    lblDiscountAmt.textContent = discount.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });

    discountArea.style.display = "flex";
    couponArea.style.display = "none";
  } else if (couponText.toLowerCase() == "couple 20") {
    var tblTotalString = tblTotal.textContent;
    var totalAmt = parseFloat(tblTotalString.replace(/[^0-9.-]+/g, ""));

    var netTotal = totalAmt * 0.8;
    var discount = totalAmt * 0.2;

    lblGrandTotal.textContent = netTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });

    lblDiscountAmt.textContent = discount.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });

    discountArea.style.display = "flex";
    couponArea.style.display = "none";
  } else {
    alert("Coupon Code Is not Valid");
  }
});

var buttons = document.querySelectorAll(".btn-active");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Toggle the 'clicked' class to change background color

    var hasClickedClass = this.classList.contains("clicked");

    if (hasClickedClass) {
      var seatToRemove = this.textContent;

      ticketData = ticketData.filter(function (ticket) {
        return ticket.seat !== seatToRemove;
      });
      this.classList.toggle("clicked");
    } else {
      if (ticketData.length < 4) {
        var seat = this.textContent;

        var newTicket = {
          seat: seat,
          class: "Economy",
          price: 550,
        };

        ticketData.push(newTicket);
        this.classList.toggle("clicked");
      } else {
        alert("Already Selected 4 tickets");
      }
    }

    updateTable();
    if (ticketData.length == 4) {
      couponArea.style.display = "block";
    } else {
      couponArea.style.display = "none";
    }
    checkValidity();
  });
});

function updateTable() {
  var tableBody = document.querySelector("#tblTickets tbody");

  // Clear existing table rows
  tableBody.innerHTML = "";

  var total = 0;
  // Loop through the data array and add rows to the table
  ticketData.forEach(function (item) {
    var row = tableBody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.textContent = item.seat;
    cell2.textContent = item.class;
    cell3.textContent = item.price;

    total = total + item.price;
  });

  tblTotal.textContent = total.toLocaleString("en-US", {
    style: "currency",
    currency: "BDT",
  });
  lblGrandTotal.textContent = total.toLocaleString("en-US", {
    style: "currency",
    currency: "BDT",
  });

  lblSeatCount.textContent = ticketData.length;
  lblSeatsLeft.textContent = totalSeats - ticketData.length;
}
