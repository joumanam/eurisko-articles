# General Overview

Eurisko Articles is a mobile application consisting of two main screens: Login and Dashboard. Its main purpose is simply helping users browse various interesting articles.

# Application Flow
The application flow is as follows: 
In the login screen, the user types her/his credentials in order to be directed to the dashboard. The user will be alerted in case the given credentials were incorrect.
In the dashboard screen, the first set of articles is automatically fetched, whereas the rest is fetched progressively each time the end of the list is reached. In our case, the articles API being used consists of 3 pages, with 10 articles each.

# Features and Functionalities
Aside from the obvious features such as logging in and fetching articles, the user is notified each time there's an API call by the loading spinners used in the login button, articles list and when loading more data. This helps the user know that his request is indeed being processed. 
Moreover, the user can search for specific words of an article's description or title for a faster way to find what they're looking for.
The user can also pull to refresh the page which will trigger the API call all over again. It is worth mentioning that the pull-to-refresh and the load-more features are disabled whenever the user is applying the search filter.

# Technologies
For this project, I've chosen to work with Typescript to prevent wasting time on type errors that could be avoided at runtime. For the handling of state management throughout the application, I've used Redux Toolkit. Although I initially wanted to go for plain Redux, I had to switch to the former library since Redux's createStore has been deprecated.
On another note, the token needed for articles API usage authorization has been stored using AsyncStorage library.

# General Notes
- Pages 1 and 2 of the articles API contain the same data, which will result in duplicate data in the articles list (although technically, each article has been given a unique key).
- This project was built and tested on Android only, since I work on Windows OS, so some UI features might differ on IOS devices.
