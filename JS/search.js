import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  // Replace with your actual project values
  const supabaseUrl = 'https://piyoxjnheqxjuirsvjfh.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpeW94am5oZXF4anVpcnN2amZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODkxNjksImV4cCI6MjA2NDA2NTE2OX0.3obYtWnE210mFbwWMhAF-k55i5IRSDV9PlF-fQqY1F8';
 
const supabase = createClient(supabaseUrl, supabaseKey);

//const usermobileno = localStorage.getItem("mobileNo");
// const usermobileno = "01779073101"; // Example mobile number for testing
const searchButton = document.getElementById("searchButton");

// Function for searching users

searchButton.addEventListener("click", async function() {
  const searchInput = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = ""; // Clear previous results
  const searchResultsContainer = document.getElementById("searchResultsContainer");

  const { data, error } = await supabase
  .from('users')
  .select('*')
  .ilike('name', `%${searchInput}%`);
  if (error) {
    console.error('Error fetching user data:', error);
    return;
  }
 if(data.length > 0) {
    searchResultsContainer.style.display= "block";
   data.forEach(user => {
     const li = document.createElement("li");
     li.textContent = user.name + "    "+user.mobile;
     resultsContainer.appendChild(li);
   });
  }
  else{
    searchResultsContainer.style.display= "block";
    const li=document.createElement("li");
    li.textContent = "No results found"; 
    resultsContainer.appendChild(li);
    return;
  }

});