import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function YouTubePage() {
  const { youtube_videoData, searchQuery } = useLocation().state || { youtube_videoData: [], searchQuery: '' };
  const history = useHistory();
  console.log(youtube_videoData);

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
        {youtube_videoData.map((video, index) => (
          <div key={index} className="video-item">
            <div className="thumbnail-container">
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.snippet.title}
                className="thumbnail"
              ></iframe>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-title-link"
            >
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
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
        }

        .thumbnail {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
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
