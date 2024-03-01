possible template: https://codesandbox.io/p/sandbox/fredrikosebergchatbot-tutorial-dt6l7?file=%2Fsrc%2FApp.js%3A16%2C20

#Sriya 2/25:
currently using [firebase](https://console.firebase.google.com/) as the DB for the chatbox and google login authentication feature. 

#Front-end TODO (most-least prio):
1. Feature where user can close out of the Chatbot conversation
2. Creating a Conversations list that is linked to the chatbox after user closes
3. Sign-out feature
4. Feedback page
5. Make the site look nice lol 

  \+ update html to include tailwind elements

### React Router
Tutorial: https://www.w3schools.com/react/react_router.asp
Docs: (https://reactrouter.com/en/main/start/overview)https://reactrouter.com/en/main/start/overview
Navigate from one page to another: https://stackoverflow.com/questions/37295377/how-to-navigate-from-one-page-to-another-in-react-js

elements that appear on every page go in Layout.js

### Daisy UI
Docs: https://daisyui.com/components/

### Colors
The following colors are in the tailwind theme:
        'niner-green': '#00703c',
        'theme-bg': '#f8f8f8',
        'secondary-text': '#666666',
        'primary-text': '#333333',

### Retrieving User from Auth
To get the user from auth in a component:
~~~
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
~~~