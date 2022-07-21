# doopy.gg
## Data Analytics Application for Riot Games Titles
## Current build (1.0) deployed for testing at ---> https://www.doopy.dev/

#### This Repo requires a Riot Games API Key to run!

#### Features (as of 7/21/2022) ->

### Main Page - 
#### Navigation between multiple different Riot Games Products as well as my personal social media links.
![Main Page](https://i.gyazo.com/d2ab4f6572da3bc15ee41a318b36cecb.png)

### User Historical Data - 
#### Match History, Data from Ranked Games throughout the current Season, and Recent Matches analytics.
![User Historical Data](https://i.gyazo.com/dfa9af28b570767a7bbd8a80d429e4f3.png)

### Expandable Match History - 
#### For more information on other players involved in the current match.
![Expandable Match History](https://i.gyazo.com/3ee4591be6c746164581350b48ecff4e.png)

### TFT Player Data - 
#### Still a large work-in-progress
![TFT Player Data WIP](https://i.gyazo.com/0ba3a980b078c7e29c9410098b2d324d.png)

### TFT Match History - 
#### Is also expandable!
![Also Expandable Match History](https://i.gyazo.com/13fe37a999dc4dc9c06c6b1eabc52390.png)

### Leaderboard Region Selection
![Leaderboard Selection](https://i.gyazo.com/a445208124176d1be8163b68d73af51d.png)

### Top 25 - 
#### Displays the top 25 players on the Challenger ladder in the selected region (most outdated)
![Top25](https://i.gyazo.com/40da861bdf51aa7c7d6dafb5bb1d2329.jpg)

#### Still a work in progress - but there are a substantial amount of tracking features available.
#### Will work without database integration, but it is much slower.

### Technical Features:
#### Constructed integrating React and Redux for state management on the front end, utilizes Node.js/Express API endpoints on the backend for server-side requests.

#### Reducers for each different application endpoint to manage page-based state without having cross-page state reference bugs.
#### Utilizes React Router for client-side page navigation between each different page.
#### Employs React Hooks for dynamically fetching component-based state data that changes per user and match (such as drop-down boxes).

#### Back-end API endpoints modularize checking database for summoner's last updated page state, updating summoner data, checking/updating summoner's state in NoSQL database.

#### Have any questions or comments? Please feel free to reach out by e-mail or Linkedin.
##### email - joeheinz99@gmail.com
##### Linkedin - https://www.linkedin.com/in/joseph-heinz1/

### Thanks for reading!
