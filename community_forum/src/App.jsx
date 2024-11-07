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
      path: '/gallery',
      element: <PostGallery />
    },
    {
      path: '/info/:postInfo',
      element: <ViewPost />
    }
  ])

  return (
    <div>
      <nav>
        <h1>Atlanta Events Page</h1>
        <Link to="/"> Home </Link>
        <Link to="/gallery"> Events </Link>
        {/* in CSS, this should be a dif color to draw attention to it */}
        <Link to="/create/new"> Create Event </Link>
      </nav>
      <div className="routes">
        {routes}
      </div>
    </div>
  )
}

export default App
