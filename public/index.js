//  As a user, I want to be able to search for books

//  get item on click from search results

// make fetch based on user input? or fetch entire database?
const searchButton = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#search-input");

const booksRead = [];
const booksToRead = [];
const bookRating = [1, 2, 3, 4, 5];

searchButton.addEventListener("click", function (event) {
  searchBook(searchInput.value);
});
console.log(searchInput.value);

document.addEventListener("click", (event) => {
  if (event.target.matches(".fa-star")) {
    console.log("this works");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.matches(".readlist-btn")) {
    // const selectedStar = document.querySelector('.fa-star')
    readListConstructor();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.matches(".wishlist-btn")) {
    wishListConstructor("#wishList");
  }
});

function readListConstructor() {
  document.querySelector("#readList").innerHTML = "";
  console.log("is this working");
  fetch("/wantReadList")
    .then((result) => {
      console.log(result);
      return result.json();
    })
    .then((data) => {
      console.log(data[0]._id);

      data.forEach((element, index) => {
        if (element.haveRead === true) {
          const bookListItem = document.createElement("li");
          bookListItem.classList.add("list-group-item");

          const list = document.querySelector("#readList");
          list.appendChild(bookListItem);

          const bookTitle = document.createElement("h3");
          bookTitle.appendChild(document.createTextNode(`${element.title}`));
          bookListItem.appendChild(bookTitle);

          const item = document.createElement("p");
          item.appendChild(
            document.createTextNode(`Author: ${element.author}`)
          );
          bookListItem.appendChild(item);

          bookRating.forEach((bookRatingElement, index) => {
            const ratingStar = document.createElement("i");
            ratingStar.classList.add("fas");
            ratingStar.classList.add("fa-star");
            bookListItem.appendChild(ratingStar);

            // bookRating.forEach((activeRatingElement, ratingIndex) => {
            //   ratingStar.classList.add('activeStar')
            //   // console.log(event.target.element)
            //   // console.log('this is the rating' + activeRatingElement)
            //   //  console.log(bookRatingElement)
            // })
          });

          const deleteButton = document.createElement("button");
          deleteButton.appendChild(document.createTextNode("delete"));
          deleteButton.classList.add("btn");
          deleteButton.classList.add("btn-primary");
          bookListItem.appendChild(deleteButton);

          deleteButton.addEventListener("click", (event) => {
            // console.log('this works')
            fetch("/" + element._id, {
              method: "DELETE",
            })
              .then((result) => {
                return result.json();
              })
              .then((data) => {
                console.log(data);
              });

            readListConstructor();
          });

          console.log(element.title);
        }
      });
    });
}

function wishListConstructor(listType) {
  document.querySelector(listType).innerHTML = "";
  // const selectedStar = document.querySelector('.fa-star')
  console.log("is this working");
  fetch("/wantReadList")
    .then((result) => {
      console.log(result);
      return result.json();
    })
    .then((data) => {
      console.log(data[0]._id);

      data.forEach((element, index) => {
        if (element.wantRead === true) {
          const bookListItem = document.createElement("li");
          bookListItem.classList.add("list-group-item");

          const list = document.querySelector(listType);
          list.appendChild(bookListItem);

          const bookTitle = document.createElement("h3");
          bookTitle.appendChild(document.createTextNode(`${element.title}`));
          bookListItem.appendChild(bookTitle);

          const item = document.createElement("p");
          item.appendChild(
            document.createTextNode(`Author: ${element.author}`)
          );
          bookListItem.appendChild(item);

          bookRating.forEach((bookRatingElement, index) => {
            const ratingStar = document.createElement("i");
            ratingStar.classList.add("fas");
            ratingStar.classList.add("fa-star");
            bookListItem.appendChild(ratingStar);

            // bookRating.forEach((activeRatingElement, ratingIndex) => {
            //   ratingStar.classList.add('activeStar')
            //   // console.log(event.target.element)
            //   // console.log('this is the rating' + activeRatingElement)
            //   //  console.log(bookRatingElement)
            // })
          });

          const completedBtn = document.createElement("button");
          completedBtn.appendChild(document.createTextNode("completed"));
          completedBtn.classList.add("btn");
          completedBtn.classList.add("btn-primary");
          bookListItem.appendChild(completedBtn);
          
          completedBtn.addEventListener("click", (event) => {
            fetch("/" + element._id, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
               
                haveRead: true,
                
              }),
            })
              .then((result) => {
                
                
                return result
                
              })
              .then((data) => {
                console.log(data, "this from index.js");
              });

           })
          
          
          
          
          
          
          const deleteButton = document.createElement("button");
          deleteButton.appendChild(document.createTextNode("delete"));
          deleteButton.classList.add("btn");
          deleteButton.classList.add("btn-primary");
          bookListItem.appendChild(deleteButton);
          

          deleteButton.addEventListener("click", (event) => {
            // console.log('this works')

            fetch("/" + element._id, {
              method: "DELETE",
            })
              .then((result) => {
                return result.json();
              })
              .then((data) => {
                console.log(data);
              });

            wishListConstructor(listType);
          });

          console.log(element.title);
        }
      });
    });
}

// fetch all books(for now)

// fetch("/wantReadList")
//   .then(res => res.json())
//   .then((jsonData) => {
//     console.log(jsonData)

//   })

function searchBook(query) {
  document.querySelector("#searchResultsList").innerHTML = "";
  const url = `https://openlibrary.org/search.json?title=${query}`;
  fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      const results = jsonData.docs;
      // console.log(jsonData)
      results.forEach((element) => {
        const bookListItem = document.createElement("li");
        bookListItem.classList.add("list-group-item");

        const list = document.querySelector("#searchResultsList");
        list.appendChild(bookListItem);

        const bookTitle = document.createElement("h3");
        bookTitle.appendChild(document.createTextNode(`${element.title}`));
        bookListItem.appendChild(bookTitle);

        const item = document.createElement("p");
        item.appendChild(
          document.createTextNode(`Author: ${element.author_name[0]}`)
        );
        bookListItem.appendChild(item);

        const readButton = document.createElement("button");
        readButton.appendChild(document.createTextNode("have read"));
        readButton.classList.add("btn");
        readButton.classList.add("btn-primary");
        bookListItem.appendChild(readButton);

        const wantReadButton = document.createElement("button");
        wantReadButton.appendChild(document.createTextNode("want to read"));
        wantReadButton.classList.add("btn");
        wantReadButton.classList.add("btn-primary");
        bookListItem.appendChild(wantReadButton);

        bookRating.forEach((bookRatingElement, index) => {
          const ratingStar = document.createElement("i");
          ratingStar.classList.add("fas");
          ratingStar.classList.add("fa-star");
          bookListItem.appendChild(ratingStar);

          // bookRating.forEach((activeRatingElement, ratingIndex) => {
          //   ratingStar.classList.add('activeStar')

          //   // console.log(event.target.element)
          //   // console.log('this is the rating' + activeRatingElement)

          //   //  console.log(bookRatingElement)
          // })
        });

        // POST want read book to server
        wantReadButton.addEventListener("click", function (event) {
          fetch("/wantRead", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: element.title,
              author: element.author_name[0],
              key: element.key,
              haveRead: false,
              wantRead: true,
            }),
          })
            .then((result) => {
              return result.json();
            })
            .then((data) => {
              console.log(data);
            });
        });

        //post have read
        readButton.addEventListener("click", function (event) {
          console.log(element.key);

          fetch("/haveRead", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: element.title,
              author: element.author_name[0],
              key: element.key,
              haveRead: true,
              wantRead: false,
            }),
          })
            .then((result) => {
              return result.json();
            })
            .then((data) => {
              console.log(data);
            });

          // booksToRead.push(element.title)
          console.log(element._id);
        });

        // booksRead.push(element)
        // console.log(booksRead)
      }); // end of for each
    }); // end of .then
} // end of function

//  As a user I want to be able to add books from my search results to my list of books to read, or books I have read

//  As a user, I want to track books I have read

//  As a user, I need to be able to rate books I have read

//  As a user, I want to be able to make a list of books I want to read

//  The App must be well designed and have a well thought out user interface with a focus on the user experience. (While this ins't a design class, often times a developer will have to make these choices)
