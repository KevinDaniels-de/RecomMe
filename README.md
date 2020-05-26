# RecomMe

## Overview
RecomMe is an application that allows a user to redeem vouchers at local university facilities to get a discounted meal or drink. To unlock these vouchers a certain amount of experience points must be collected. The higher your level the more valuable vouchers you can unlock and use. The cost of redeeming a voucher is equal to the required level. Recommend a facility or using a voucher sets a 48-hour cooldown timer before a user can repeat that action. In order to gain experience points, the user can recommend the facility to other users or "collect" people nearby. A person in the neighbourhood brings more experience than the recommendation of a facility.

[**_Demo Website_**](https://recom-me.firebaseapp.com/)

# Implementation

## Design
For the layout of the app the Neomorphism style was chosen. This new-fangled look is supposed to be an intermediate step between flat- and material design. Since it is possible to define several box shadows in one selector in CSS, this design can also be used on the web and simulate a smooth three-dimensional look.
The color chosen was a strong, slightly matt purple, which is not too strenuous for the eyes and is currently in vogue, as the [Sondora](https://sondoramarketing.com/blog/2020-web-design-trends/) marketing agency explains.

## Database
### Users
If a user has authenticated himself via his desired method (mail, facebook, google), a user is created in the database which, in addition to the login data such as user name, profile picture and ID, the current location, earned experience points, the number of recommendations and people the user met will be also stored. The position is updated every 5 seconds (if it has changed) to reduce the database fetches and the experience, recommendations and met people when interacting with them.

### Stores
This collection is filled by the developers. It contains all data of the shop and also the redeemable vouchers. Not only the shop but also each voucher gets its own ID to ensure later relationships between other tables and thus persistent data. Since each shop may have very different vouchers, it is not worth setting up a separate table for vouchers and referring to it in "stores".

### Recommendations
This collection is intended to link the "Users" and "Stores" tables. When a user recommends a store, a new entry is created with the respective ID's and the current time. If a voucher is redeemed the entry has an addition field with the voucher ID to distinct between a store recommendation and a store voucher. This is very important, because by default a user should only recommend a store or redeeming a voucher every 48 hours to avoid getting experience points without limits.

# Functions
## Experience System
As one of the most important elements that have been taken from the game design is the "Experience System". This motivates the user to stay in the app for a long time and to use it intensively. With the help of the algorithm you only need the total number of experience points as raw data, as well as an optional bonus. 
```
const getLevel = exp => {
  let levelFormula = 1 * .75 * Math.sqrt(exp);

  return {
    level: Math.floor(levelFormula),
    percentage: Math.floor((levelFormula - Math.floor(levelFormula)) * 100)
  }
}
```


The bonus is mainly used to multiply the current experience gained at a daily event. The function that receives the experience points outputs an object that shows the current level as an integer and a rounded percentage. Behind the percentage is the amount of experience left after calculating the level, which tells you how far you are to the next level. In the component "Level" you find the algorithm, so you can insert this component everywhere. In the case of our application in profile and radar. When redeeming a voucher, the respective costs are being subtracted from the current experience. So, a level 12 voucher cost are the equivalent of 12 levels worth of experience. This feature is mandatory to encourage the user to save the experience for the better vouchers and increase the interaction with the app. To accomplish this the algorithm is being reversed to calculate the needed experience.
```
newUserData.experience = Math.floor(newUserData.experience - Math.pow(lv * (1/.75), 2));
```

## Radar
The second core element of the application is the radar. This is used to search for all users who are within a radius of 10 kilometres and have recently recommended something. If the user clicks on one of these people, he or she receives further experience points and the person moves to the status bar in the menu below and shows an update. For fetching the area users, it is necessary to filter the users based on the saved location. Since firestore cannot compare the range of two different fields it compares only the latitude to reduce the server performance and cutting the results roughly in half. The fetched result will then be compared by longitude by the client. To determine the distance between the persons a function was implemented which compares the coordinates of both users and outputs a relatively precise distance in meters. Per session it shows up to five people and shows a message when all people are collected. This can greatly increase the time the user spends on the radar. To effectively testing the application these coordinates are recommended since the predefined users are in this area:
```
Latitude:  51.6899836
Longitude: 8.6848593
```

## Limitations
There are time limits when recommending a shop or redeeming a voucher. Based on the current system time and the time stored in the database, the difference is calculated to determine whether the user can take advantage of this action again. In the respective places you can see the waiting time in a countdown, which is updated every real time second. Also only unlocked vouchers can be clicked.
 
## Login & Register
If the user is not logged in, he is automatically redirected to the "Login" component. Here he can sign in with his existing profile or through a social network. Alternatively, he can create a new profile through the "Register" component. 
Here it is also possible to upload a profile picture. Normally one would use the Firebase storage to create the file in the project and to reference to it. But in this case a technology was used which is natively supported by HTML Canvas. To use it without Canvas, the [FileReader](https://www.npmjs.com/package/filereader) is used, which makes it possible to open files and work with their properties. The uploaded image is read and the DataURL is output. This string of image data is then used as “photoUrl” in the database. This approach is convenient for smaller images below one megabyte but for larger formats it is very vulnerable to long loading times or faulty saving in the database.

If a profile has been created or a user has logged in, the database is searched for the user and displayed as soon as the authentication was successful, and the user-State has been changed. When creating a new user, however, Firebase's add() function is not used, but set(). This is very important for the data structure, because later on the user has to be updated and queried for. Because the document ID is randomly generated by add() there is no way to find the profile uniquely. With the set() functions you can also use the doc() function to choose your own ID. For this we take the user ID that is generated during authentication. So, the client always has a reference to the current user and can easily update it.

Both forms are using [Yup](https://github.com/jquense/yup) for parsing and validating the data and output an error message to the user if the fields are empty, not in the correct format or lacking the requirements.

## Routes
The application is divided into several routes, which can be reached via the navigation bar or a hyperlink. The following routes were implemented:
```
/dash
/login
/register
/radar
/browse
/browse/:title
```
The last route is a so-called dynamic route. The last word (title) can be chosen freely and assuming one choose the right one, the corresponding content will be rendered. In RecomMe these dynamic contents are the university facilities. The name of the institution counts as ID. More information can be found in [Store](#store).

If a route could not be found, because the route was misspelled or is generally not available, a redirect component automatically switches to the dashboard. If the user is not logged in, another redirect component ensures that the user is redirected to the login. This ensures that all routes are protected from access by unregistered users but is flexible enough to allow all routes and the 404 function to work regardless of whether you are logged in or not.

The "ViewHeader" component displays the current route using the useLocation() function to determine the current path. Based on the name, the name of the route is then displayed to the end user. In addition, the menu shows which route is currently active using the same useLocation() function. Both are important for accessibility, so that the user always knows where he is currently located. 


 
## Store
The "Store" component works with an object-prop and thus fills the user interface. But to decide which store object is the correct one, the checkStore() function filters the array based on the selected path. In combination with the dynamic route, this provides a flexible solution to fill a component appropriately.

As a small optical highlight, the interior design uses Rellax to create a simple parallax effect. When a user redeems a voucher or recommends the interior design a 48-hour countdown starts. This is updated every second and is used to tell the user when these elements are available again. If there is no feedback from the user interface, the end user may believe that the application may not function properly. The user also receives or loses experience points which are displayed as an update in the status bar in the menu.
Vouchers that the user has either redeemed or not yet activated are darker than normal and do not respond to a click. When redeeming a voucher an QR-Code is generated based on the String in the database thanks to qrcode-generator which is one of the few libraries that do not need hardware straining Canvas to generate image data but can output a <img> element.

# Evaluation

## Usability Tests
In the first report, the following tasks were designed and validated using a test group and the prototype:

```
1.	Log-in the app
2.	Browse the list of food/drink offers and select “Starbucks”
3.	Recommend “Starbucks” to all users in the area
4.	Use your current level to use a voucher for a coffee latte
```

After the implementation of the application was completed, these tasks were tested again to prove that the current application is fully functional.

Lastly, after extensive testing it can be said that all tasks are feasible and even partly exceed this. For the first task it is not only possible to log in, but also to register.

## Google Lighthouse
In order to validate the technical aspects of RecomMe the developer console tool "Audit" is being used which is specified as "Google Lighthouse". This tool shows various technical categories in percentage from 0 to 100.  
The test with Google Lighthouse shows that "Accessibility", "Best Practices" and "SEO" have reached the full score of 100 on the desktop and "SEO" on mobile still 92.
In terms of performance, desktop is 86 and mobile 87, which is also almost 90 and thus the green "perfect" zone. 
This shows that the application has been implemented technically very cleanly and will be executable on future devices, which increases customer loyalty tremendously since they are not stopped by long loading times or tremendous amount of data downloads while running the application.

# Conclusion

It can be said that the approach started with RecomMe has great potential to increase interaction between students and the use of university facilities. Future recommendations to maximize this potential would include more user interaction and expressive animations to enhance the quality and appearance of the application.

It would also be useful to enhance the radar more to improve the presentation of people in the environment in order to emphasize the human condition. Also, the usage of all firebase features like storage opens more possibilities of user data, not only for better technical implementations but also for marketing reasons and using the data in improvements of RecomMe.
