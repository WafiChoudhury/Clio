import * as React from 'react';
import {Link} from 'react-router-dom';
import ProductPage from './ProductPage';
import{useState} from 'react';
import { useHistory } from 'react-router-dom';


function MyComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  // const handleSubmit = (e) =>{
  //   e.preventDefault();
  //   const queryObject ={searchQuery};
  //   setIsPending(true);
  //   fetch('http://localhost:8000/searchQueries',{
  //     method: 'POST',
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify(queryObject)

  //     }
  //   ).then(() => {
  //     console.log("new  ");
  //     setIsPending(false);
  //     history.push('/ProductPage');
  //   })
    
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    const queryObject = { searchQuery };
    setIsPending(true);

    fetch('http://127.0.0.1:5000/searchQueries', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queryObject)
    }).then(response => response.json())
      .then(data => {
        console.log("Received video URLs:", data.videoUrls);
        setIsPending(false);
        history.push('/ProductPage', { videoUrls: data.videoUrls });
      })
      .catch(error => {
        console.error("Error fetching video URLs:", error);
        setIsPending(false);
      });
  };
  
  return (

    <>
      <main className="main">
        <section className="content">
          <header className="header">QUETZAL</header>
          <h1 className="title">
  Any Product. Every Review.<br />
  One Platform.
</h1>

          
         
         

          <form className="search-form" onSubmit= {handleSubmit}>
            <label
              htmlFor="productSearch"
              className="visually-hidden"
            >
              Product Search
            </label>


            <input
              className="search-input"
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}


              id="productSearch"
              placeholder="e.g. hydroflask 40 oz."
              aria-label="Search for a product"
            />

            
          
            {!isPending && <button
            
            className="search-button"
            type="submit"
            aria-label="search"
          >
             search


          </button>}

          {/* LOADiNG */}
          {isPending && <button
            
            className="search-button"
            type="submit"
            aria-label="search"
          >
             loading..

          </button>}
            


          </form>
        </section>
      </main>


      <style jsx>{`
        .main {
          background-color: #fff;
          display: flex;
          align-items: center;
          font-weight: 600;
          line-height: 150%;
          justify-content: center;
          padding: 80px 60px;
        }
        @media (max-width: 991px) {
          .main {
            padding: 0 20px;
          }
        }
        .content {
          display: flex;
          margin-top: 243px;
          width: 469px;
          max-width: 100%;
          flex-direction: column;
          align-items: center;
        }
        @media (max-width: 991px) {
          .content {
            margin-top: 40px;
          }
        }
        .header {
          color: rgba(164, 3, 204, 0.63);
          text-align: center;
          letter-spacing: -1.28px;
          font-size: 128px;
          font-family: 'Inter', sans-serif;
          margin-bottom: 20px

        }
        @media (max-width: 991px) {
          .header {
            font-size: 40px;
          }
        }
        .title {
          color: #000;
          text-align: center;
          letter-spacing: -0.24px;
          align-self: stretch;
          margin-top: 47px;
          line-height: 1.2;
          
          font-size: 24px;
          font-family: 'Inter', sans-serif;
        }
        @media (max-width: 99100px) {
          .title {
            font-size: 30px;
          }
        }
        .search-form {
          display: flex;
          margin-top: 0px;
          width: 400px;
          max-width: 100%;
          flex-direction: column;
          font-weight: 500;
        }
        .search-input {
          display: block;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          border: 1px solid rgba(224, 224, 224, 1);
          border-radius: 8px;
          background-color: #fff;
          color: #828282;
          padding: 5px 16px;
          font-size: 20px;
          font-family: 'Inter', sans-serif;
          margin-bottom: 16px;
        }
        .search-button {
          display: block;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          background-color: #000;
          color: #fff;
          white-space: nowrap;
          padding: 8px 16px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .search-button {
            white-space: initial;
            padding: 8px 20px;
          }
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

export default MyComponent;

