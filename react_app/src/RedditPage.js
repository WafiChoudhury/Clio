////////////////////////////////////////////////////// LIGHT MODE //////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';

// function RedditPage() {
//   const location = useLocation();
//   const history = useHistory();

//   const defaultRedditPages = ['https://www.reddit.com/r/aww/comments/1e1a2c/cute_kittens_playing/'];
//   const defaultSearchQuery = 'cute kittens';

//   const { redditPages = defaultRedditPages, searchQuery = defaultSearchQuery } = location.state || {};

//   const [embeds, setEmbeds] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!location.state) {
//       history.replace({
//         pathname: location.pathname,
//         state: {
//           redditPages: defaultRedditPages,
//           searchQuery: defaultSearchQuery,
//         },
//       });
//     }

//     const fetchEmbedData = async () => {
//       const embedPromises = redditPages.map(async (url) => {
//         try {
//           const response = await fetch(`http://localhost:3001/oembed?url=${encodeURIComponent(url)}`);
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           const data = await response.json();
//           if (data && data.html) {
//             return data;
//           } else {
//             throw new Error('Invalid embed data');
//           }
//         } catch (error) {
//           console.error('Error fetching embed data:', error);
//           return { error: error.message };
//         }
//       });
//       const embedData = await Promise.all(embedPromises);
//       setEmbeds(embedData);
//     };

//     fetchEmbedData();
//   }, [redditPages, location.state, history]);

//   return (
//     <div className="reddit-page">
//       <div className="header">
//         <button className="back-button" onClick={() => history.goBack()}>
//           Back
//         </button>
//         <h1 className="title">Reddit Results for "{searchQuery}"</h1>
//       </div>
//       <div className="embed-grid">
//         {error && <p>Error loading embeds: {error.message}</p>}
//         {embeds.map((embed, index) => (
//           embed.error ? (
//             <p key={index}>Failed to load embed: {embed.error}</p>
//           ) : (
//             <div key={index} className="embed-item">
//               <iframe
//                 title={`Reddit Embed ${index}`}
//                 srcDoc={embed.html}
//                 style={{ width: '100%', height: '300px', border: 'none' }}
//               />
//             </div>
//           )
//         ))}
//       </div>
//       <style jsx>{`
//         .reddit-page {
//           padding: 20px 40px;
//           background-color: #f9f9f9;
//           min-height: 100vh;
//         }

//         .header {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           margin-bottom: 20px;
//         }

//         .back-button {
//           position: absolute;
//           left: 20px;
//           border-radius: 4px;
//           padding: 8px 16px;
//           font: 600 16px Inter, sans-serif;
//           border: none;
//           background-color: #ff4500;
//           color: #fff;
//           cursor: pointer;
//         }

//         .title {
//           font-size: 24px;
//           font: 600 24px Inter, sans-serif;
//           color: #333;
//         }

//         .embed-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 20px;
//         }

//         .embed-item {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           background-color: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default RedditPage;


////////////////////////////////////////////////////// DARK MODE //////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function RedditPage() {
  const location = useLocation();
  const history = useHistory();

  const defaultRedditPages = ['https://www.reddit.com/r/aww/comments/1e1a2c/cute_kittens_playing/'];
  const defaultSearchQuery = 'cute kittens';

  const { redditPages = defaultRedditPages, searchQuery = defaultSearchQuery } = location.state || {};

  const [embeds, setEmbeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state) {
      history.replace({
        pathname: location.pathname,
        state: {
          redditPages: defaultRedditPages,
          searchQuery: defaultSearchQuery,
        },
      });
    }

    const fetchEmbedData = async () => {
      const embedPromises = redditPages.map(async (url) => {
        try {
          const response = await fetch(`http://localhost:3001/oembed?url=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data && data.html) {
            return data;
          } else {
            throw new Error('Invalid embed data');
          }
        } catch (error) {
          console.error('Error fetching embed data:', error);
          return { error: error.message };
        }
      });
      const embedData = await Promise.all(embedPromises);
      setEmbeds(embedData);
    };

    fetchEmbedData();
  }, [redditPages, location.state, history]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reddit-page">
      <div className="header">
        <button className="back-button" onClick={() => history.goBack()}>
          Back
        </button>
        <h1 className="title">Reddit Results for "{searchQuery}"</h1>
      </div>
      <div className="embed-grid">
        {error && <p>Error loading embeds: {error.message}</p>}
        {embeds.map((embed, index) => (
          embed.error ? (
            <p key={index}>Failed to load embed: {embed.error}</p>
          ) : (
            <div key={index} className="embed-item">
              <iframe
                title={`Reddit Embed ${index}`}
                srcDoc={embed.html}
                style={{ width: '100%', height: '400px', border: 'none' }}
              />
            </div>
          )
        ))}
      </div>
      <style jsx>{`
        .reddit-page {
          padding: 20px 40px;
          background-color: #121212;
          color: #e0e0e0;
          min-height: 100vh;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 20px;
        }

        .back-button {
          position: absolute;
          left: 20px;
          border-radius: 4px;
          padding: 8px 16px;
          font: 600 16px Inter, sans-serif;
          border: none;
          background-color: #bb86fc;
          color: #121212;
          cursor: pointer;
        }

        .title {
          font-size: 24px;
          font: 600 24px Inter, sans-serif;
          color: #e0e0e0;
        }

        .embed-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .embed-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
          height: 340px;
        }

        iframe {
          background-color: #1e1e1e;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default RedditPage;

