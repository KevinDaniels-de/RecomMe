# RecomMe
 RecomMe is a single page application where you can recommend stores in your university and redeem vouchers to earn experience points.

# Database (500)
# Users
If a user has authenticated himself via his desired method (e-mail, facebook, google), a user is created in the database which, in addition to the login data such as user name, profile picture and ID, also stores the current location, earned experience points, the number of recommendations and people the user met. The position is updated every 5 seconds (if it has changed) to reduce the database fetches.

# Stores
This collection is filled by the developers. It contains all data of the shop and also the redeemable vouchers. Not only the shop but also each voucher gets its own ID to ensure later relationships between other tables and thus persistent data. Since each shop may have very different vouchers, it is not worth setting up a separate table for vouchers and referring to it in "stores".

# Recommendations
This collection is intended to link the "Users" and "Stores" tables. When a user recommends a store, a new entry is created with the respective ID's and the current time. This is very important, because by default a user should only recommend a store every 24 hours to avoid getting experience points without end.

# Vouchers
If a user redeems a voucher, a new entry is created in this collection. Similar to "Recommendations" a user should normally only be able to redeem a voucher every 48 hours. The entry consists of the respective ID's.

# Functions (750)
# Experience System
As one of the most important elements that have been taken from the game design is the "Experience System". This motivates the user to stay in the app for a long time and to use it intensively. With the help of the algorithm you only need the total number of experience points as raw data, as well as an optional bonus. The bonus is mainly used to multiply the current experience gained at a daily event. The function that receives the experience points outputs an object that shows the current level as an integer and a rounded percentage. Behind the percentage is the amount of experience left after calculating the level, which tells you how far you are to the next level. In the component "Level" you find the algorithm, so you can insert this component everywhere. In the case of our application in profile and radar.

# Radar
The second core element of the application is the radar. This is used to search for all users who are within a radius of 10 kilometres and have recently recommended something. If the user clicks on one of these people, he or she receives further experience points. To determine the distance between the persons a function was implemented which compares the coordinates of both users and outputs a relatively precise distance in meters. The radar shows a maximum of five people and every 60 seconds the next ones from the pool of users are displayed. This can greatly increase the time the user spends on the radar. At the same time, new people can be displayed if the user does not want to wait that long and the application pauses.

# Zeitlimit
There are time limits when recommending a shop or redeeming a voucher. Based on the current system time and the time stored in the database, the difference is calculated to determine whether the user can take advantage of this action again. In the respective places you can see the waiting time in a countdown, which is updated every second.

# Usability Tests (500)

# Conclusion (250)