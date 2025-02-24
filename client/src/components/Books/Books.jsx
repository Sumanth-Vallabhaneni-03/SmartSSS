import React from "react";
import "./Books.css";
import { FaBook, FaLaptopCode, FaIndustry, FaLightbulb, FaRocket } from "react-icons/fa"; // Import icons
import themes from '../../assets/themes-removebg-preview.png';

const booksData = [
  {
    theme: "Technology",
    icon: <FaLaptopCode className="category-icon tech-icon" />,
    image: "https://www.skillstork.org/blog/wp-content/uploads/2022/11/modern-education-Skillstork-1568x882.jpg",
    books: [
      { title: "Clean Code", author: "Robert C. Martin", link: "https://www.amazon.com/dp/0132350882" },
      
      { title: "Intro to Algorithms", author: "Thomas H. Cormen", link: "https://www.amazon.com/dp/026204630X" },
      { title: "The Pragmatic Programmer", author: "Andy Hunt & Dave Thomas", link: "https://www.amazon.com/dp/0135957052" },
    ],
  },

  {
    theme: "Casual",
    icon: <FaBook className="category-icon casual-icon" />,
    image: "https://img.freepik.com/free-vector/group-people-illustration-collection_52683-33805.jpg",
    books: [
      {title: "You Are a Badass", author: "Jen Sincero", link: "https://www.amazon.com/dp/0762447699" },
      { title: "Atomic Habits", author: "James Clear", link: "https://www.amazon.com/dp/0735211299" },
      { title: "The Alchemist", author: "Paulo Coelho", link: "https://www.amazon.com/dp/0062315005" },
    ],
  },
  {
    theme: "Industry",
    icon: <FaIndustry className="category-icon industry-icon" />,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg/1200px-M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
    books: [
      { title: "Zero to One", author: "Peter Thiel", link: "https://www.amazon.com/dp/0804139296" },
      { title: "The Lean Startup", author: "Eric Ries", link: "https://www.amazon.com/dp/0307887898" },
      { title: "Good to Great", author: "Jim Collins", link: "https://www.amazon.com/dp/0066620996" },
    ],
  },
  {
    theme: "Lessons",
    icon: <FaLightbulb className="category-icon lessons-icon" />,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB77Dcs5cBslj16ElhmgvrNwA6mKITAJ123A&s",
    books: [
      { title: "Deep Work", author: "Cal Newport", link: "https://www.amazon.com/dp/1455586692" },
      { title: "Grit", author: "Angela Duckworth", link: "https://www.amazon.com/dp/1501111116" },
      { title: "The Power of Habit", author: "Charles Duhigg", link: "https://www.amazon.com/dp/081298160X" },
    ],
  },
  {
    theme: "Motivation",
    icon: <FaRocket className="category-icon motivation-icon" />,
    image: "https://mindhealth.com.au/wp-content/uploads/2020/02/motivation-scaled-1.jpeg",
    books: [
      { title: "Can't Hurt Me", author: "David Goggins", link: "https://www.amazon.com/dp/1544507852" },
      { title: "The 5 AM Club", author: "Robin Sharma", link: "https://www.amazon.com/dp/1443456624" },
      { title: "Start With Why", author: "Simon Sinek", link: "https://www.amazon.com/dp/1591846447" },
    ],
  },
  {
    theme: "Creativity",
    icon: <FaRocket className="category-icon motivation-icon" />,
    image: "https://media.cntraveler.com/photos/64879b50add73e0d14b17f9e/16:9/w_2580,c_limit/Most-Adventurous-things-to-do-in-your-lifetime-(update)_timur-garifov-sisZWCDkmwA-unsplash.jpg", // Or any adventure-themed image
    books: [
      {
        title: "Dune",
        author: "Frank Herbert",
        link: "https://www.amazon.com/dp/0441013597",
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        link: "https://www.amazon.com/dp/054792822X",
      },
      {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        link: "https://www.amazon.com/dp/0062316117",
      },
    ],
  },  
];

function Books() {
  return (
    <div className="books-container">
      <div className="image-placeholder">
        {/* Add your image or placeholder here */}
        <img src={themes} alt="Placeholder" className="image-placeholder-img" />
      </div>
      <h2>📚 Learning Books</h2>
      <div className="books-categories">
        {booksData.map((category, index) => (
          <div key={index} className="book-category">
            <div className="category-header">
              <div className="icon-container">{category.icon}</div>
              <img src={category.image} alt={category.theme} className="category-image" />
              <h3>{category.theme}</h3>
            </div>
            <ul>
              {category.books.map((book, bookIndex) => (
                <li key={bookIndex}>
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-link">
                    <span className="book-title">{book.title}</span>
                  </a>{" "}
                  - {book.author}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;



