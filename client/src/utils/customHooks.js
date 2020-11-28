import { useLocation } from 'react-router-dom';

export function useForumId() {
    const location = useLocation();

    const forumId = location.pathname.split('/')[2];

    return forumId;
}

export function usePostId() {
    const location = useLocation();

    const postId = location.pathname.split('/')[2];

    return postId;
}
