import React from 'react';
import supabase from '../Client';
import { useState } from 'react';

const CreatePost = () => {
    // store user input to make API call to update database
    const [ userInput, setUserInput ] = useState({
        name: '',
        date: '',
        location: '',
        desc: '',
        likes: 0
    });
    console.log(userInput)

    // updates user input as input entered
    const handleInput = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    const onCreate = async (e) => {
        e.preventDefault();

        // make API call to database to make new event post
        const { data, error } = await supabase.from('posts').insert(userInput).select();
        console.log(data)
        console.log(error)
        // clear form
        setUserInput({ name: '', date: '', location: '', desc: '', likes: 0 });
    }

    return(
        <div className="create">
            <form className='create-event'>
                <label htmlFor="name"> Name </label>
                <input type="text" name='name' placeholder='Name of event' value={userInput.name} onChange={handleInput} required/>
                <label htmlFor="date"> Date </label>
                <input type="date" name='date' value={userInput.date} onChange={handleInput}/>
                <label htmlFor="location"> Location </label>
                <input type="text" name='location' placeholder='Event location' value={userInput.location} onChange={handleInput} required/>
                <label htmlFor="desc"> Description </label>
                <input type="text" name='desc' placeholder='Description' value={userInput.desc} onChange={handleInput} required/>
                <button onClick={onCreate}> Create Event! </button>
            </form>
        </div>
    )
}

export default CreatePost;