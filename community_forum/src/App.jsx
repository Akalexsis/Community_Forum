import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostGallery from './pages/PostGallery'
import ViewPost from './pages/ViewPost'

function App() {
  // routes to all pages
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/create/:postID',
      element: <CreatePost />
    },
    {
      path: '/events',
      element: <PostGallery />
    },
    {
      path: '/info/:postInfo',
      element: <ViewPost />
    }
  ])

  return (
    <div className='App'>
      <nav>
        <h1>Explore Atlanta</h1>
        <div className="links">
          <Link to="/"> Home </Link>
          <Link to="/events"> Events </Link>
          {/* in CSS, this should be a dif color to draw attention to it */}
          <Link to="/create/new" id='create'> Create Event </Link>
        </div>
      </nav>
      <div className="routes">
        {routes}
      </div>
    </div>
  )
}

export default App
