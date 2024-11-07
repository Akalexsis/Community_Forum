import React from 'react';
import supabase from '../Client';
import { useState } from 'react';

const CreatePost = () => {
    // store user input to make API call to update database
    const [ userInput, setUserInput ] = useState({
        name: '',
        date: '',
        location: '',
        desc: ''
    });

    // updates user input as input entered
    const handleInput = () => {
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    return(
        <div className="create">
            <form className='create-event'>
                <label htmlFor="name"> Name </label>
                <input type="text" name='name' placeholder='Name of event' value={userInput.name} onChange={handleInput}/>
                {/* <label htmlFor="date"> Date </label>
                <input type="text" name='date' placeholder='Name of event' value={userInput.location} onChange={handleInput}/> */}
                <label htmlFor="location"> location </label>
                <input type="text" name='location' placeholder='Event location' value={userInput.location} onChange={handleInput}/>
                <label htmlFor="desc"> Description </label>
                <input type="text" name='desc' placeholder='Description' value={userInput.desc} onChange={handleInput}/>
            </form>
        </div>
    )
}

export default CreatePost;