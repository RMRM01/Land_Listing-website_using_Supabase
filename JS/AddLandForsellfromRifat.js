// JavaScript for handling form submission and validation

document.getElementById("button").addEventListener("click", function (e) {
  e.preventDefault();

  const data = {
    ownerName: document.getElementById("OwnerName").value.trim(),
    ownerFatherName: document.getElementById("OwnerFName").value.trim(),
    ownerNID: document.getElementById("OwnerNID").value.trim(),
    numberOfOwner: document.getElementById("NumberOfOwner").value.trim(),
    ownerAddress: document.getElementById("OwnerAddress").value.trim(),
    landLocation: document.getElementById("Location").value.trim(),
    landAmount: document.getElementById("AmountOfLand").value.trim(),
    landPrice: document.getElementById("Price").value.trim(),
    landPicture: document.getElementById("Picture").files[0], // file input
    flatSize: document.getElementById("FlatSize").value.trim(),
    landType: document.getElementById("LandType").value,
    landFacing: document.getElementById("Facing").value,
    shortNote: document.getElementById("ShortNote").value.trim()
  };

  // NID Validation (must be exactly 13 digits)
  if (!/^\d{13}$/.test(data.ownerNID)) {
    alert("NID must be exactly 13 digits");
    return;
  }


  console.log("Form Data: ", data);
  alert("Form submitted successfully!");

  // Optional: Clear form after submit
  document.querySelector(".form").reset();
  document.getElementById("preview").style.display = "none";
});

// Image preview logic
const pictureInput = document.getElementById("Picture");
const preview = document.getElementById("preview");

pictureInput.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(this.files[0]);
  } else {
    preview.style.display = "none";
  }
});

