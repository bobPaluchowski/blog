---
title: 'Wordle solver helper - Solvdle'
date: '2024-10-25'
---

# React.js app **Solvdle** to help me solve Wordle.

 

For a few months now, I've been playing NYT Wordle — a great puzzle game that helps me learn more English words, 
as English isn't my mother tongue. I play it every morning. But from time to time, I like to automate solving 
it. On my Windows laptop, I wrote a PowerShell script to help me guess the word. 
Later, on my personal GNU/Linux machine, I wrote a Bash script, then a simple C program. 
However, I wasn't satisfied with these solutions. Each had limitations, so I decided to make a very simple React app.

The app has two input fields that take letters to be included and excluded from the search, a container to display these letters, buttons to search and finish, and a container to display search results. On the backend, there's just a .txt file that holds all English 5-letter words. Users can keep adding letters to be included or excluded to refine the search.
  

It’s just for fun…
--- 



- 1. Setup the React App
  
 
`npx create-react-app solvdle`


`cd solvdle`

 2. Create the Components
We'll need two main components:

* SearchForm - for inputing and displaying included and excluded letters.
* SearchResults - to show the words that match the search criteria.

  3. File Structure
* src/components/SearchForm.js
* src/components/SearchResults.js 
  
  4. SearchForm Component
  

```javascript
import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [includeLetters, setIncludeLetters] = useState('');
  const [excludeLetters, setExcludeLetters] = useState('');
  const [includedList, setIncludedList] = useState([]);
  const [excludedList, setExcludedList] = useState([]);

  const handleSearch = () => {
    const updatedIncluded = [...new Set([...includedList, ...includeLetters.split('')])];
    const updatedExcluded = [...new Set([...excludedList, ...excludeLetters.split('')])];
    setIncludedList(updatedIncluded);
    setExcludedList(updatedExcluded);
    onSearch(updatedIncluded, updatedExcluded);
    setIncludeLetters('');
    setExcludeLetters('');
  };

  const handleFinish = () => {
    setIncludedList([]);
    setExcludedList([]);
    onSearch([], []);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Include letters"
          value={includeLetters}
          onChange={(e) => setIncludeLetters(e.target.value)}
        />
        <input
          type="text"
          placeholder="Exclude letters"
          value={excludeLetters}
          onChange={(e) => setExcludeLetters(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
        <button type="button" onClick={handleFinish}>Finish</button>
      </form>

      <div>
        <h3>Included Letters</h3>
        <div>
          {includedList.map((letter, index) => (
            <button key={index} style={{ backgroundColor: 'green' }}>{letter}</button>
          ))}
        </div>

        <h3>Excluded Letters</h3>
        <div>
          {excludedList.map((letter, index) => (
            <button key={index} style={{ backgroundColor: 'gray' }}>{letter}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
```
  
  5. SearchResults Component 
  
```javascript
import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="results-container">
      {results.length > 0 ? (
        <div className="results-grid">
          {results.map((word, index) => (
            <div key={index} className="word">
              {word}
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
```
  
  6. Main App Logic
  
```javascript
import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import wordList from './5_letter_words.txt'; // Import the word file

const App = () => {
  const [results, setResults] = useState([]);

  const filterWords = (included, excluded) => {
    fetch(wordList)
      .then((response) => response.text())
      .then((data) => {
        const words = data.split('\n').map((word) => word.trim());
        const filteredWords = words.filter((word) =>
          included.every((letter) => word.includes(letter)) &&
          excluded.every((letter) => !word.includes(letter))
        );
        setResults(filteredWords);
      });
  };

  return (
    <div className="App">
      <SearchForm onSearch={filterWords} />
      <SearchResults results={results} />
    </div>
  );
};

export default App;
```
  
  7. Responsive Styling
  
```css
.results-container {
  padding: 20px;
}

.results-grid {
  display: grid;
  gap: 10px;
}

@media (min-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 768px) {
  .results-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.word {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}
```
  
  8. Install nedessary packages
  
To parse the .txt file in React, you may need a loader like rea-loader:
  
`npm install raw-loader --save-dev`
  
To run the app:
  
`npm start`
