# AeroCRS Home Assignment

## Start the project
Im using the composer docker image.

To run the project -> ``` docker-compose up --build``` , open ```http://localhost:5001/index.php/ ``` and open the console. you can checkout the pixels.json.

## Questions
### Q. How long did the task take you to complete? 
A. Around 4 hours total.

### Q. How would you implement the server side differently in NodeJS?
A. I would set up a simple express app with 2 routes:
   GET / -> return some basic html 
   POST /api/pixel -> save data to a file

   I would also use fs module to save data to a file, maybe add some middleware to parse data.

### Q. How would you go about data consistency? (meaning the we use the same population if
   exists on the file/DB each time the app is reloaded)
A. We will need to fetch for 2 random parents each time we want to create a new pixel.
   This is actually a better solution now that im thinking about it, it shouldn't be hard to implement...
   Remove this line -> ```unlink($GLOBALS['jsonFile']);```
   And work with a MSSQL server instead of a json file, that will improve performance as the population grows.
   
### Q. How would you limit inbreeding?
A. I would ```Implement a nice way to save the relation between the pixels (add the relevant fields when you save the data to the JSON file)```. I would add ```parentAId: int``` and ```parentBId: int```, then we will need to check 2 things:
  - That the current pixel id we have is not equal to parentAId or parentBId (prevent ``` parent pixel with their direct child pixel  ``` )
  - If the pixel has parentAId and parentBId, then he is a child, and we need to make sure we are fetching a new one with
    different parentAId or parentBId.(Pixels of the same parents))




Thank you for your time!