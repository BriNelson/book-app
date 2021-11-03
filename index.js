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
      const results = jsonData.docs
      console.log(results)
      results.forEach((element) => {
        
        const bookListItem = document.createElement("li");
        bookListItem.classList.add("list-group-item");
     console.log(element)
        let list = document.querySelector("#searchResultsList");
        list.appendChild(bookListItem);

        const bookTitle = document.createElement("h1");
        bookTitle.appendChild(document.createTextNode(`${element.title}`));
        bookListItem.appendChild(bookTitle);

        const item = document.createElement("p")
        item.appendChild(document.createTextNode(`${element.author_name}`));
        bookListItem.appendChild(item);

        
      })

    })
    
  
}




//  As a user I want to be able to add books from my search results to my list of books to read, or books I have read

//  As a user, I want to track books I have read

//  As a user, I need to be able to rate books I have read

//  As a user, I want to be able to make a list of books I want to read

//  The App must be well designed and have a well thought out user interface with a focus on the user experience. (While this ins't a design class, often times a developer will have to make these choices)
