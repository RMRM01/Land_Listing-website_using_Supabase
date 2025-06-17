import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);


const mobileNo = localStorage.getItem("mobileNo");

 //const mobileNo="01779073103"; // Example mobile number for testing

 alert(mobileNo);
 const profilename=document.getElementById("owner-page-name");
 const navbarname=document.getElementById("navbar-name");
 const profileemail=document.getElementById("owner-page-email");
 const profilemobile=document.getElementById("owner-page-phone");
 const profileaddress=document.getElementById("owner-location");
 const profilepicture=document.getElementById("owner-profile-picture");
 profilemobile.innerHTML="+88"+mobileNo;



  async function getuserdata() {
    const{data, error}=  await  supabase
  .from('users')
  .select("*")
  .eq("mobile",mobileNo)
  .single();

  if(error){
    alert("sorry can't "+error.message);
  }
  else{
   
 
    profilename.innerHTML=data.name;
    profileaddress.innerHTML=data.address;
    profileemail.innerHTML=data.email;  
    profilepicture.src=data.profilepicture;
    profilepicture.alt=data.name;
    navbarname.innerHTML=data.name;
  }
}

 getuserdata();

function addproperty(){
  window.location.href = "../HTML/AddLandForSell.html";
  localStorage.setItem("mobileNo",mobileNo);
}

document.querySelector(".add-property-btn").addEventListener("click", addproperty);


// get all land data for owner



async function getlanddata(){
   
   
    const{ data, error }= await supabase
    .from("landinfo")
    .select("*")
    .eq("status", "Available")
    .eq("registermobile", mobileNo);
    
   

    if(error)
    {
        alert("find No data", error);
    }
    else{
        await Promise.all(
          data.map(async data => {

let heading;
if(data.type == "Agricultural")
{
  heading= "Premium Agricultural Land in " + data.location;
}
else{
  heading= "Premium " + data.type +" in " + data.location;
}



     //alert(data.id.toString());

const newland=document.createElement("a");
newland.className="listing-card";

newland.href="../HTML/landInfo.html";
newland.onclick = function (e) {
  //e.preventDefault();
  // Prevent default anchor behavior
  localStorage.setItem('landid', data.id.toString());
};


newland.innerHTML=`   <div class="listing-image">
              <img src="${data.pictureofland}" alt="Property in ${data.location}" />
            </div>
            <div class="listing-details">
              <h3 class="listing-title">${heading}</h3>
              <p class="listing-location">
                <i class="fas fa-map-marker-alt"></i> ${data.location}
              </p>
              <div class="listing-specs">
                <span><i class="fas fa-ruler-combined"></i> ${data.landamount} Katha</span>
              </div>
              <div class="listing-price">৳${data.price}</div>
               <button class="current-status-button"> Sold</button>
            </div>
                `;
                document.getElementById("listed-properties").appendChild(newland);
                const button = newland.querySelector(".current-status-button");
if (button) {
  button.addEventListener("click", async function (e) {
    e.stopPropagation(); // Prevent <a> click
    e.preventDefault();  // Prevent default behavior (especially for form buttons)
    //alert("Button inside dynamic card clicked!");
    const cardofsoldland = e.target.closest(".listing-card");
   const buyermobile = prompt("Please enter the mobile number who bought this land:");
   if(buyermobile) {
    if(cardofsoldland){
      cardofsoldland.remove();
    
    try {
        await updatestatus(data.id, buyermobile); 
      
      } catch (err) {
        
        console.error("Error updating status:", err);
      }

    }
   }
   else{
    alert("Please enter a mobile number.");
   }
  
  });
}
    
 })

);
 // Check if there are any listings

  const listedProperties = document.getElementById("listed-properties");

const listings = listedProperties.querySelectorAll(".listing-card");

if (listings.length === 0) {

    listedProperties.innerHTML += "<h2 class=\"no-property-card\">No properties Listed Yet.</h2>";
}


}
}

getlanddata();

// get statistics of user 

//grt statistics


async function getstatistics(){
   let numberoflistedland=0;
   let numberofsoldland=0;
   
    const{ data, error }= await supabase
    .from("landinfo")
    .select("status")
    .eq("registermobile", mobileNo);
   

    if(error)
    {
        alert("find No data", error);
    }
    else{
        data.forEach(data => {



if(data.status == "Sold" )
{
numberofsoldland++;
}
else{
  //alert(data.status);
  numberoflistedland++;
}

   //alert(numberoflistedland + " properties listed, " + numberofsoldland + " properties sold.");
    const sold=numberofsoldland.toString();
    const listed=numberoflistedland.toString();
     document.getElementById("active-listings").innerHTML = listed;
     document.getElementById("properties-sold").innerHTML = sold;

    });
    }
}

getstatistics();


// get experience 


async function getexperience()
{
     const{ data, error }= await supabase
    .from("users")
    .select("time")
    .eq("mobile", mobileNo)
    .single();
   

    if(error)
    {
        alert("find No data", error);
    }
    else{
    const time=new Date(data.time);
    const year=time.getFullYear();
    const month=time.getMonth();
    const day=time.getDate();
    const currenttime=new Date();
    const cyear=currenttime.getFullYear();
    const cmonth=currenttime.getMonth();
    const cday=currenttime.getDate();
    let dyear=cyear-year;
    let dmonth=cmonth-month;
    let dday=cday-day;
    if(dyear == 0)
    {
      if(dmonth < 12)
      {
        document.getElementById("experience").innerText=dmonth+1;
        document.getElementById("unit").innerText="Months";
      }
      else{
         document.getElementById("experience").innerText=1;
      }
    }
  else{
    document.getElementById("experience").innerText=dyear+1;
    
  }
    
    console.log(time.toLocaleString()+ currenttime.toLocaleString());
    
}
}


getexperience();

async function  soldlandtable(id, buyermobile) {
  const { data, error } = await supabase
    .from("sold-land")
    .insert([
      {
        land_id: id,
        buyer_mobile: buyermobile,
        owner_mobile: mobileNo
      }
    ]);

  if (error) {
    console.error("Insert error:", error.message);
    alert("Error inserting sold land data: " + error.message);
  } else {
    console.log("Insert success:", data);
    //alert("Land sold status updated successfully and data inserted into sold-land table.");
  }

  
}


async function updatestatus(id, buyermobile) {
   const { data, error } = await supabase
  .from("landinfo") // replace with your table name
  .update({ status: "Sold" }) // new value to update
  .eq("id", id); // condition to match the row


if (error) {
  console.error("Update error:", error.message);
} else {
  console.log("Update success:", data);
  getstatistics();
  soldlandtable(id, buyermobile);


}

}


// load sold land data
async function loadSoldLandData() {
  const { data, error } = await supabase
    .from("sold-land")
    .select("land_id")
    .eq("owner_mobile", mobileNo);
    

  if (error) {
    console.error("Error loading sold land data:", error.message);
  } else {
    console.log("Sold land data loaded successfully:", data);
    
  await Promise.all(
  data.map(item => displaySoldLands(item.land_id))
);
  // Check if there are any sold listings

const soldProperties = document.getElementById("sold-properties");
const soldListings = soldProperties.querySelectorAll(".listing-card");


if (soldListings.length === 0) {
    soldProperties.innerHTML += "<h2 class=\"no-property-card\">No properties Sold Yet.</h2>";
}
}
}


loadSoldLandData();


// Display all sold lands

async function displaySoldLands(soldlandid) {
const{ data, error }= await supabase
    .from("landinfo")
    .select("*")
    .eq("id", soldlandid)
    .single();
    
   

    if(error)
    {
        alert("find No data", error);
    }
    else{
        

let heading;
if(data.type == "Agricultural")
{
  heading= "Premium Agricultural Land Sold in " + data.location;
}
else{
  heading= "Premium " + data.type +" Sold in " + data.location;
}



     //alert(data.id.toString());

const newland=document.createElement("a");
newland.className="listing-card";

newland.href="../HTML/landInfo.html";
newland.onclick = function (e) {
  //e.preventDefault();
  // Prevent default anchor behavior
  localStorage.setItem('landid', data.id.toString());
};


newland.innerHTML=`   <div class="listing-image">
              <img src="${data.pictureofland}" alt="Property in ${data.location}" />
            </div>
            <div class="listing-details">
              <h3 class="listing-title">${heading}</h3>
              <p class="listing-location">
                <i class="fas fa-map-marker-alt"></i> ${data.location}
              </p>
              <div class="listing-specs">
                <span><i class="fas fa-ruler-combined"></i> ${data.landamount} Katha</span>
              </div>
              <div class="listing-price">৳${data.price}</div>
               
            </div>
                `;
                document.getElementById("sold-properties").appendChild(newland);
           
 //alert("Sold land displayed successfully.");
 
}
}


// Display bought land data



  

// load bought land data
async function loadBoughtLandData() {
  const { data, error } = await supabase
    .from("sold-land")
    .select("land_id")
    .eq("buyer_mobile", mobileNo);


  if (error) {
    console.error("Error loading sold land data:", error.message);
  } else {
    console.log("Sold land data loaded successfully:", data);
    
  

await Promise.all(
  data.map(item => displayBoughtLands(item.land_id))
);

    // Check if there are any bought listings

    const boughtProperties = document.getElementById("bought-properties");
    const boughtListings = boughtProperties.querySelectorAll(".listing-card");

    if (boughtListings.length === 0) {
        boughtProperties.innerHTML += "<h2 class=\"no-property-card\">No properties Bought Yet.</h2>";
    }

  }
}


loadBoughtLandData();


// Display all bought lands

async function displayBoughtLands(boughtlandid) {
const{ data, error }= await supabase
    .from("landinfo")
    .select("*")
    .eq("id", boughtlandid)
    .single();
    
   

    if(error)
    {
        alert("find No data", error);
    }
    else{
        

let heading;
if(data.type == "Agricultural")
{
  heading= "Premium Agricultural Land Bought in " + data.location;
}
else{
  heading= "Premium " + data.type +" Bought in " + data.location;
}



     //alert(data.id.toString());

const newland=document.createElement("a");
newland.className="listing-card";

newland.href="../HTML/landInfo.html";
newland.onclick = function (e) {
  //e.preventDefault();
  // Prevent default anchor behavior
  localStorage.setItem('landid', data.id.toString());
};


newland.innerHTML=`   <div class="listing-image">
              <img src="${data.pictureofland}" alt="Property in ${data.location}" />
            </div>
            <div class="listing-details">
              <h3 class="listing-title">${heading}</h3>
              <p class="listing-location">
                <i class="fas fa-map-marker-alt"></i> ${data.location}
              </p>
              <div class="listing-specs">
                <span><i class="fas fa-ruler-combined"></i> ${data.landamount} Katha</span>
              </div>
              <div class="listing-price">৳${data.price}</div>
               
            </div>
                `;
                document.getElementById("bought-properties").appendChild(newland);

 //alert("Sold land displayed successfully.");
 
}
}

// click on notification 

document.getElementById("notification").addEventListener("click", function() {
  window.location.href = "../HTML/notification.html";
  localStorage.setItem("mobileNo", usermobileno);
});





