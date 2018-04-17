'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEW: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.

// Question: what is the difference between a global array and an array attached to a constructor function?

Article.all = [];

// COMMENT: Why isn't this method written as an arrow function?
// Because it's using this and it's refering to the article object

Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENT: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // the below line is a ternary operator if statement which is a if statements shortcut. The ? acts as the "if" and the ":" acts as the else.
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEW: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEW: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// In the fetchAll function directly below this function. The data in local storage or the data from the remote database we're tapping into. The difference is we are grabbing data from a local or remote storage versus a local file.  
Article.loadAll = articleData => { //instantiating new function that does work on the article constructor 
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn))) //sorting article data based on publishedOn info 

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject))) //for each article data instance, push to article object
}

// REVIEW: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEW: What is this 'if' statement checking for? Where was the rawData set to local storage?
  if (localStorage.rawData) {

    Article.loadAll();

  } else {
    $.getJSON('/data/hackerIpsum.json')
      .then(data => Article.loadAll(data))
      .catch(err => console.error('error caught', err));

  }
}
