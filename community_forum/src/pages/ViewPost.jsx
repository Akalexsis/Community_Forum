import React from 'react';
import supabase from '../Client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewPost = () => {
    return(
        <div className="post-info">
        View more post info page
        {/* edit post */}
        <Link to={`/create/${event.id}`} state={event}> Edit </Link>
        </div>
    )
}

export default ViewPost;