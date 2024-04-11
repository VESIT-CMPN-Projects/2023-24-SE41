function loadClient() {
   gapi.client.setApiKey("AIzaSyBlTzEE5pmSbUE0HBqdpHDvbCDs8cWFdrw");
   return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
       .then(function() { console.log("GAPI client loaded for API"); },
             function(err) { console.error("Error loading GAPI client for API", err); });
 }
 // Make sure the client is loaded before calling this method.
 function execute() {
   return gapi.client.search.cse.list({})
       .then(function(response) {
               // Handle the results here (response.result has the parsed body).
               console.log("Response", response);
             },
             function(err) { console.error("Execute error", err); });
 }
 gapi.load("client");

 document.addEventListener('DOMContentLoaded', function() {
   var searchInput = document.getElementById('searchInput');
   var searchButton = document.getElementById('searchButton');
   var recommendationsDiv = document.getElementById('recommendations');

   searchButton.addEventListener('click', function() {
       var searchTerm = searchInput.value.trim();
       if (searchTerm !== '') {
           recommendJobs(searchTerm);
       }
   });

   function recommendJobs(title) {
       // You might want to use AJAX or fetch to send the title to the server
       // and get recommendations in response.
       // For simplicity, I'll just show the recommendations on the client side.

       // Simulate getting recommendations on the client side
       var jobs = recommendation(title);

       // Display recommendations
       recommendationsDiv.innerHTML = '';
       if (jobs.length > 0) {
           var ul = document.createElement('ul');
           jobs.forEach(function(job) {
               var li = document.createElement('li');
               li.textContent = job;
               ul.appendChild(li);
           });
           recommendationsDiv.appendChild(ul);
       } else {
           recommendationsDiv.textContent = 'No recommendations found.';
       }
   }

   function recommendation(title) {
      // Simulate getting recommendations based on the entered title
      // You should replace this with your actual recommendation logic
      var idx = df[df['Title'] === title].index[0];
      idx = df.index.get_loc(idx);
  
      // Use sort for sorting, and arrow function for key function
      var distances = [...Array(similarity[idx].length).keys()]
                      .sort((a, b) => similarity[idx][b] - similarity[idx][a])
                      .slice(1, 20);
  
      var jobs = [];
      for (var i of distances) {
          jobs.push(df.iloc[i].Title);
      }
  
      return jobs;
  }
  
});
