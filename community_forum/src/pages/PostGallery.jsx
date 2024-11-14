import React from 'react';
import supabase from '../Client';
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
        console.log(data);
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
                const { data, status } = await supabase.from("posts").select("name").textSearch("name", search)
                console.log(status)
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

    return(
        <div className="post-gallery">
            {/* search for events */}
            <form className='search'>
                <input type="text" name='search' placeholder='Search events' value={search} onChange={ (e) =>  setSearch(e.target.value) }/>
                <button onClick={onSearch}> Search </button>
                <button onClick={getEvents}> Reset Filters </button>
                { search==='' ? <div></div> : <h2> Showing Results for {search} </h2>}
            </form>
            <div className="filters">
                <h3> Filters </h3>
                <h3> Likes: </h3>
                <button> Most </button>
                <button> Least </button>
                <h3> Date: </h3>
                <button> Ascending </button>
                <button> Descending </button>
            </div>
            {/* display events */}
            <div className="posts-container">
                { events && events.length === 0 ? <div> No posts found! </div> : ( events && events.map((event) => (
                    <div className="post" key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.location}</p> 
                        <p>{event.date}</p>
                        <div className='image'>
                            image will appear here
                        </div>
                        {/* go to the info page and pass data along to that page */}
                        <Link to={`/info/${event.id}`} state={event}> View Info </Link>
                        {/* time post was made */}
                        <p id='timestamp'>{event.created_at}</p>
                        {/* should go at top next to name */}
                        <button onClick={() => onLike(event)}> Likes: {event.likes} </button>
                    </div>
                    )))
                }
                </div>
        </div>
    )
}

export default PostGallery;