import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);

const submit = document.getElementById("submit");

submit.addEventListener("click", async function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let fatherName = document.getElementById("f_name").value.trim();
  let nid = document.getElementById("NID").value.trim();
  let dob = document.getElementById("dob").value;
  let mobileNo = document.getElementById("m_n").value.trim();
  let password = document.getElementById("pw").value;
  let confirmPassword = document.getElementById("pw2").value;
  let address = document.getElementById("address").value;
  let email = document.getElementById("email").value;
  let fileInput = document.getElementById("profile-picture");
  let file = fileInput.files[0];

  if (!file) {
    alert("Please select a profile picture.");
    return;
  }

  // Upload profile picture
  const fileRef = `profile_${Date.now()}_${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("profilepicture")
    .upload(fileRef, file);
    

  if (uploadError) {
    console.error("Upload Error:", uploadError.message);
    alert("Failed to upload picture.");
    return;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("profilepicture")
    .getPublicUrl(fileRef);
  const imageUrl = publicUrlData.publicUrl;


  // Insert into table
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        name: name,
        father_name: fatherName,
        nid: nid,
        dob: dob,
        mobile: mobileNo,
        password: password,
        email: email,
        address: address,
        profilepicture: imageUrl
      }
    ]);

  if (error) {
    console.error('Insert Error:', error.message);
    alert('Failed to register.');
  } else {
    alert('Registration successful!');
    console.log('Inserted:', data);
  }
});

