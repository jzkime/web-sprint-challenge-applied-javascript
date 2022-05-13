import axios from "axios";

class Tabs {
  constructor(obj) {
    this.headline = obj.headline;
    this.authorName = obj.author;
    this.authorPhoto = obj.authorPhoto;
    this.tab = null;
  }

  findTab() {
    if(this.headline.includes("Javascript")){
      this.tab = "javascript";
    }
    if(this.headline.includes("Bootstrap")){
      this.tab = "bootstrap";
    }
    if(this.headline.includes("jQuery")){
      this.tab = "jquery"
    }
  }
}

const newObj = new Tabs({authorName: "BONES R. LIFE",
authorPhoto: "https://tk-assets.lambdaschool.com/a9471235-ed71-4b11-ae15-5a4fa1151d30_bones.jpg",
headline: "MongoDB: NoSQL vs. SQL, the Debate Continues..",
id: "04468917-d408-4e2d-804f-143474f11d29"});

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const card = document.createElement("div");
  card.classList.add("card");

  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.textContent = article.headline;
  card.appendChild(headline);

  const author = document.createElement("div");
  author.classList.add("author");
  card.appendChild(author);

  const imgCont = document.createElement("div");
  imgCont.classList.add("img-container");
  author.appendChild(imgCont);

  const imgTag = document.createElement("img");
  imgTag.src = article.authorPhoto;
  imgCont.appendChild(imgTag);

  const span = document.createElement("span");
  span.textContent = `By ${article.authorName}`;
  author.appendChild(span);

  card.addEventListener("click", evt => {
    console.log(headline.textContent);
  })

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  const cardApp = document.querySelector(selector);

  axios.get("http://localhost:5001/api/articles").then((res) => {

    Object.keys(res.data.articles).forEach(arr => {
      res.data.articles[arr].forEach(item => {
        const authorChild = Card(item);
        cardApp.appendChild(authorChild);
        // console.log(item)
      })
      });
  })
  .catch((error) => {
    console.log("There is an issue with this item.")
  })
}

export { Card, cardAppender }
