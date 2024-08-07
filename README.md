# lib-search - book search & wishlist project with ollama support

## Description 

This project is a simple Single Page Application (SPA) built with Vue.js (version 2). It allows users to search for books using the Open Library Search API. Additionally, the project includes functionality for interacting with an LLM model using OLLAMA to ask questions about the books. Books can be added to wishlist in local browser memory. Wishlist can be exported to CSV file.

## Features

- **Book Search**: Users can search for books by author's name, book title, and ISBN.
- **Search Results**: Displayed in card format with the book's author, title, cover, and publication year.
- **Wishlist**: Users can add books to a wishlist and view the wishlist on a separate page.
- **Book Details**: Each book card includes a "Details" button to show more information, including alternative author names if available.
- **Caching Mechanism**: Implemented to reduce the number of API requests and improve performance. Lazy loading for books covers
- **Wishlist Export**: Users can export their current wishlist to a spreadsheet.
- **LLM Model Interaction**: Users can ask questions about books using an LLM model, with prompts generated based on data from the Open Library search.

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/zielu92/lib-search.git
    cd vue-book-search
    cp .env.example .env
    ```
2. **Configurate .env**
3. **Install Dependencies**
    ```bash
    npm install
    ```
4. **Run the Application**
    ```bash
    npm run serve
    ```

## Preview
![alt Preview 1 example](https://github.com/zielu92/lib-search/blob/main/preview/1.png?raw=true)
![alt Preview 2 example](https://github.com/zielu92/lib-search/blob/main/preview/2.png?raw=true)