# Project Name
Kilovolt Blog
**Author**: Collin Hintzke & Emery Parks
**Version**: 1.2.1

## Overview
A blog site that retrieves articles from local Storage, or if none is found, a (emulated server)  JSON text file containing 250 articles.

## Getting Started
Users may connect to our website via our servers public ip address at http://127.0.0.1:8080/

## Architecture
Our blog site is ran off of JavaScript, including libraries such as JQuery, Handlebars, Ajax, and marked.

## Change Log
9:20 Started whiteboarding key TODO's from our User Stories and Featured Tasks. We then began digging through our codebase to find the TODO's and the Comments, answering any comments we could.
10:15 We began writing Code, starting with loading our Articles from our JSON file. Then once we populated our Articles Array and knew we were correctly retrieving the JSON, we fixed the error caused when our code tried to render our "objects".
11:00 Collin began driving, Emery Navigated, we solved an asynchronized loading error we created. Once that error was resolved we started saving the Articles found to the local storage, where another error occured; putting our load into an infinite loop caused by a bouncing of calling important "load" functions.
