////////////////////////////////////////////////////// LIGHT MODE //////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function HomePage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isPending, setIsPending] = useState(false);
//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const queryObject = { searchQuery };
//     setIsPending(true);

//     fetch('http://127.0.0.1:5000/searchQueries', {
//       method: 'POST',
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(queryObject)
//     }).then(response => response.json())
//       .then(data => {
//         setIsPending(false);
//         history.push('/ProductPage', { videoUrls: data.videoUrls, searchQuery });
//       })
//       .catch(error => {
//         console.error("Error fetching video URLs:", error);
//         setIsPending(false);
//       });
//   };

//   return (
//     <>
//       <main className="main">
//         <section className="content">
//           <header className="header">CLIO</header>
//           <h1 className="title">
//             Any Product. Every Review.<br />
//             One Platform.
//           </h1>
//           <form className="search-form" onSubmit={handleSubmit}>
//             <label htmlFor="productSearch" className="visually-hidden">Product Search</label>
//             <input
//               className="search-input"
//               type="text"
//               required
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               id="productSearch"
//               placeholder="e.g. hydroflask 40 oz."
//               aria-label="Search for a product"
//             />
//             <button className="search-button" type="submit" aria-label="search">
//               {isPending ? 'Loading...' : 'Search'}
//             </button>
//           </form>
//         </section>
//       </main>
//       <style jsx = "true">





//         {`
//         .main {
//           background-color: #fff;
//           display: flex;
//           align-items: center;
//           font-weight: 600;
//           line-height: 150%;
//           justify-content: center;
//           padding: 80px 60px;
//         }
//         @media (max-width: 991px) {
//           .main {
//             padding: 0 20px;
//           }
//         }
//         .content {
//           display: flex;
//           margin-top: 243px;
//           width: 469px;
//           max-width: 100%;
//           flex-direction: column;
//           align-items: center;
//         }
//         @media (max-width: 991px) {
//           .content {
//             margin-top: 40px;
//           }
//         }
//         .header {
//           color: rgba(164, 3, 204, 0.63);
//           text-align: center;
//           letter-spacing: -1.28px;
//           font-size: 128px;
//           font-family: 'Inter', sans-serif;
//           margin-bottom: 20px

//         }
//         @media (max-width: 991px) {
//           .header {
//             font-size: 40px;
//           }
//         }
//         .title {
//           color: #000;
//           text-align: center;
//           letter-spacing: -0.24px;
//           align-self: stretch;
//           margin-top: 47px;
//           line-height: 1.2;

//           font-size: 24px;
//           font-family: 'Inter', sans-serif;
//         }
//         @media (max-width: 99100px) {
//           .title {
//             font-size: 30px;
//           }
//         }
//         .search-form {
//           display: flex;
//           margin-top: 0px;
//           width: 400px;
//           max-width: 100%;
//           flex-direction: column;
//           font-weight: 500;
//         }
//         .search-input {
//           display: block;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 1;
//           text-overflow: ellipsis;
//           border: 1px solid rgba(224, 224, 224, 1);
//           border-radius: 8px;
//           background-color: #fff;
//           color: #828282;
//           padding: 5px 16px;
//           font-size: 20px;
//           font-family: 'Inter', sans-serif;
//           margin-bottom: 16px;
//         }
//         .search-button {
//           display: block;
//           justify-content: center;
//           align-items: center;
//           border-radius: 8px;
//           background-color: #000;
//           color: #fff;
//           white-space: nowrap;
//           padding: 8px 16px;
//           font-size: 16px;
//           font-family: 'Inter', sans-serif;
//           cursor: pointer;
//         }
//         @media (max-width: 991px) {
//           .search-button {
//             white-space: initial;
//             padding: 8px 20px;
//           }
//         }
//         .visually-hidden {
//           position: absolute;
//           width: 1px;
//           height: 1px;
//           padding: 0;
//           margin: -1px;
//           overflow: hidden;
//           clip: rect(0, 0, 0, 0);
//           border: 0;
//         }
//       `}</style>
//     </>
//   );
// }

// export default HomePage;


////////////////////////////////////////////////////// DARK MODE //////////////////////////////////////////////////////
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactTyped } from "react-typed";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryObject = { searchQuery };
    setIsPending(true);


    const yt_apiKey = 'AIzaSyD6SPkiwbkn2yGh4WkE-PmKbSlUd0NMNy0';
    const yt_maxResults = 9;
    const yt_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery + " in depth product review")}&type=video&maxResults=${yt_maxResults}&key=${yt_apiKey}`;


    Promise.all([
      //TIKTOK
      fetch('http://127.0.0.1:5000/searchQueries', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryObject)
      }).then(response => response.json()),

      // YOUTUBE
      fetch(yt_url).then(response => response.json()),

      //REDDIT
      fetch('http://127.0.0.1:5000/redditPages', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery })
      }).then(response => response.json())


    ]).then(([tiktokData, youtubeData, redditData]) => {
      setIsPending(false);
      history.push('/ProductPage', {
        videoUrls: tiktokData.videoUrls,
        searchQuery,
        youtube_videoData: youtubeData.items,
        redditPages: redditData.redditPages

      });
    }).catch(error => {
      console.error("Error fetching data:", error);
      setIsPending(false);
    });
  };

  return (
    <>
      <main className="main">
        <section className="content">
          <header className="header">
            <span className="letter">C</span>
            <span className="letter">L</span>
            <span className="letter">I</span>
            <span className="letter">O</span>
          </header>
          <h1 className="title">
            Any Product. Every Review.<br />
            One Platform.
          </h1>
          <form className="search-form" onSubmit={handleSubmit}>
            <label htmlFor="productSearch" className="visually-hidden">Product Search</label>


            <ReactTyped
              strings={[
                "Fender Electric Guitar",
                "Hydroflask 40oz",
                "Nespresso Machine",
              ]}
              typeSpeed={40}
              backSpeed={50}
              attr="placeholder"
              loop
            >
              <input
                className="search-input"
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="productSearch"

              />
            </ReactTyped>

            <button className="search-button" type="submit" aria-label="search">
              {isPending ? 'Loading...' : 'Search'}
            </button>
          </form>
        </section>
      </main>
      <style jsx>{`
        .main {
          background-color: #f7f7f7;
          color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          line-height: 1.5;
          padding: 60px 20px;
          min-height: 100vh;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 600px;
        }
        .header {
          display: flex;
          gap: 5px;
          margin-bottom: 15px;
          margin-right:20px;
        }
        .letter {
          font-size: 64px;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(45deg, #ff6b6b, #f06595, #cc5de8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: transform 0.3s ease;
        }
        .header:hover .letter {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            text-shadow: 0 0 5px rgba(255, 105, 180, 0.8);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 105, 180, 1);
          }
          100% {
            text-shadow: 0 0 5px rgba(255, 105, 180, 0.8);
          }
        }
        .title {
          color: #333;
          font-size: 28px;
          font-family: 'Inter', sans-serif;
          margin-bottom: 40px;
        }
        .search-form {
          display: flex;
          flex-direction: column;
          width: 100%;

        }
        .search-input {
          width: 93%;

          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background-color: #fff;
          color: #333;
          padding: 15px;
          font-size: 18px;
          font-family: 'Inter', sans-serif;
          margin-bottom: 20px;
          outline: none;
          transition: border-color 0.3s;
        }
        .search-input:focus {
          border-color: #a403cc;
        }
        .search-button {
          background-color: #a403cc;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 15px;
          font-size: 18px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .search-button:hover {
          background-color: #8a03b0;
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </>
  );
}

export default HomePage;

