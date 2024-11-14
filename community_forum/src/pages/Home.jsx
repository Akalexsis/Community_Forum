import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../Client';

const Home = () => {
    // store all events
    const [ events, setEvents ] = useState();
    // sets the like count for each event
    const [ likes, setLikes ] = useState([{
        likes: 0
    }])

    // get all events from api
    const getEvents =  async () => {
        // only want 4 upcoming events
        const { data, status } = await supabase.from("posts").select().limit(4).order('date', { ascending: true });
        console.log(data);
        setEvents(data);
        // update likes and ensure every like is stored in likes
        // setLikes(likes => [...likes, {likes: events.likes} ])
    }
    console.log(events)

    // make only one API call
    useEffect(() => { getEvents() }, []);

    // increase like count on click
    const onLike = async (event) => {
        
        // update likes by 1
        const likeCount = event.likes+1
        const { data, status } = await supabase.from("posts").update({likes: likeCount}).eq('id', event.id).select();
        console.log(data);
        setLikes(data)
    }

    return(
        <div className="home">
            <div className="about-container" role='organize information'>
                <div className="about-info" >
                    {/* title should be short, descriptive, and large */}
                    <h1> Welcome to Atlanta! </h1>
                    <p> Live in Atlanta and hoping to try something new? Just moved here and trying to meet new people? 
                        Visiting from out of town and hoping to explore the city? This page is just for you! Browse around 
                        to find and attend upcoming events. If you are interested in an event, be sure to like it and leave 
                        a comment. Click the 'View Events' button to start browsing!                
                    </p>
                    <Link to='/events'> View Events </Link>
                </div>
            </div>
            <div className="home-events">
                <h2> View Upcoming Events </h2>
                <div className="posts-container">
                { events && events.length === 0 ? <div> No posts yet! </div> : 
                    ( events && events.map((event) => (
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
                            {/* <Link to={`/create/${event.id}`} state={event}> Edit </Link> */}
                            {/* should go at top next to name */}
                            <button onClick={() => onLike(event)}> Likes: {event.likes} </button>
                        </div>
                    )) )
                }
                </div>
                <Link to='/events' id='view-events'> View Events </Link>
            </div>
        </div>
    )
}

export default Home;