
import './App.css';
import { Routes, Route } from 'react-router-dom';

function Nav() {
  return(
      <nav>
        <header>Logo</header>
        <div className='nav-link-container'>
            <a href='/'><button></button>Home</a>
            <a href='video-uploads'><button></button>Streams</a>
            <a href='audience'><button></button>Audience</a>
            <a href='analytics'><button></button>Analytics</a>
            <a href='settings'><button></button>Settings</a>
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
        <li>Copy and use your stream key below </li>
        <li>Press 'Go Live' button to begin</li>
      </ul>
    </div>
  )
}
function StreamSettingsRoute(){
  return (
    <>
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
      </>
  )
}
function App() {
  return (
    <div className="App">
      <Nav/>
      <main>
        <Routes>
          <Route path='/' element={<Library/>}/>
          <Route path='/stream' element={<StreamSettingsRoute/>}/>
          <Route path='/video-uploads' element={<Videos/>}/>
          <Route path='/audio-uploads' element={<AudioPage/>}/>
          <Route path='/audience' element={<Audience/>}/>
          <Route path='/analytics' element={<Analytics/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </main>
    </div>
  );
}

function Videos(){
  return (
      <div className='uploads-main-content'>
        <h1>Videos</h1>
        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
          </div>
        </section>

        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
          </div>
        </section>

        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
            <VideoItem/>
          </div>
        </section>
      </div>
  )
}
function AudioPage(){
  return (
      <div className='uploads-main-content'>
        <h1>Videos</h1>
        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
          </div>
        </section>

        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
          </div>
        </section>

        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
          </div>
        </section>

        <section className='section-content-collection'>
          <div className='section-header'>
            <span>Streams</span>
            <span>See all</span>
          </div>
          <div className='section-content'>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
            <AudioItem/>
          </div>
        </section>
        
        </div>
  )
}
function Audience(){
  return( <>Audience</>)
}
function Analytics(){
  return( <>Analytics</>)
}
function Settings(){
  return( <>Settings</>)
}
function VideoItem(){
  return(
    <>
      <div className='video-item-container'>
        <div className='video-item-poster'></div>
        <div className='video-item-details'>
          <span>Title</span>
          <span>date</span>
        </div>
      </div>
    </>
  )
}
function AudioItem(){
  return(
    <>
      <div className='audio-item-container'>
        <div className='audio-item-image'></div>
        <div className='audio-item-details'>
          <span>title</span>
          <span>poste date</span>
        </div>
      </div>
    </>
  )
}
function Library(){
  return( 
    <div className='library-container'>
      <div>
        <h1>Library</h1>
        <div className='header-content-container'>
          <div className='header-content'><a href="/stream">Go live</a></div>
          <div className='header-content'>upload Video</div>
          <div className='header-content'>Upload Audio</div>
          <div className='header-content'>create playlist</div>
          <div className='header-content'></div>
        </div>
      </div>
      <section className='section-content-collection'>
        <div className='section-header'>
          <span>Streams</span>
          <span><a href="video-uploads">See all</a></span>
        </div>
        <div className='section-content'>
          <VideoItem/>
          <VideoItem/>
          <VideoItem/>
          <VideoItem/>
        </div>
      </section>
      <section className='section-content-collection'>
        <div className='section-header'>
          <span>Audio</span>
          <span><a href="/audio-uploads">See all</a></span>
        </div>
        <div className='section-content'>
          <AudioItem/>
          <AudioItem/>
          <AudioItem/>
          <AudioItem/>
          <AudioItem/>
        </div>
      </section>
    </div>
  )
}
export default App;

// <div className='audio-item-buttons'>
// <button></button>
// <button></button>
// <button></button>
// <button></button>
// </div>