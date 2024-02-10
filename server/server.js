const express = require ('express');
const app = express();
const path = require ('path');
const cookieParser = require ('cookie-parser');
const mainRouter = require('./routers/mainRouter.js');
const userRouter = require('./routers/userRouter.js');
const sessionController = require('./controllers/sessionController.js');

app.use(express.json());
app.use(cookieParser());

// app.use('/', express.static(path.join(__dirname, '../client/')))

app.use('/user', userRouter);

app.use('/main', mainRouter);

app.get('/verified',
  sessionController.isLoggedIn,
 (req, res) => res.sendFile(path.join(__dirname, '../client/main.html'))
 );

app.get('/styles.css', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/styles.css')));

app.get('/',
  sessionController.isLoggedIn,
  (req, res) => res.sendFile(path.join(__dirname, '../client/main.html'))
  );

app.listen(3000);
//dont stopppppp, believingggggggggg <3 ;P 