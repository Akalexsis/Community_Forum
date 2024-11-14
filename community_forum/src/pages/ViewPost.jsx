import React from 'react';
import supabase from '../Client';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ViewPost = () => {
    const location = useLocation();
    const post = location.state;
    console.log(post)

    const onDelete = async (e) => {
        e.preventDefault();
        // delete post by post id
        const { data, status } = await supabase.from("posts").delete().eq("id", post.id ).select();
        // if deletion success - success alert, else - try again alert
        if (status === 200 ) {
            alert(`Your post ${post.name} has been deleted`);
            
        } else {
            alert(`There was an error in deleting your post ${post.name}. Please try again`);
        }
    }

    return(
        <div className="post-desc">
            <Link to='/events'> Back </Link>
            <div className="post-info">
                <h3> { post.name } </h3>
                <p> { post.date } </p>
                <p> { post.location } </p>
                <p> { post.desc } </p>
            </div>
            
            <div className='actions-bar'>
                {/* like post */}
                <button> Likes: {post.likes} </button>
                {/* go to comments */}
                <p> Comments </p>
                {/* edit post */}
                <Link to={`/create/${post.id}`} state={post}> Edit </Link>
                {/* delete post */}
                <button onClick={onDelete}> Delete </button>
            </div>
            <div className="comments" id='comment-section'>
                <p> No comments here yet! </p>
            </div>
        </div>
    )
}

export default ViewPost;