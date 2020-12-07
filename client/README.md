# Todo

-   [ ] If a user joins a public forum, then I have to add that forum id to the user's forum array.
-   [ ] 'slices/authSlice': the 'loginUser' function has a catch statement with an error method that only needs to be dispatched when there are errors in the form.
-   [ ] 'forum component': grab all the posts for the forum and save them to redux store, select it from store and use it in the forum page. Change file names appropriately.
-   [ ] 'forum' component: when screen is small, add divider component between post list and members panel.

# Issues History

-   [x] Error Messages for Invalid Inputs
-   [x] Reset Error Messages After Form Submit and on Component Mount
-   [x] Encrypt Private Password Before Saving to DB
-   [x] The User model has to have an array that stores the ids of all the forums of which the user is a member.
-   [x] Access the User's ID from User's document when creating a new forum. Add the forum id to the user via the user's id.
-   [x] After every refresh, the Redux store is wiped of its data. I'll have to save the data (I wish to persist) to localStorage and retrieve it on every reload and redux store update. Or, I can use a third-party library; however, most of the available packages (e.g. redux-persist) are not frequently maintained.
-   [x] 'forumAuthSlice.js' in createForum() function: dispatch is causing error. (Resolution: I was sending data to my backend in the wrong format.)
-   [x] If user isn't a part of any forums, then redirect them to the 'Get Started' page, prompting them to join or create a forum.
-   [x] Recheck 'Get Started' page functionality.
-   [x] In 'utils/storeUsersForumsInLocalStorage' file, have 'setUsersForumsInLocalStorage' function be responsible for only one action.
-   [x] Clear localStorage on logout.
-   [x] Fix issue where numOfComments variable was preventing the display of the single post. numOfComments is false when a post doesn't have any comments, thus preventing display of post.

# Stuff I Learned

## Technical

In regards to the 'react-router-dom' package: each Route component has a history prop that can be accessed by the React component to which it points. It's a method that takes one parameter--a path to which you wish to direct the client.

In regards to the 'reactjs/toolkit' package: this package simplifies the setup process for Redux. It leaves you to focus your attention on the two main components of the Redux system: the store and the reducers, the former being the data bank and the latter, the functions that update the data within the store.

In regards to selector functions in Redux: selectors are functions that return a specific datum within the store. The names for selector functions are, by convention, prefixed with the keyword _select_.

In regards to thunk functions in Redux: thunk functions allow us to invoke asynchronous operations.

In regards to syntax: you can shorten object definitions if the key and value are the same name (e.g. { userId } has userId as a key and the value inserted into userId will be the value stored in the variable userId).

## Non-Technical

### Tracking Progress

It's a good idea to have some sort of progress-charting system in place for keeping track of what you've finished, what you're currently working on, and what you have left to do.

Having such a system in place expedites the development process. You don't have to waste time trying to orient yourself on what to do whenever you start working. (This wasn't a necessity when I was working on smaller projects.)

And, there are certain problems or features that aren't important at the moment, but may have to be dealt with at a later point in time. This system would keep a record of those accounts.

### Work Habits

If at all possible, try to end each session with a feature finished or a bug resolved.

Recognize when you've been sitting on a bug for too long. If no progress towards a solution is being made, then consider taking a break. Often times, I'll sit on a bug thinking that I'm only minutes away from finding a good solution. This extends the amount of time I sit on the problem, further extending and fomenting my frustrations. The time you spend working on a problem cannot be considered a sunk cost. Remember this!

Don't sacrifice quality for speed. Write code you can be proud of.

Learn to pace yourself. Slow things down. Speed is definitely important, but if it's at the cost of code quality and personal interest in the project, then I'd recommend to slow things down. Longevity and sustainability is key.
