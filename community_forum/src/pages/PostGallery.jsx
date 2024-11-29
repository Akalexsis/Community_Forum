import React from 'react';
import supabase from '../Client';
import './post.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostGallery = () => {
    // renders events to screen
    const [ events, setEvents ] = useState();
    // search for events
    const [ search, setSearch ] = useState('');
    // sets the like count for each event
    const [ likes, setLikes ] = useState([{
        likes: 0
    }])

    // get all events from api
    const getEvents =  async () => {
        // get and display all events
        const { data, status } = await supabase.from("posts").select().order('date', { ascending: true });
        setEvents(data);
        // update likes and ensure every like is stored in likes
        // setLikes(likes => [...likes, {likes: events.likes} ])
    }
    // make only one API call
    useEffect(() => { getEvents() }, []);

    // increase like count on click
    const onLike = async (event) => {
        // update likes by 1
        const likeCount = event.likes+1
        const { data, status } = await supabase.from("posts").update({likes: likeCount}).eq('id', event.id).select();
        setLikes(data);
    }
 
    // filter through events in database to find event that matches search value when button clicked
    const onSearch = async (e) => {
        e.preventDefault();
        try {
            // if user searches for a value display, else - re-render
            if (search) {
                // if search has a value, find posts in the database with it and return it
                const { data, status } = await supabase.from("posts").select('name').textSearch("name", search).select();
                console.log(data)
                // re-render the events based on results of filter
                setEvents(data);
            } else {
                // re-set the events variable
                getEvents()
            }
        } catch (err) {
            alert('There was an error processing your request!')
        }
    }
    useEffect(() => { onSearch() }, []);

    // re-orders posts based on like count and date
    const onFilter = async (e, column, order) => {
        e.preventDefault();
        // column - name of column to order, order - boolean value that controls order of posts
        const { data, status } = await supabase.from("posts").select().order(column, { ascending: order });
        // re-renders posts based on order of filter
        setEvents(data);
    }

    return(
        <div role='presentation' className="post-gallery">
            {/* search for events */}
            <form className='search'>
                <input type="text" name='search' placeholder='Search events' value={search} onChange={ (e) =>  setSearch(e.target.value) }/>
                <button onClick={onSearch} id='search-bttn'> Search </button>
                <button onClick={getEvents} id='reset-bttn'> Reset Filters </button>
                { search==='' ? <div></div> : <h2> Showing Results for {search} </h2>}
            </form>
            <div role='presentation' className="filters">
                <h3> Filters </h3>
                <div id='likes'>
                    <h3> Likes: </h3>
                    <button onClick={(e) => onFilter(e, 'likes', false)}> Most </button>
                    <button onClick={(e) => onFilter(e,'likes', true)}> Least </button>
                </div>
                <div id="date">
                    <h3> Date: </h3>
                    <button onClick={(e) => onFilter(e,'date', true)}> Soonest </button>
                    <button onClick={(e) => onFilter(e,'date', false)}> Latest </button>
                </div>
            </div>
            {/* display events */}
            <div role='presentation' className="posts-container">
                { events && events.length === 0 ? <div> No posts found! </div> : ( events && events.map((event) => (
                    <div className="post" key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.location}</p> 
                        <p>{event.date}</p>
                        <div className='image-container'>
                            <img src={event.image} alt="Users should upload images here" />
                        </div>
                        <button onClick={() => onLike(event)}> Likes: {event.likes} </button>
                        {/* go to the info page and pass data along to that page */}
                        <Link to={`/info/${event.id}`} state={event}> View Info </Link>
                        {/* time post was made */}
                        <p id='timestamp'>{event.created_at}</p>
                        {/* should go at top next to name */}
                        
                    </div>
                    )))
                }
                </div>
        </div>
    )
}

export default PostGallery;