const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session')
const path = require('path');

const playground = require('./data/playground');
const user = require('./data/user');


app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));


configRoutes(app);

app.listen(3000, () => {
  // createTextIndexes();
  // createFakeData();
  console.log("Server is started");
  console.log('Your routes will be running on http://localhost:3000');
});

async function main() {
  try {
    console.log("Create playground")
    const user1 = await user.createUser("Sriptradha","Bhat","admin","sbhat8@stevens.edu","Admin@123","Admin@123");
    console.log(play1)
    var user1_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }
  try {
    console.log("Create User 2")
    const user2 = await user.createUser("Sidd ","Maske","sidd052","smaske@stevens.edu","Sidd@123","Sidd@123");
    console.log(user2)
    var user2_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }

  try {
    console.log("Create playground")
    const play1 = await playground.createPlayground("Overpeck County Park Football Field", "2022-02-03 Sunday 6:00 pm, 2022-02-03 Sunday 7:00 pm,2022-02-03 Sunday 8:00 pm,2022-02-04 Monday 6:00 pm", ["parking", "locker room"], "105m * 68m", "Overpeck County Park Football Field, 230 Roosevelt Pl, Palisades Park, NJ 07650","../public/images/image-1652082503551.jpg");
    console.log(play1)
    var play1_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }

  try {
    console.log("Create playground")
    const play2 = await playground.createPlayground("Liberty State Park Playground", "Monday-Friday 6AM-10PM", ["parking", "locker room", "Gym"], "1212 acre", "535 Freedom Way, Jersey City, NJ 07305","../public/images/image-1652082503551.jpg");
    console.log(play1)
    var play2_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }

  try {
    console.log("Create playground")
    const play3 = await playground.createPlayground("Newport Green Park", "2022-02-03 Sunday 6:00 pm, 2022-02-03 Sunday 7:00 pm,2022-02-03 Sunday 8:00 pm,2022-02-04 Monday 6:00 pm", ["parking", "locker room"], "105m * 68m", "Green Park, 14th St, Jersey City, NJ 07310","../public/images/image-1652082503551.jpg");
    console.log(play1)
    var play3_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }

  try {
    console.log("Create playground")
    const play4 = await playground.createPlayground("17th St Playground", "2022-02-03 Sunday 6:00 pm, 2022-02-03 Sunday 7:00 pm,2022-02-03 Sunday 8:00 pm,2022-02-04 Monday 6:00 pm", ["parking", "locker room"], "105m * 68m", "1701 West St, Union City, NJ 07087","../public/images/image-1652082503551.jpg");
    console.log(play1)
    var play4_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }

  try {
    console.log("Create playground")
    const play5 = await playground.createPlayground("Weehawken Public Playground", "2022-02-03 Sunday 6:00 pm, 2022-02-03 Sunday 7:00 pm,2022-02-03 Sunday 8:00 pm,2022-02-04 Monday 6:00 pm", ["parking", "locker room"], "105m * 68m", " NJ-495, Weehawken, NJ 07086","../public/images/image-1652082503551.jpg");
    console.log(play1)
    var play5_id = play1._id;
    console.log("\n")
  } catch (error) {
    console.log(error)
  }
}

main()