////////////////////////////////////////////////////// LIGHT MODE //////////////////////////////////////////////////////

// import React from 'react';
// import { useLocation, useHistory } from 'react-router-dom';

// function YouTubePage() {
//   const { videoData, searchQuery } = useLocation().state || { videoData: [], searchQuery: '' };
//   const history = useHistory();
//   console.log(videoData);

//   const goBack = () => {
//     history.goBack();
//   };

//   React.useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="youtube-page">
//       <div className="header">
//         <button className="back-button" onClick={goBack}>
//           Back
//         </button>
//         <h1 className="title">YouTube {searchQuery} Reviews</h1>
//       </div>
//       <div className="video-grid">
//         {videoData.map((video, index) => (
//           <div key={index} className="video-item">
//             <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
//               <div className="thumbnail-container">
//                 <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="thumbnail" />
//                 <div className="video-details">
//                   {/* Uncomment if needed */}
//                   {/* <p className="publish-date">{formatDate(video.snippet.publishedAt)}</p> */}
//                   <p className="click-to-watch">*click to watch*</p>
//                 </div>
//               </div>
//               <h3 className="video-title">{video.snippet.title}</h3>
//             </a>
//           </div>
//         ))}
//       </div>
//       <style jsx>{`
//         .youtube-page {
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
//           background-color: #ff0000;
//           color: #fff;
//           cursor: pointer;
//         }

//         .title {
//           font-size: 24px;
//           font: 600 24px Inter, sans-serif;
//           color: #333;
//         }

//         .video-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 20px;
//         }

//         .video-item {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           background-color: #fff;
//           padding: 10px;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }

//         .thumbnail-container {
//           position: relative;
//           width: 100%;
//         }

//         .thumbnail {
//           width: 100%;
//           border-radius: 8px;
//           transition: transform 0.3s;
//         }

//         .thumbnail:hover {
//           transform: scale(1.05);
//         }

//         .video-details {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background-color: rgba(0, 0, 0, 0.5);
//           color: #fff;
//           font-size: 16px;
//           border-radius: 8px;
//           opacity: 0;
//           transition: opacity 0.3s;
//         }

//         .thumbnail-container:hover .video-details {
//           opacity: 1;
//         }

//         .video-title {
//           margin-top: 10px;
//           color: #000;
//           font: 600 16px Inter, sans-serif;
//           text-decoration: none; /* Remove underline */
//           transition: color 0.3s;
//         }

//         .video-title:hover {
//           color: #ff0000;
//         }

//         .publish-date {
//           font: 400 14px Inter, sans-serif;
//         }

//         .click-to-watch {
//           font: 600 16px Inter, sans-serif;
//         }

//         /* Ensure links do not have underlines */
//         .video-item a {
//           text-decoration: none;
//           color: inherit;
//         }

//         .video-item a:hover {
//           text-decoration: none;
//         }
//       `}</style>
//     </div>
//   );
// }

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   const options = { year: 'numeric', month: 'short', day: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// }

// export default YouTubePage;


////////////////////////////////////////////////////// DARK MODE //////////////////////////////////////////////////////

import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function YouTubePage() {
  const { videoData, searchQuery } = useLocation().state || { videoData: [], searchQuery: '' };
  const history = useHistory();
  console.log(videoData);

  const goBack = () => {
    history.goBack();
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="youtube-page">
      <div className="header">
        <button className="back-button" onClick={goBack}>
          Back
        </button>
        <h1 className="title">YouTube {searchQuery} Reviews</h1>
      </div>
      <div className="video-grid">
        {videoData.map((video, index) => (
          <div key={index} className="video-item">
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              <div className="thumbnail-container">
                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="thumbnail" />
                <div className="video-details">
                  <p className="click-to-watch">*click to watch*</p>
                </div>
              </div>
              <h3 className="video-title">{video.snippet.title}</h3>
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .youtube-page {
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

          color: #000;
          cursor: pointer;
        }

        .title {
          font-size: 24px;
          font: 600 24px Inter, sans-serif;
          color: #e0e0e0;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .video-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .thumbnail-container {
          position: relative;
          width: 100%;
        }

        .thumbnail {
          width: 100%;
          border-radius: 8px;
          transition: transform 0.3s;
        }

        .thumbnail:hover {
          transform: scale(1.05);
        }

        .video-details {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 16px;
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .thumbnail-container:hover .video-details {
          opacity: 1;
        }

        .video-title {
          margin-top: 10px;
          color: #e0e0e0;
          font: 600 16px Inter, sans-serif;
          text-decoration: none; /* Remove underline */
          transition: color 0.3s;
        }

        .video-title:hover {
          color: #ff0000;
        }

        .click-to-watch {
          font: 600 16px Inter, sans-serif;
        }

        /* Ensure links do not have underlines */
        .video-item a {
          text-decoration: none;
          color: inherit;
        }

        .video-item a:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default YouTubePage;
