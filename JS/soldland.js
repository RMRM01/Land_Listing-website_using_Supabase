import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // setting up Supabase client
  
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);
 const user=localStorage.getItem("mobileNo");
 //const user="01779073101";

let username=document.getElementById("owner-name");

async function getownerdata(){
    const{ data, error }= await supabase
    .from("users")
    .select("name")
    .eq("mobile",user)
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
localStorage.setItem("mobileNo",user);

});


getownerdata();



// JavaScript for Land Registration Page

function addproperty(){
  window.location.href = "../HTML/AddLandForSell.html";
  localStorage.setItem("mobileNo",user);
}

document.querySelector("#add-property-btn").addEventListener("click", addproperty);



//get the sold date of land from sold-land table

async function getsolddate(landid){ 

    const { data, error } = await supabase
    .from("sold-land")
    .select("sold_at,buyer_mobile")
    .eq("land_id", landid)
    .single();

    if (error) {
        console.error("Error fetching sold date:", error);
       return { soldDate: "N/A", buyerMobile: "N/A" };  // Return a default value if there's an error
    }
 else{
    const soldDate = new Date(data.sold_at).toLocaleDateString();
    const buyerMobile= data.buyer_mobile;


 return {soldDate, buyerMobile}; // Format the date or return "N/A" if not available
 }
   
}


// get sold land data from the database 


async function getsoldlanddata() {
  const { data, error } = await supabase
    .from("landinfo")
    .select("*")
    .eq("status", "Sold");

  if (error) {
    alert("No data found");
    console.error(error);
  } else {
    for (const land of data) {
      let heading;

      if (land.type === "Agricultural") {
        heading = "Premium Agricultural Land in " + land.location;
      } else {
        heading = "Premium " + land.type + " in " + land.location;
      }

      const newland = document.createElement("div");
      newland.className = "Property_card";

     const { soldDate, buyerMobile } = await getsolddate(land.id); // ✅ Now works correctly
      

      const landid = land.id.toString();
      newland.dataset.id = landid;

      newland.innerHTML = `
        <img src="${land.pictureofland}" alt="Picture of Land">
        <div class="Property_card_info">
          <h4 class="Property_title">${heading}</h4>
          <div>
            <p class="Property_price"><i class="fa-light fa-tag"></i> <span class="price">${land.price} Taka</span></p>
            <p class="location">${land.location}</p>
            <p class="size"><i class="fa-regular fa-ruler-combined"></i> <span>${land.landamount} Katha</span></p>
            <p class="status">Status: <span class="status-value">Sold</span></p>
            <p class="date">Date Of Sold: <span class="sold-date">${soldDate}</span></p>
            <a href="#" class="buier-info" class-id="${buyerMobile}"><i class="fa-solid fa-person"></i> Buyer</a>
          </div>
        </div>
      `;

      document.getElementById("all-property").appendChild(newland);
    }
  }
}


getsoldlanddata();

//notification page
document.getElementById("notification").addEventListener("click", function() {
  window.location.href = "../HTML/notification.html";
  localStorage.setItem("mobileNo", usermobileno);
});
