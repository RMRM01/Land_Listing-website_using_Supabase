import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);

const usermobileno=localStorage.getItem("mobileNo");
//const usermobileno="01779073103";
//alert(usermobileno);
async function fetchUserData() {
    const {data, error}= await supabase
    .from("users")
    .select("name")
    .eq("mobile",usermobileno)
    .single();
    if (error) {
        console.error("Error fetching user data:", error);
    } 

    else {
        document.getElementById("user-name").innerText = data.name;
    }
}

fetchUserData();


// JavaScript for Land Registration Page

document.getElementById("add-property-btn").addEventListener("click", function() {
   window.location.href = "../HTML/AddLandForSell.html";
    localStorage.setItem("mobileNo", usermobileno);

});


// JavaScript for log out Page
document.getElementById("logout-btn").addEventListener("click", function() {
   window.location.href = "../HTML/LogOut.html";
  

});

// go to owner page


document.getElementById("user-id").addEventListener("click", function() {
   window.location.href = "../HTML/ownerinfo.html";
    localStorage.setItem("mobileNo", usermobileno);

});

function gettime(time){
    
let hours=time.getHours();
const minut=time.getMinutes();
const second=time.getSeconds();
alert(hours);
let ampm;
if(hours>= 12)
{
    ampm="PM";
}
else{
    ampm="AM";
}
hours=(hours+6)%12;
alert(hours);
return hours+":"+minut+":"+second+" "+ampm;
}

async function fetchNotifications() {
    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("registerer_mobile", usermobileno)
        .eq("is_read", "FALSE")
        .order('created_at', { ascending: false });


    if (error) {
       // alert("Error fetching notifications:" + error);
        console.error("Error fetching notifications:" , error);
    } else {
        const notificationList = document.getElementById("container");
       

  notificationList.innerHTML = ""; // Clear existing notifications

        
          data.forEach(notification => {
    const listItem = document.createElement("div");
    listItem.className = "notification";
   const time=gettime(new Date(notification.created_at));
   //alert(time);
    listItem.innerHTML = `
        <h3>Customer Contact Request</h3>
        <p>${notification.message}</p>
        <p>${notification.buyer_mobile}</p>
        <span class="time">${new Date(notification.created_at).toLocaleDateString()} ${time.toString()} </span>
    `;
    
    notificationList.appendChild(listItem);
});

   
    
    }
}

fetchNotifications();

// data for help and about page
function senddata() {
    localStorage.setItem("mobileNo",usermobileno);
}
