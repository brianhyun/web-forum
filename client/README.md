# Todo

-   [ ] If a user joins a public forum, then I have to add that forum id to the user's forum array.
-   [ ] Remove usersForum array in localStorage on logout.
-   [ ] If the user is on the dashboard page but they aren't any forums, then use React state to hide the create post and sidebar informational panel and show "add new post" jumbotron.
-   [ ] On forum page load, grab all the posts for the forum and save them to redux store, select it from store and use it in the forum page. Change file names appropriately.
-   [ ] In 'utils/storeUsersForumsInLocalStorage' file, have 'setUsersForumsInLocalStorage' function be responsible for only one action.
-   [ ] In 'slices/authSlice' file, the 'loginUser' function has a catch statement with an error method that only needs to be dispatched when there are errors in the form.

# Issues History

-   [x] Error Messages for Invalid Inputs
-   [x] Reset Error Messages After Form Submit and on Component Mount
-   [x] Encrypt Private Password Before Saving to DB
-   [x] The User model has to have an array that stores the ids of all the forums of which the user is a member.
-   [x] Access the User's ID from User's document when creating a new forum. Add the forum id to the user via the user's id.
-   [x] After every refresh, the Redux store is wiped of its data. I'll have to save the data (I wish to persist) to localStorage and retrieve it on every reload and redux store update. Or, I can use a third-party library; however, most of the available packages (e.g. redux-persist) are not frequently maintained.
-   [x] 'forumAuthSlice.js' in createForum() function: dispatch is causing error. (Resolution: I was sending data to my backend in the wrong format.)
-   [x] If user isn't a part of any forums, then redirect them to the 'Get Started' page, prompting them to join or create a forum.

# Stuff I Learned

## Technical

In regards to the 'react-router-dom' package: each Route component has a history prop that can be accessed by the React component to which it points. It's a method that takes one parameter--a path to which you wish to direct the client.

In regards to the 'reactjs/toolkit' package: this package simplifies the setup process for Redux. It leaves you to focus your attention on the two main components of the Redux system: the store and the reducers, the former being the data bank and the latter, the functions that update the data within the store.

In regards to selector functions in Redux: selectors are functions that return a specific datum within the store. The names for selector functions are, by convention, prefixed with the keyword _select_.

In regards to thunk functions in Redux: thunk functions allow us to invoke asynchronous operations.

## Non-Technical

### Tracking Progress

It's a good idea to have some sort of progress-charting system in place for keeping track of what you've finished, what you're currently working on, and what you have left to do.

Having such a system in place expedites the development process. You don't have to waste time trying to orient yourself on what to do whenever you start working. (This wasn't a necessity when I was working on smaller projects.)

And, there are certain problems or features that aren't important at the moment, but may have to be dealt with at a later point in time. This system would keep a record of those accounts.

### Work Habits

If at all possible, try to end each session with a feature finished or a bug resolved.

Recognize when you've been sitting on a bug for too long. If no progress towards a solution is being made, then consider taking a break.

Don't sacrifice quality for speed. Write code you can be proud of.
