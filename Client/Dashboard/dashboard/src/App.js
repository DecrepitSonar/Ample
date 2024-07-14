
import { useEffect } from 'react';
import './App.css';

function Nav() {
  return(
      <nav>
        <header>Logo</header>
        <div className='nav-link-container'>
          <ul>
            <li><button></button>Home</li>
            <li><button></button>Library</li>
            <li><button></button>Streams</li>
            <li><button></button>Audience</li>
            <li><button></button>Analytics</li>
            <li><button></button>Settings</li>
          </ul>
        </div>
        <div className='user-container'>
          <div className='user-image'></div>
          <span>Username</span>
          <button></button>
        </div>
      </nav>
  )
}
function Banner(){
  return(
    <div className='stream-banner'>
      <h2>Welcome to Ample Streams</h2>
      <h4>Before you start make sure you:</h4>
      <ul>
        <li>Make sure you have a reliable connection</li>
        <li>Press 'Go Live' button to begin</li>
      </ul>
    </div>
  )
}
function App() {

  useEffect(() => {
    fetch("http://138.197.140.151:8000/")
    .then( data => {
      console.log( data )
    })
  })
  return (
    <div className="App">
      <Nav/>
      <main>
        <Banner/>
        <div className='main-content'>
          <h1>Start Stream</h1>
          <div className='video-stream-check'></div>
          <div className='preview-check'>
            <span className='sub'>Preview</span>
            <span>Make sure video is working and everything else should be fine</span>
          </div>
          <div className='stream-detail-options'>
            <span className='sub'> Who else can see this?</span>
            <div className='stream-auth-options'>
              <button>Public</button>
              <button>Subscribers</button>
            </div>
            <span className='sub'> Notify members</span>
            <div className='stream-notification'>
              <span>Let your subscribers know when you go live</span>
              <div className='radio-toggle-container'>
                <div className='radio-toggle'></div>
              </div>
            </div>
            <span className='sub'>Stream key</span>
            <input disabled value="f7b44cfafd5c52223d5498196c8a2e7b" type="text" placeholder='Title' />

            <span className='sub'>Add Title</span>
            <input type="text" placeholder='Title' />

            <span className='sub'>Description</span>
            <input type="text" placeholder='Description' />

            <button className='submit'>Go Live</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
