// Dependencies
import React from 'react';

// Components
import Post from './Post';

// Redux
import { useSelector } from 'react-redux';

import { selectCurrentForum } from '../../../redux/slices/forumSlice';

// Material UI Styles
import Grid from '@material-ui/core/Grid';

function PostsList() {
    // Redux Handles
    const currentForum = useSelector(selectCurrentForum);
    const posts = currentForum.posts;

    return (
        <Grid item xs={12}>
            {posts &&
                posts.map((post) => {
                    return (
                        <Post
                            title={post.title}
                            content={post.content}
                            key={post._id}
                        />
                    );
                })}
        </Grid>
    );
}

export default PostsList;
