import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../Client';

const Home = () => {
    // store all events
    const [ events, setEvents ] = useState();

    // get all events from api
    const getEvents =  async () => {
        // only want 4 upcoming events
        const { data, error } = await supabase.from("posts").select().limit(4).order('date', { ascending: false });
        console.log(error);
        setEvents(data);
    }
    console.log(events)

    // make only one API call
    useEffect(() => { getEvents() }, []);

    // increase like count on click
    const onLike = async (event) => {
        console.log(event);
        // update likes by 1
        const likeCount = event.likes+1
        const { data, error } = await supabase.from("posts").update({likes: likeCount}).eq('id', event.id).select();
        console.log(data);
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
                {/* large but smaller than title */}
                <h2> View Upcoming Events </h2>
                {/* ternary operator to decide what to render if no posts yet */}
                { events && events.length === 0 ? <div> No posts yet! </div> : 
                    ( events && events.map((event) => (
                        <div className="post" key={event.id}>
                            <h3>{event.name}</h3>
                            <p>{event.date}</p>
                            <p>{event.location}</p> 
                            {/* go to the info page and pass data along to that page */}
                            <Link to={`/info/${event.id}`} state={event}> View Info </Link>
                            {/* <Link to={`/create/${event.id}`} state={event}> Edit </Link> */}
                            <button onClick={() => onLike(event)}> Likes: {event.likes} </button>
                        </div>
                    )) )
                }
                <Link to='/events'> View Events </Link>
            </div>
        </div>
    )
}

export default Home;