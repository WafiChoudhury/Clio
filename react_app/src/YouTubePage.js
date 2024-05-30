import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function YouTubePage() {
  const { videoData, searchQuery } = useLocation().state || { videoData: [], searchQuery: '' };
  const history = useHistory();
  console.log(videoData);

  const goBack = () => {
    history.goBack();
  };

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
                <p className="publish-date"> {formatDate(video.snippet.publishedAt)}</p>
                </div>
              </div>
              <h3 className="video-title">{video.snippet.title}</h3>
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .youtube-page {
            
          padding-left: 100px;
          padding-right: 100px;
          padding-bottom: 00px;
        }

        .publish-date{
            font: 600 24px Inter, sans-serif;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative; /* Add this line */
            margin-bottom: 20px;
          }
          
          .back-button {
            border-radius: 8px;

            padding: 8px 16px;
            font: 600 24px Inter, sans-serif;
            border: none;
            background-color: #000;
            color: #fff;
            cursor: pointer;
            position: absolute; /* Add this line */
            left: 0px; /* Add this line */
            top: 10px; /* Add this line */
            
          }
          

        .title {
          font-size: 24px;
          text-align: center;
          font: 600 24px Inter, sans-serif;
        }

       
        .video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .video-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .thumbnail-container {
          position: relative;
          width: 100%;
          height: auto;
        }

        .thumbnail {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .video-details {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 12px;
          border-radius: 8px;
          padding: 8px;
        }

        .thumbnail-container:hover .video-details {
          display: flex;
        }

        .video-title {
          margin-top: 10px;
          color: #000;
          text-align: center;
          text-align: center;
          font: 600 16px Inter, sans-serif;
          text-decoration: none;
        }

        .video-title:hover {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
export default YouTubePage;
