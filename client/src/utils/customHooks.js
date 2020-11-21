import { useLocation } from 'react-router-dom';

export function useForumId() {
    const location = useLocation();

    const forumId = location.pathname.split('/')[2];

    return forumId;
}
