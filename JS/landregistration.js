    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);
  const mobileNo=localStorage.getItem("mobileNo");
   // const mobileNo="01779073103";
   // alert(mobileNo);
    const submitBtn = document.getElementById("button");

    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();
 
   const picture=document.getElementById("Picture").files[0];
    if (!picture) {
    alert("Please select a profile picture.");
    return;
  }

const fileRef = `land_${Date.now()}_${picture.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("landpicture")
    .upload(fileRef, picture);

  if (uploadError) {
    console.error("Upload Error:", uploadError.message);
    alert("Failed to upload picture.");
    return;
  }
  else{
  alert("Picture uploaded successfully");
  }
 // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("landpicture")
    .getPublicUrl(fileRef);
  const imageUrl = publicUrlData.publicUrl;
  
  // Insert into table of landinfo
   const location = document.getElementById("Location").value;
      const price = document.getElementById("Price").value;
      const landAmount = document.getElementById("AmountOfLand").value;
      const type = document.getElementById("LandType").value;
      const facing = document.getElementById("Facing").value;
      const ownername = document.getElementById("OwnerName").value;
      const landImageFile = document.getElementById("Picture").files[0];
      const ownerlocation = document.getElementById("OwnerAddress").value;
      const flatsize= document.getElementById("FlatSize").value;
      const fathername = document.getElementById("OwnerFName").value;
      const nid=document.getElementById("OwnerNID").value;
      const numberofowner = document.getElementById("NumberOfOwner").value;
      const landdescription = document.getElementById("ShortNote").value;
      const ownermobile = document.getElementById("OwnerMobile").value;

            const { data, error } = await supabase.from("landinfo").insert([
        {
          registermobile: mobileNo,
          location: location,
          price: price,
          landamount: landAmount,
          type: type,
          facing: facing,
          pictureofland: imageUrl,
          ownername: ownername,
          status: "Available",
          dateofregister: new Date(),
          numberofowner: numberofowner,
          landdescription: landdescription,
          flatsize: flatsize,
          owneraddress: ownerlocation,
          nid: nid,
          fathername: fathername,
          ownermobile: ownermobile

        }
      ]);


      if (error) {
        alert("Submission failed: " + error.message);
      } else {
        alert("Land registered successfully!");
      }

    });

 const  navbarname=document.getElementById("navbar-name");


  async function getuserdata() {
    const{data, error}=  await  supabase
  .from('users')
  .select("*")
  .eq("mobile",mobileNo)
  .single();

  if(error){
    alert("sorry");
  }
  else{

    navbarname.innerHTML=data.name;

  }
}

getuserdata();

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

// JavaScript for log out Page
document.getElementById("logout-btn").addEventListener("click", function() {
   window.location.href = "../HTML/LogOut.html";
  

});

// send data

function senddata() {
    localStorage.setItem("mobileNo",usermobileno);
}