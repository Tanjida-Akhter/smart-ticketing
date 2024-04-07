(function () {
    const selectedSeats = [];
  
    const btnApplyCoupon = document.getElementById('applyCoupon');
  
    function createSelectedSeatList() {
      const listOfSelectedSeats = document.getElementById('list-selected-seats');
  
      if (selectedSeats.length === 0) {
        listOfSelectedSeats.innerHTML = `<div class="py-4 flex justify-between mx-6">No seat selected</div>`;
        return;
      }
  
      let innerHtml = ``;
  
      selectedSeats.forEach((value) => {
        innerHtml += `
              <div class="py-4 flex justify-between mx-6">
                  <p>${value}</p>
                  <p>Economoy</p>
                  <p>550</p>
              </div>
          `;
      });
  
      listOfSelectedSeats.innerHTML = innerHtml;
    }
  
    function setTotalSelectedSeats() {
      const numberOfSeatsSelected = document.getElementById(
        'numberOfSeatsSelected'
      );
      numberOfSeatsSelected.innerText = selectedSeats.length;
    }
  
    function setTotalCost() {
      const spanTotalPrice = document.getElementById('totalPrice');
      spanTotalPrice.innerText = selectedSeats.length * 550;
    }
  
    function setGranTotalPrice() {
      const coupon = document.getElementById('txt-discount-coupon').value;
  
      let discountPercent = 0;
  
      if (coupon.toLowerCase() === 'new15') {
        discountPercent = 15;
      }
      if (coupon.toLowerCase() === 'couple 20') {
        discountPercent = 20;
      }
  
      const spanTotalPrice = document.getElementById('granTotalPrice');
  
      spanTotalPrice.innerText =
        ((100 - discountPercent) / 100) * selectedSeats.length * 550;
    }
  
    function setSeatsLeft() {
      const spanSeatsLeft = document.getElementById('seatsLeft');
      spanSeatsLeft.innerText = 40 - selectedSeats.length;
    }
  
    window.onload = function () {
      const busSeats = document.querySelectorAll('[data-seat-no]');
  
      busSeats.forEach((seat, index) => {
        seat.addEventListener('click', (e) => {
          const seatNo = e.target.getAttribute('data-seat-no');
  
          // Add seats
          if (!selectedSeats.includes(seatNo) && selectedSeats.length < 4) {
            selectedSeats.push(seatNo);
            e.target.classList.add('bg-green-400', 'text-white');
  
            setSeatsLeft();
            setTotalSelectedSeats();
            createSelectedSeatList();
            setTotalCost();
            setGranTotalPrice();
  
            return;
          }
  
          // Remove seats
          if (selectedSeats.includes(seatNo)) {
            const index = selectedSeats.indexOf(seatNo);
            if (index !== -1) {
              selectedSeats.splice(index, 1);
            }
            e.target.classList.remove('bg-green-400');
            e.target.classList.remove('text-white');
  
            setSeatsLeft();
            setTotalSelectedSeats();
            createSelectedSeatList();
            setTotalCost();
            setGranTotalPrice();
  
            return;
          }
  
          alert('Cannot book more than 4 seats at once.');
        });
      });
  
      document.getElementById('txt-discount-coupon').onchange = function (e) {
        if (e.target.value.trim() === '') {
          btnApplyCoupon.disabled = true;
          btnApplyCoupon.classList.remove('bg-green-400');
          btnApplyCoupon.classList.add('bg-gray-500');
        } else {
          btnApplyCoupon.disabled = false;
          btnApplyCoupon.classList.remove('bg-gray-400');
          btnApplyCoupon.classList.add('bg-green-400');
        }
  
        setGranTotalPrice();
      };
  
      btnApplyCoupon.onclick = function () {
        setGranTotalPrice();
      };
  
      const btnNext = document.getElementById('btnNext');
      const txtPassengerName = document.getElementById('txtPassengerName');
      const txtPhoneNumber = document.getElementById('txtPhoneNumber');
  
      function validatePassengerInput() {
        if (
          txtPassengerName.value.trim() !== '' &&
          txtPhoneNumber.value.trim() !== ''
        ) {
          btnNext.disabled = false;
          btnNext.classList.remove('bg-gray-500');
          btnNext.classList.add('bg-green-400');
        } else {
          btnNext.disabled = true;
          btnNext.classList.remove('bg-green-500');
          btnNext.classList.add('bg-gray-400');
        }
      }
  
      txtPassengerName.onchange = function () {
        validatePassengerInput();
      };
  
      txtPhoneNumber.onchange = function () {
        validatePassengerInput();
      };
    };
  })();
  