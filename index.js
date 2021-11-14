//  As a user, I want to be able to search for books

//  get item on click from search results

// make fetch based on user input? or fetch entire database?
const searchButton = document.querySelector('#searchBtn')
const searchInput = document.querySelector('#search-input')

const booksRead = []
const booksToRead = []
const bookRating = [1,2,3,4,5]


searchButton.addEventListener('click', function (event) {
  searchBook(searchInput.value)
})
console.log(searchInput.value)

document.addEventListener('click', event => {
  if (event.target.matches(".fa-star")) {
    let selectedStar = document.querySelector(".fa-star");
    console.log(selectedStar)
  }
})


function searchBook(query) {
  const url = `https://openlibrary.org/search.json?title=${query}`;
  fetch(url)
    .then(res => res.json())
    .then((jsonData) => {
      const results = jsonData.docs
      // console.log(results)
      results.forEach((element) => {
        
        const bookListItem = document.createElement("li");
        bookListItem.classList.add("list-group-item");
     
        let list = document.querySelector("#searchResultsList");
        list.appendChild(bookListItem);

        const bookTitle = document.createElement("h3");
        bookTitle.appendChild(document.createTextNode(`${element.title}`));
        bookListItem.appendChild(bookTitle);

        const item = document.createElement("p")
        item.appendChild(document.createTextNode(`Author: ${element.author_name}`));
        bookListItem.appendChild(item);

        const readButton = document.createElement('button')
        readButton.appendChild(document.createTextNode('have read'));
        readButton.classList.add("btn");
        readButton.classList.add("btn-primary");
        bookListItem.appendChild(readButton);

        const wantReadButton = document.createElement('button')
        wantReadButton.appendChild(document.createTextNode('want to read'));
        wantReadButton.classList.add("btn");
        wantReadButton.classList.add("btn-primary");
        bookListItem.appendChild(wantReadButton);

        bookRating.forEach((bookRatingElement, index) => {
          const ratingStar = document.createElement('i')
          ratingStar.classList.add("fas")
          ratingStar.classList.add("fa-star")
          bookListItem.appendChild(ratingStar);
          
           ratingStar.addEventListener('click', function (event) {
          
          //   bookRating.forEach((activeRatingElement, ratingIndex) => { 

  
          //     ratingStar.classList.add("activeStar")
  

          //   // console.log(event.target.element)
          //   // console.log('this is the rating' + activeRatingElement)
            
          //   //  console.log(bookRatingElement)
          // })
            
           })
        })

        wantReadButton.addEventListener('click', function (event) {


          fetch('http://localhost:3000/wantRead',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: element.title,
                author: element.author_name,
                key: element.key,
                haveRead: false,
                wantRead: true,

              })
          
            }).then(result => {
              return result.json();
            })
          .then(data => {console.log(data)})
          
          booksToRead.push(element.title)
          console.log(booksToRead)

          
        })

          readButton.addEventListener('click', function (event) {
            fetch('http://localhost:3000/haveRead',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title: element.title,
                author: element.author_name,
                key: element.key,
                haveRead: true,
                wantRead: false,

              })
          
            }).then(result => {
              return result.json();
            })
          .then(data => {console.log(data)})
          
          booksToRead.push(element.title)
          console.log(booksToRead)

          
        })
          
          
          
          
          
          
          
          
          
            booksRead.push(element)
          console.log(booksRead)

          
        })

        
      })

    })
    
  
}




//  As a user I want to be able to add books from my search results to my list of books to read, or books I have read

//  As a user, I want to track books I have read

//  As a user, I need to be able to rate books I have read

//  As a user, I want to be able to make a list of books I want to read

//  The App must be well designed and have a well thought out user interface with a focus on the user experience. (While this ins't a design class, often times a developer will have to make these choices)
