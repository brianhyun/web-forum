// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Post from './Post';

// Material UI Styles
import Grid from '@material-ui/core/Grid';

function PostsList(props) {
    // React Handles
    const [forumPosts, setForumPosts] = useState([]);

    useEffect(() => {
        const forumId = props.forumId;

        axios
            .post('/api/forums/getForumPosts', { forumId })
            .then((response) => {
                const forumPosts = response.data;

                setForumPosts(forumPosts);
            })
            .catch((err) => console.error(err));
    }, [props.forumId]);

    return (
        <Grid item xs={12}>
            {forumPosts &&
                forumPosts.map((post) => {
                    return (
                        <Post
                            title={post.title}
                            content={post.content}
                            author={post.author.name}
                            authorId={post.author._id}
                            key={post._id}
                        />
                    );
                })}
        </Grid>
    );
}

export default PostsList;
