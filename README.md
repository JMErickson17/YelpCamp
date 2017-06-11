# Yelp Camp 
 This application is heavily commented to narrate what the code is doing and is intended to be used as a reference. 
 
## Key Takeaways
Anything passed into app.use() will be executed on every route. 
 
## File Paths
Appending a slash (/) to the beginning of a file path specifies that the file is in the root directory.
 
## Working with Templates
To use an object property inside quotes use the ejs tags inside of the quotes

## RESTFUL Routes
RESTFUL routes follow a pattern to make a predictable structure.  

name        url        verb       description
===================================================================
INDEX      /dogs       GET        Display a list of all dogs
NEW        /dogs/new   GET        Displays a form to make a new dog
CREATE     /dogs       POST       Adds a new dog to the database
SHOW       /dogs/:id   GET        Shows info about one dog

## Nested Routes
RESTful routes can be combined 

## Modularity
Files that contain code that needs to be used in another file must be exported using module.exports and imported into
the file that needs the code with a require statement. 

## Seeds Files
A seed file is a file that can be ran to "seed" a database with data.

## Getting Data From The Database
When storing data by reference in the database, use the ".populate.exec()" methods to retrieve the data rather than the IDs.

## Authentication
Middleware "isLoggedIn()" is used to determine if a given user is logged in before redirecting them to a page that 
    requires the user to be logged in.
    
Passport enables req.user to contain the username and id of the currently logged in user.

## Authorization
Authorization refers to the permissions granted to a specific user.
IDs returned from the database are mongoose objects, IDs passed into the request are Strings. 
To compare the two, use the equals() method. 

## Express Router
