// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   let [data, setData] = useState([]);
//   let [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch(
//       "https://emoji-api.com/emojis?access_key=ea9709fe0573a992fcd91eb751e905774382677f"
//     )
//       .then((res) => res.json())
//       .then((res) => setData(res));
//   }, []);

//   let handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   let handleSubmit = () => {
//     if (search !== "") {
//       fetch(
//         `https://emoji-api.com/emojis?search=${search}&access_key=ea9709fe0573a992fcd91eb751e905774382677f`
//       )
//         .then((res) => res.json())
//         .then((res) => setData(res));
//     }
//   };

//   return (
//     <div className="App">
//       <div className="menu">
//         <div className="menu__text">
//           <h1>Emoji Search</h1>
//           <p>A simple emoji search with react</p>
//           <div>
//             <input
//               type="text"
//               placeholder="Search"
//               value={search}
//               onChange={handleSearch}
//             ></input>
//             <button className="search" onClick={() => handleSubmit()}>
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="container">
//         {data.map((e, i) => (
//           <div className="card" key="e.slug">
//             <p className="emo">{e.character}</p>
//             <p className="name">{e.unicodeName}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file

function EmojiFinder() {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [recentEmojis, setRecentEmojis] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          `https://emoji-api.com/emojis?access_key=012a87820736b64a3c928b71b8b7be4a3c924313`
        );
        const data = await response.json();
        setEmojis(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching emojis:", error);
        setLoading(false);
      }
    };

    fetchEmojis();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEmojiClick = (emoji) => {
    const updatedRecentEmojis = [emoji, ...recentEmojis.filter(item => item.slug !== emoji.slug)].slice(0, 5);
    setRecentEmojis(updatedRecentEmojis);
  };

  const filteredEmojis = emojis.filter(
    (emoji) =>
      emoji.slug && emoji.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="emoji-finder-container">
      <h1>Emoji Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {recentEmojis.length > 0 && (
            <div className="recent-emojis">
              <h2>Recently Used</h2>
              <div className="emojis-grid">
                {recentEmojis.map((emoji) => (
                  <span
                    key={emoji.slug}
                    role="img"
                    aria-label={emoji.slug}
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji.character}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="emojis-grid">
            {filteredEmojis.length > 0 ? (
              filteredEmojis.map((emoji) => (
                <span
                  key={emoji.slug}
                  role="img"
                  aria-label={emoji.slug}
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji.character}
                </span>
              ))
            ) : (
              <div className="no-emoji">No emojis found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EmojiFinder;
