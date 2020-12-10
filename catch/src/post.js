// this is the js for the post from the feed itself
import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';  //this enables me to create an avatar image for the user with the material ui kit


function Post({username, caption, imageUrl}) { //parse through the exct names from the APP.js file to display on the post
    return (
        <div className="post">
            <div className="post-head">             {/* create a div to contain username/avi; puts them next to each other */}

            <Avatar
                className="post-avi"
                alt="ramen"
                src="/static/images/avatar/1.jpg"
                />
            <h3>{username}</h3>
                </div>  {/* header ; avi and username */}
            

            {/* image post */}
            <img className="post-image"src={imageUrl} alt=""/>

            {/* username and caption for posted image */}
            <h4 className="post-caption"><strong> {username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
