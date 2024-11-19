import React from 'react';
import supabase from '../Client';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CreatePost = () => {
    // stores info of previous user input
    const location = useLocation();
    // stores the event object
    const formData  = location.state;

    // store user input to make API call to update database
    const [ userInput, setUserInput ] = useState({
            name: '',
            date: '',
            location: '',
            desc: '',
            likes: 0
        });

    // prefill form if data already in formData
    const updateForm = () => {
        if (formData) {
            setUserInput( { name: formData.name, date: formData.date, location: formData.location, desc: formData.desc, 
                likes: formData.likes } )
        } else {
            setUserInput( { name: '', date: '', location: '', desc: '', likes: 0 } )
        }
    }
    useEffect(() => { updateForm() }, [])

    console.log(userInput)

    // updates user input as input entered
    const handleInput = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    // make POST or PUT request to supabase
    const onCreate = async (e) => {
        e.preventDefault();

        try {
            // if content in formData, update event, else - create new event
            if (formData) {
                const { data, error } = await supabase.from('posts').update(userInput).eq('id', formData.id).select();
                // console.log(data)
                console.log(error)
                alert('Your post has been updated!');
                
            } else {
                // make API call to database to make new event post
                const { data, error } = await supabase.from('posts').insert(userInput).select();
                // console.log(data)
                console.log(error)
                alert('Your post has been created!');
            }
        } catch (err) {
            alert('There was an error when making your post. Please try again.');
        }
        // clear form
        setUserInput({ name: '', date: '', location: '', desc: '', likes: 0 });
    }

    return(
        <div role='presentation' className="create">
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