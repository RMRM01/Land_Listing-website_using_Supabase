import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);
const usermobile=localStorage.getItem("mobileNo"); 


//const usermobile="01779073101";


const landid= localStorage.getItem("landId"); 
//const landid= "3c3e7cc7-e67f-440d-98d2-1238b905a8c7"; 

alert(landid);



async function fetchUserData() {
    const {data, error}= await supabase
    .from("users")
    .select("name")
    .eq("mobile",usermobile)
    .single();
    if (error) {
        console.error("Error fetching user data:", error);
    } 

    else {
        document.getElementById("user-name").innerText = data.name;
    }
}

fetchUserData();




let type,price,amount,location,facing,name;


async function getlanddata(){
    const{ data, error }= await supabase
    .from('landinfo')
    .select("*")
    .eq("id",landid)
    .single();

    if(error)
    {
        alert("find No data", error);
    }
    else{
        let heading;
if(data.type == "Agricultural")
{
  heading= "Premium Agricultural Land in " + data.location;
}
else{
  heading= "Premium " + data.type +" in " + data.location;
}  
 
        price=data.price;
        amount=data.landamount;
      
        type=data.type;
       facing=data.facing;
       const locationinmap=document.getElementById("locationinmap");
       const encodedLocation = encodeURIComponent(data.location);
       locationinmap.src=`https://www.google.com/maps?q=${encodedLocation}&output=embed`;
       document.getElementById("property-price").innerHTML = price;
       document.getElementById("property-title-main").innerHTML = heading;
       document.getElementById("property-location").innerHTML = data.location;
       document.getElementById("property-location-onmap").innerHTML += data.location;
       document.getElementById("property-area").innerHTML = amount ;
       document.getElementById("property-area-details").innerHTML = amount ;
       document.getElementById("property-type").innerHTML = type;
       document.getElementById("property-facing").innerHTML = facing;
      
       document.getElementById("owner-phone").innerHTML = data.registermobile; 
       document.getElementById("owner-mobile-link").href = data.registermobile; 
       
// picture of land

 document.getElementById("pictureofland").innerHTML = `<img
              src="${data.pictureofland}"
              alt="Plot Front View"
             class="active"
              
            />`;
            return data.registermobile;
}

}

const registermobile = await getlanddata();

async function getownerdata(){
  
 
 

    const{data,error} = await supabase
    .from("users")
    .select("*")
    .eq("mobile",registermobile)
    .single();
    if(error)
    {
        alert(error);
    }
    else{   
       document.getElementById("owner-email").href = data.email;  
       document.getElementById("owner-email").innerHTML = data.email;  
       document.getElementById("owner-pic").alt = data.name;  
       document.getElementById("owner-pic").src = data.profilepicture; 
        document.getElementById("owner-name").innerHTML = data.name; 
      
     
    }
    
}
document.getElementById("view-profile-btn").addEventListener("click", function(e){
e.preventDefault();
localStorage.setItem("mobileNo",registermobile);
window.location.href="../HTML/ownerInfo.html";
});
getownerdata();

  document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-property-image");
  const thumbnailContainer = document.querySelector(".thumbnail-images");

  thumbnailContainer.addEventListener("click", function (event) {
    const clickedImg = event.target;
    if (clickedImg.tagName === "IMG") {
      mainImage.src = clickedImg.src;
      mainImage.alt = clickedImg.alt;

      const allThumbs = thumbnailContainer.querySelectorAll("img");
      allThumbs.forEach((t) => t.classList.remove("active"));
      clickedImg.classList.add("active");
    }
  });
});


// send notification to owner


const buybutton = document.getElementById("buy-land-btn");

buybutton.addEventListener("click", async function () {
  

  const message = "A buyer is interested in your land.";

  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        registerer_mobile: registermobile,
        buyer_mobile: usermobile,
        land_id: landid,
        message: message
      }
    ]);

  if (error) {
    console.error("Error sending notification:", error);
    alert("Failed to send buy request.");
  } else {
   alert("Land Buying Request has been sent to the owner. Please wait for the owner's response.");
  }

  

});

// notification 

document.getElementById("notification").addEventListener("click", function() {
  window.location.href = "../HTML/notification.html";
  localStorage.setItem("mobileNo", usermobileno);
});
// go to owner page


document.getElementById("user-name").addEventListener("click", function() {
   window.location.href = "../HTML/ownerinfo.html";
    localStorage.setItem("mobileNo", usermobileno);

});



// JavaScript for Land Registration Page

document.getElementById("add-property-btn").addEventListener("click", function() {
   window.location.href = "../HTML/AddLandForSell.html";
    localStorage.setItem("mobileNo", usermobileno);

});


// JavaScript for log out Page
document.getElementById("logout-btn").addEventListener("click", function() {
   window.location.href = "../HTML/LogOut.html";
  

});

// send data

function senddata() {
    localStorage.setItem("mobileNo",usermobileno);
}