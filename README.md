###### Mano Sriram
# Beltech Mini-Project

### Requirements
1. NodeJS
2. Express (not needed separately, can do using ```npm install```)
3. NPM
Reason to go with NodeJS:
    1. Asynchronous.
    2. Easy to setup.
    3. I am more familiar with it :)

### APIs
There are 3 APIs in this project:
1. /getAll: Gets all data as a JSON.
2. /search?station=xyz: Send JSON data of stations whose names match with xyz.
3. /distance?from=id1&to=id2: Send distance between two given stations.

### Assumptions
Some assumptions which I made are:
1. Data is strictly limited to given CSV. If the structure of data changes, then there is a possibility of application breakage.
2. In Distance API, if any of the ids doesn't exist or not in the same line, error response is returned(422).

### Tradeoffs
1. Might have used some kind of Caching to cache request data instead of reading from file everytime. Not much difference as the size of the data is small.

### Screenshots
#### /getAll
![distance](https://res.cloudinary.com/dm9nyy1ta/image/upload/v1616254683/getAll_kmznml.png)

#### /station
![distance](https://res.cloudinary.com/dm9nyy1ta/image/upload/v1616254682/station_zmggkc.png)

#### /distance
![distance](https://res.cloudinary.com/dm9nyy1ta/image/upload/v1616255202/distance_eo1g62.png)

### Steps to Run:
1. Download NodeJS [here](https://nodejs.org/dist/v14.16.0/node-v14.16.0.pkg)
2. In the root path of the project, do ```npm install```
3. Then, start the application at port 5050 using ```npm run dev```
4. Go to http://localhost:5050/{API} to access any of the three APIs.
