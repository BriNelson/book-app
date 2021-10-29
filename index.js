//  As a user, I want to be able to search for books

//  get item on click from search results

// make fetch based on user input? or fetch entire database?
const searchButton = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#search-input')


searchButton.addEventListener('click', function (event) {
  searchBook(searchInput.value)
})
console.log(searchInput.value)


function searchBook(query) {
  const url = `https://openlibrary.org/search.json?title=${query}`;
  fetch(url)
    .then(res => res.json())
    .then((jsonData) => {
      const results = jsonData.docs.map(element => element.title);
      console.log(results)
      results.forEach((element) => {
        
        const bookListItem = document.createElement("li");
        bookListItem.classList.add("item-div");

        let list = document.querySelector("#searchResultsList");
        list.appendChild(itemDiv);
        
      })

    })
    
  
}




//  As a user I want to be able to add books from my search results to my list of books to read, or books I have read

//  As a user, I want to track books I have read

//  As a user, I need to be able to rate books I have read

//  As a user, I want to be able to make a list of books I want to read

//  The App must be well designed and have a well thought out user interface with a focus on the user experience. (While this ins't a design class, often times a developer will have to make these choices)
