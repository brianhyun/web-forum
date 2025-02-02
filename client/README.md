# Todo

-   [ ] 'slices/authSlice': the 'loginUser' function has a catch statement with an error method that only needs to be dispatched when there are errors in the form.
-   [ ] 'forum' component: when screen is small, add divider component between post list and members panel.
-   [ ] Refresh tokens when expired.
-   [ ] If a new user tries to login, the app crashes. Most likely due to error handling system in backend login route or redux async flow.

# Issues History

-   [x] After every refresh, the Redux store is wiped of its data. I'll have to save the data (I wish to persist) to localStorage and retrieve it on every reload and redux store update. Or, I can use a third-party library; however, most of the available packages (e.g. redux-persist) are not frequently maintained.
-   [x] 'forumAuthSlice.js' in createForum() function: dispatch is causing error. Solution: I was sending data to my backend in the wrong format.
-   [x] Comments aren't being saved to the parent post. Solution: save the comment to the database first.
-   [x] Posts with zero comments aren't showing. Solution: numOfComments variable was preventing display of posts with zero comments. numOfComments is zero (equal to false) when a post has no comments and the conditional was stopping there.

# Stuff I Learned

## Technical

In regards to the 'react-router-dom' package: each Route component has a history prop that can be accessed by the React component to which it points. It's a method that takes one parameter--a path to which you wish to direct the client.

In regards to the 'reactjs/toolkit' package: this package simplifies the setup process for Redux. It leaves you to focus your attention on the two main components of the Redux system: the store and the reducers, the former being the data bank and the latter, the functions that update the data within the store.

In regards to selector functions in Redux: selectors are functions that return a specific datum within the store. The names for selector functions are, by convention, prefixed with the keyword _select_.

In regards to thunk functions in Redux: thunk functions allow us to invoke asynchronous operations.

In regards to syntax: you can shorten object definitions if the key and value are the same name (e.g. { userId } has userId as a key and the value inserted into userId will be the value stored in the variable userId).

In regards to writing functions: have it so that your functions are only responsible for one thing. Makes writing functions and debugging code easier. Also, easier to read.

In regards to Mongoose: make sure to save new documents to update the database.

## Non-Technical

### Tracking Progress

It's a good idea to have some sort of progress-charting system in place for keeping track of what you've finished, what you're currently working on, and what you have left to do.

Having such a system in place expedites the development process. You don't have to waste time trying to orient yourself on what to do whenever you start working. (This wasn't a necessity when I was working on smaller projects.)

And, there are certain problems or features that aren't important at the moment, but may have to be dealt with at a later point in time. This system would keep a record of those accounts.

### Work Habits

If at all possible, try to end each session with a feature finished or a bug resolved.

Recognize when you've been sitting on a bug for too long. If no progress towards a solution is being made, then consider taking a break. Often times, I'll sit on a bug thinking that I'm only minutes away from finding a good solution. This extends the amount of time I sit on the problem, further extending and fomenting my frustrations. The time you spend working on a problem should not be considered a sunk cost. Remember this!

Don't sacrifice quality for speed. Write code you can be proud of.

Learn to pace yourself. Slow things down. Speed is important, but if it's at the cost of code quality and personal interest in the project, then I'd recommend to slow things down. Longevity and sustainability is key.
