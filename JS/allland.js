
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // setting up Supabase client

  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);
  //const userer=localStorage.getItem(mobileNo);
 const usermobile="01779073101";

let username=document.getElementById("user-name");





let type,price,amount,location,facing,name;
// get user data


async function getusererdata(){
    const{ data, error }= await supabase
    .from("users")
    .select("*")
    .eq("mobile",usermobile)
    .single();

    if(error)
    {
        alert("find No data of user", error);
    }
    else{

username.innerHTML=data.name;

    }
}

username.addEventListener("click",function()
{
window.location.href="../HTML/ownerinfo.html";
localStorage.setItem("mobileNo",usermobile);

});


getusererdata();

// get land data 

async function getlanddata(){
    const{ data, error }= await supabase
    .from("landinfo")
    .select("pictureofland,location,price,landamount,registermobile,id,type,status")
    .eq("status","Available");
   

    if(error)
    {
        alert("find No data", error);
    }
    else{  
        
 data.forEach(data => {
    let heading;
if(data.type == "Agricultural")
{
  heading= "Premium Agricultural Land For sell in " + data.location;
}
else{
  heading= "Premium " + data.type +" For sell in " + data.location;
}

    
const newland=document.createElement("div");
newland.className="Property_card";

const landid=data.id;
newland.dataset.id= landid.toString();

newland.innerHTML=`  <img src="${data.pictureofland}" alt="Pictur of Land">
                <div class="Property_card_info">
                    <h4 class="Property_title">
                        ${heading}
                    </h4>
                    <div class="">
                        <p class="Property_price"><i class="fa-light fa-tag"></i> <span class="price">${data.price} Taka</span></p>
                        <p class="location">${data.location}</p>
                        <p class="size"><i class="fa-regular fa-ruler-combined"></i> <span>${data.landamount} Katha</span></p>
                    </div>
                    
                </div>`;
                document.getElementById("all-property").appendChild(newland);
    
 });
    
    }
}

getlanddata();




// JavaScript for Land Registration Page

function addproperty(){
  window.location.href = "../HTML/AddLandForSell.html";
  localStorage.setItem("mobileNo",usermobile);
}

document.querySelector("#add-property-btn").addEventListener("click", addproperty);


// JavaScript to handle click events on land cards
   document.getElementById("all-property").addEventListener("click", function (e) {
  const card = e.target.closest(".Property_card");
  if (card) {
    const landid = card.dataset.id;
    alert(landid);
    localStorage.setItem("landid", landid);
    window.location.href = "../HTML/landinfo.html";
  }
});

// Set data for lelp page and about

function senddata() {
    localStorage.setItem("mobileNo",usermobileno);
}

// notification 

document.getElementById("notification").addEventListener("click", function() {
  window.location.href = "../HTML/notification.html";
  localStorage.setItem("mobileNo", usermobileno);
});

// JavaScript for Land Registration Page

document.getElementById("add-property-btn").addEventListener("click", function() {
   window.location.href = "../HTML/AddLandForSell.html";
    localStorage.setItem("mobileNo", usermobileno);

});