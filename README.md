# NC News

# Introduction

Created a full stack news app that replicates the functionalities found in a social news platform such as Reddit, Available to view at https://nc-cool-news.netlify.app

# Overview

This news application combined the news back-end api (found at https://github.com/Gurtajs/News-project) to create a full stack app where the user can:
- View all articles
- View an article by id
- View articles by topic
- Post comments (a user is already logged in as default so they can only post comments with their username) to an article and delete comments (logged in user can only delete comments that they have posted.)
- Like articles 
- Order articles by ascending or descending sorting by date posted, number of comments or votes
I have dealt with error handling when the user searches for a non-existing path, article or topic an appropriate error message is displayed. The form to post the comment is also validated ensuring that the user does not post bad data.

# Set up instructions

1. To run this project clone the following github repository URL https://github.com/Gurtajs/nc-news.git by running git clone https://github.com/<your_github_username>/nc-news.git.
2. Install Node.js, this project used Node v20.13.1 (ensure you have at least this node version or a later version)
3. Install the dependencies required to run this project with: npm install
4. Run the project with npm run dev






