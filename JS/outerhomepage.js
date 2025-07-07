import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);

const usermobileno = localStorage.getItem("mobileNo");

//const usermobileno = "01779073101"; // Example mobile number for testing
//alert(usermobileno);

// Hero section 

const findAHome=document.getElementById("find-a-home");
const placeAAdd=document.getElementById("place-a-add");
const registerLand=document.getElementById("register-land");



findAHome.addEventListener("click", () => {
    alert("Please Resistration First, Thank You");
  window.location.href = "../HTML/resistration.html";
  //localStorage.setItem("mobileNo", usermobileno);
});

registerLand.addEventListener("click", function() {
   window.location.href = "../HTML/AddLandForSell.html";
    localStorage.setItem("mobileNo", usermobileno);

});
placeAAdd.addEventListener("click", function() {
   window.location.href = "../HTML/about.html";
    localStorage.setItem("mobileNo", usermobileno);

});

// for avaiable land
const availableLandList = document.getElementById("all-available-land");
const soldLandList = document.getElementById("all-sold-land-btn");

availableLandList.addEventListener("click", () => {
   //window.location.href = "../HTML/AllLandforsell.html";
  // localStorage.setItem("mobileNo", usermobileno);
  alert('Please Register First');
  window.location.href ="../HTML/resistration.html"; 
});


// for sold land
soldLandList.addEventListener("click", () => {
  // window.location.href = "../HTML/SoldLand.html";
  // localStorage.setItem("mobileNo", usermobileno);
  alert('Please Register First');
  window.location.href ="../HTML/resistration.html"; 
}); 






// JavaScript for Land Registration Page

document.getElementById("add-property-btn").addEventListener("click", function() {
alert("Please register first to add a property.");

window.location.href ="../HTML/resistration.html"; 
});



// get few avaiable land

async function getfewavaiableland(){
  const {data, error}= await supabase
 .from("landinfo")
    .select("pictureofland,location,price,landamount,registermobile,id,type");
   

    if(error)
    {
        alert("find No data"+ error);
    }
    else{  

 for(let i=0;i<data.length && i<3;i++) {


    let heading;
if(data[i].type == "Agricultural")
{
  heading= "Premium Agricultural Land For sell in " + data[i].location;
}
else{
  heading= "Premium " + data[i].type +" For sell in " + data[i].location;
}
    
const newland=document.createElement("div");
newland.className="Property_card";

const landid=data[i].id;
newland.dataset.id= landid.toString();

newland.innerHTML=`  <img src="${data[i].pictureofland}" alt="Pictur of Land">
                <div class="Property_card_info">
                    <h4 class="Property_title">
                        ${heading} 
                    </h4>
                    <div class="">
                        <p class="Property_price"><i class="fa-light fa-tag"></i> <span class="price">${data[i].price} Taka</span></p>
                        <p class="location">${data[i].location}</p>
                        <p class="size"><i class="fa-regular fa-ruler-combined"></i> <span>${data[i].landamount} Katha</span></p>
                    </div>
                    
                </div>`;
                document.getElementById("all-property").appendChild(newland);
    
 }
    
}
}

getfewavaiableland();

// get few sold land

async function getfewsoldland(){
  const {data, error}= await supabase
 .from("landinfo")
    .select("*")
    .eq("status", "Sold")
    .limit(3);
   

    if(error)
    {
        alert("find No data"+ error);
    }
    else{  
        
 for(let i=0;i<data.length;i++) {

    
const newland=document.createElement("div");
newland.className="Property_card";

const landid=data[i].id;
newland.dataset.id= landid.toString();

newland.innerHTML=`  <img src="${data[i].pictureofland}" alt="Pictur of Land">
                <div class="Property_card_info">
                    <h4 class="Property_title">
                        ${data[i].location}
                    </h4>
                    <div class="">
                        <p class="Property_price"><i class="fa-light fa-tag"></i> <span class="price">${data[i].price} Taka</span></p>
                        <p class="location">${data[i].location}</p>
                        <p class="size"><i class="fa-regular fa-ruler-combined"></i> <span>${data[i].landamount} Katha</span></p>
                         <p class="location"><strong>Status</strong>: Sold</p>
                    </div>
                    
                </div>`;
                document.getElementById("all-sold-land").appendChild(newland);
    
 }
    
}
}

getfewsoldland();


// Onclick for available land
document.getElementById("all-property").addEventListener("click", function(event) {
    const target = event.target.closest(".Property_card");
    if (target) {
        // const landId = target.dataset.id;
        // localStorage.setItem("landId", landId);
        // localStorage.setItem("mobileNo", usermobileno);
        // window.location.href = "../HTML/landinfo.html";
  alert('Please Register First, Thank You');
  window.location.href ="../HTML/resistration.html"; 
    }
});

function senddata() {
    localStorage.setItem("mobileNo",usermobileno);
}


// Onclick for sold land
document.getElementById("all-sold-land").addEventListener("click", function(event) {
    const target = event.target.closest(".Property_card");
    if (target) {
        // const landId = target.dataset.id;
        // localStorage.setItem("landId", landId);
        // localStorage.setItem("mobileNo", usermobileno);
        // window.location.href = "../HTML/landinfo.html";
      alert('Please Register First, Thank You');
      window.location.href ="../HTML/resistration.html"; 
    }
});




