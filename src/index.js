import './style.css';

// Event listeners for the search button
document.querySelector('#submit-button').addEventListener('click', searchListBooks);

// When user inputs the search bar and clicked search button, start searching
function searchListBooks(event) {
	let query = document.querySelector('#search-input').value;
	// Initiate the fetch API
	fetch(`https://openlibrary.org/subjects/${query}.json?details=true`)
      .then((res) => res.json())
      .then((data) => {
      	// Filter the search results by author, title, and subtitle
      	let output = '';
      	data.works.forEach(book => {
      		output += `
          <div class="results-box">
      		<ul>
	      		<li><b>Title:</b> ${book.title}</li>
	      		<li><b>Author:</b>`;
				book.authors.forEach(author =>{
						output += `${author.name}`;
				});
				output += `</li>
            <a href="javascript:void(0)" onclick="searchBook('${book.key}')"><button class="book-info"><b>See this book</b></button></a>
      		</ul>
          </div>
      		`;
      	});
      	// Display the search result
    		document.querySelector("#output").innerHTML = output;
      })
      // Throw an error message when something went wrong during the search
      .catch((error) => console.log(error));

      // Display "Search results of" text when clicked the search button
	  document.querySelector('.text').innerHTML = `Search results for: "${query}"`
}

function searchBook(keyBook){
	fetch(`https://openlibrary.org${keyBook}.json`)
      .then((res) => res.json())
      .then((data) => {
      	let output = '';
      	output += `
          <div class="results-box">
      		<ul>
	      		<li><b>Title:</b> ${data.title}</li>
	      		<li><b>Description:</b> ${data.description}</li>
			</ul>
          </div>
      		`;
		document.querySelector("#output").innerHTML = output;
      })
      .catch((error) => console.log(error));
	  document.querySelector('.text').innerHTML = "Search result of book"

}

// Start searching the lists when user clicks entry key
document.querySelector("#search-input").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.querySelector("#submit-button").click();
    }
})