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
        const { data, error } = await supabase.from("posts").select().limit(4).order('date', { ascending: true });
        console.log(error);
        setEvents(data);
    }
    console.log(events)

    // make only one API call
    useEffect(() => { getEvents() }, []);

    // increase like count on click
    const onLike = async (event) => {
        console.log(event);
        // const likeCount = event.like++
        // const { data, error } = await supabase.from("posts").update({likes: likeCount}).eq('id', event.id).select();
        // console.log(data);
    }

    return(
        <div className="home">
            <div className="about">
                {/* title should be short, descriptive, and large */}
                <h1> Welcome to Atlanta! </h1>
                <p> Do you currently live in or around Atlanta and hoping to try something new? Did you just move here and 
                    are trying to meet new people? Or are you visiting from out of town and hoping to try something new?
                    Well this forum is just for you! Here, you can post any event that you are hosting for those within the city
                    to attend. If you are interested in an event, be sure to like it and leave a comment if you would like to
                    learn more. Click the 'View Events' button to start browsing!                
                </p>
                <Link to='/events'> View Events </Link>
            </div>
            <div className="home-events">
                {/* large but smaller than title */}
                <h2> View Upcoming Events </h2>
                {/* ternary operator to decide what to render if no posts yet */}
                { events && events.length === 0 ? <div> No posts yet! </div> : 
                    ( events && events.map((event) => {
                        <div className="post">
                            <h3>{event.name}</h3>
                            {/* <p>{event.date}</p>
                            <p>{event.location}</p> */}
                            {/* go to the info page and pass data along to that page */}
                            {/* <Link to={`/info/${event.id}`} state={event}> View Info </Link>
                            <button onClick={() => onLike(event)}> Likes: {event.likes} </button> */}
                        </div>
                    }) )
                }
                <Link to='/events'> View Events </Link>
            </div>
        </div>
    )
}

export default Home;