import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);

const usermobileno = localStorage.getItem("mobileNo");

 // const usermobileno = "01779073101"; // Example mobile number for testing
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