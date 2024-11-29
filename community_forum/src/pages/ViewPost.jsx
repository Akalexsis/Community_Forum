import React from 'react';
import supabase from '../Client';
import './viewPost.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ViewPost = () => {
    // gathers information on event currently viewing
    const location = useLocation();
    const post = location.state;
    console.log(post)

    // create and update comment
    const [ comment, setComment ] = useState( { author: '', text: '' } );
    console.log(comment)
    // store and display all comments
    const [ comments, setComments ] = useState([]);

    // deleting posts should display a delete message
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

    // submits comments to page
    const onComment = (e) => { 
        e.preventDefault();
        // appends new comment to end of comment list to display 
        setComments( [comment, ...comments] );
        // reset input field
        setComment( { author: '', text: '' } );
    }

    const handleComment = (e) => {
        setComment({...comment, [e.target.name]: e.target.value })
    }
    return(
        <div role='presentation' className="post-actions">
            <Link to='/events'> Back </Link>
            {/* displays all post information */}
            <div className='view-post' role='presentation'>
                <div className="post-data">
                    <div className="post-info" role='presentation'>
                        <h3> { post.name } </h3>
                        <p> { post.date } </p>
                        <p> { post.location } </p>
                    </div>
                    <div className="post-desc" role='presentation'>
                        <img src={ post.image } alt="User should upload an image here" />
                        <p> { post.desc }</p>
                    </div>
                </div>
                {/*  ACTION BAR - actions to take on page like add comment, like post, edit and delete post */}
                <div role='presentation' className='actions-bar'>
                    {/* like post */}
                    <button> Likes: {post.likes} </button>
                    {/* go to comments */}
                    <p> Comments </p>
                    {/* edit post */}
                    <Link to={`/create/${post.id}`} state={post}> Edit </Link>
                    {/* delete post */}
                    <button onClick={onDelete} id='delete'> Delete </button>
                </div>
            </div>
            
            {/* COMMENTS - form for users to add comments*/}
            <div role='presentation' id='create-comment'>
                <form className='comments'>
                    <label htmlFor="author"> Name </label>
                    <input type="text" name='author' placeholder='Enter your name here' value={comment.author} onChange={handleComment} />
                    <label htmlFor="text"> Comment </label>
                    <input id='comment-txt' type="text" name='text' placeholder='Enter your thoughts ...' value={comment.text} onChange={handleComment} />
                    <button onClick={onComment}> Comment! </button>
                </form>
            </div>
            {/* display comments */}
            <div role='presentation' className='comments-section'>
                { comments.length == 0 ? <p> No comments yet. Start the discussion! </p> : (
                    comments && comments.map((comment) => 
                    <div className="comment-content" role='presentation'>
                        <h4> {comment.author} </h4>
                        <p> {comment.text} </p>
                    </div> )
                )}
            </div>
        </div>
    )
}

export default ViewPost;