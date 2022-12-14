# Introduction
This was definitely an interesting assignment and one that gave me a great opportunity to expose myself to new, cutting edge technologies in the fullstack development space, and ones that I am extremely excited to learn more about and eventually master. I only had a few hours (5-7) to work on this assignment if I wanted to submit it sufficiently early. This included doing all preliminary reasearch about all the different technologies used in the stator stack,
a full back end implementation, front end implementation, debugging, and this final documentation. This is the first time I use typeORM, nestjs, redux, and the first time in a long time that I use material-UI. Because of this, I made the implementation of all the specific features described in the assignment instructions, as well as the ones in the bonus points section, my absolute priority. I did not focus on styling, nor did I take the time to go above and beyond to implement features such as a login, a true rating based on aggregations of other user ratings, or specific product detail pages. This would have definitely been my intention should I have had a more reasonable time-frame to work on this assignment, and I hope that that does not affect my standing. I ensured that everything mentioned in the directions, including what was mentioned in the bonus points section was completed and working currectly, and given my understanding, that should hopefully be enough. If I have misunderstood something, and in reality you are planning on assessing me based on the quality of the styling and colors I used for the page for example, please understand that I was not aware of that, and if you would like to see more styling work, I can get on that immediately. Again, my goal was to submit something that met all requirements as early as possible. 

# How to Run
Initially, I had serious trouble getting stator to run on my machine, which turned out to be some issue regarding access to logging when I was running the run postgres command. To fix this, I ran the postgres command without sudo, and which is why now, I have two versions of the postgres script, one postgres, and postgres:nosudo. I then also had to create two different scripts for that allow you to run all 3 apps concurrently, run_all and run_all:nosudo. This was the quickest solution to the bug I was facing. So to run the application, ensure you have docker installed and that your docker daemon is running. Also, ensure you are running node version 14.x, I managed to do this using nvm:
```
nvm use 14
```
Then, assuming you have both docker and node 14.x installed and configured correctly, install dependencies in the project directory:

```
npm install
```

At different points npm had issues resolving dependencies, so I had to resort to running: 

```
npm install --legacy-peer-deps
```
and then simply run 

```
npm run run_all
```
The application should now be visible on http://localhost:4200/. 

# Overview of Front End implementation
My goal was to implement the front end as simply as is possible. I developed a component called "ProductCard" that displayed relevant information about products, including their name, rating, picture, and either a LoadingIconButton that allowed you to add the item to your card, or a red Button that allows you to remove the item from your cart. Every product that the ProductsPage pulls from the db is mapped to a single one of these cards, with the appropriate props passed in, and they are displayed in a grid pattern on the page. 

# Overview of Back End Implementation
This was relatively simple, as the only interactions with the db that were required were the basic CRUD endpoints, meaning that I could apply the basic nestjs/CRUD template used for todo items directly to product items, without much modification. I also had to define a separate entity description for the 'product' type. I mainly used Postman to debug the api. The way I persisted the rating and 'inCart' state in the db was using attributes directly inside the product entity, products had a rating and inCart attribute that you can change using the UI. I am totally aware that this is not how it would be done in a real world application, and that to simulate a real application, each product would have an aggregated rating based on ratings of all users, and what would dictate whether or not a product is in a user's cart would be some attribute attached to the user, not the product. However, given the time contstraints, this was the fastest way to implement the required functionality.

# How I populate the DB with dummy data
Now, the issue here is that we do not share access to a remote DB, and I did not implement some adminstrative page where you could add products to the DB. So my simple solution that ensures that all users that run this application manage to populate the DB with the same 9 products. What I added is simply a useEffect in the product page that has a callback that checks first if the getProducts query is loading, if not, it checks if there are 0 products in the DB (which will be the case the first time you run the application), and if so, creates 9 products described in a separate file in the DB. From this point forward, the DB will be populated, so this callback will never execute again. Also, I passed an empty dependency array to the useEffect, so it will only run once, when the page renders.
