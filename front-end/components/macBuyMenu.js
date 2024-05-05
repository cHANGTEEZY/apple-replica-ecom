document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.classList.contains("active")) {
      this.classList.remove("border-primary");
    } else {
      this.classList.add("border-primary");
    }
  });
});

//show grid based on chip

document.addEventListener("DOMContentLoaded", function () {
  // Selecting individual radio buttons
  var chipAll = document.getElementById("chip-all");
  var chipM3 = document.getElementById("chip-m3");
  var chipM3Pro = document.getElementById("chip-m3pro");
  var chipM3Max = document.getElementById("chip-m3max");

  // Selecting individual grid items
  var allItems = document.querySelectorAll(".macbook-grid-items");
  var m3Items = document.querySelectorAll(".m3-macbook");
  var m3ProItems = document.querySelectorAll(".m3-pro");
  var m3MaxItems = document.querySelectorAll(".m3-max");

  // Function to show selected grid items and hide others
  function showSelectedItems(selectedItems, allItems) {
    allItems.forEach(function (item) {
      item.style.display = "none"; // Hide all items
    });
    selectedItems.forEach(function (item) {
      item.style.display = "block";
    });
  }

  // Event handlers for radio buttons
  chipAll.onclick = function () {
    showSelectedItems(allItems, allItems);
  };

  chipM3.onclick = function () {
    showSelectedItems(m3Items, allItems);
  };

  chipM3Pro.onclick = function () {
    showSelectedItems(m3ProItems, allItems);
  };

  chipM3Max.onclick = function () {
    showSelectedItems(m3MaxItems, allItems);
  };
});

//grid

function handleRadioChange(color, index) {
  // Select the silver and gray images based on the color index
  const silverImage = document.getElementById(`silver-image-${index}`);
  const grayImage = document.getElementById(`gray-image-${index}`);

  // Select the corresponding radio buttons based on the color index
  const silverRadio = document.getElementById(`silver-color-${index}`);
  const grayRadio = document.getElementById(`gray-color-${index}`);

  const macbookColor = document.getElementById(`macbook-color-${index}`);

  // Add event listeners to the radio buttons
  silverRadio.addEventListener("change", () => {
    if (silverRadio.checked) {
      silverImage.style.display = "block";
      grayImage.style.display = "none";
      macbookColor.innerText = "Silver";
    }
  });

  grayRadio.addEventListener("change", () => {
    if (grayRadio.checked) {
      silverImage.style.display = "none";
      grayImage.style.display = "block";
      macbookColor.innerText = "Space-Grey";
    }
  });
}

// Call handleRadioChange function for each set of radio buttons after DOM is loaded
for (let i = 1; i <= 6; i++) {
  handleRadioChange("macbook-color", i);
}
