
// import app css to style the webpage
import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input, requirePropFactory } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import catchlogo from './catchlogo.svg';

import { Link } from 'react-router-dom';
import About from './About.js';




//styling from material UI for modal(pop up window)
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // this will resemble an array of the posts (feed) inside the application
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false); //for the open object in the modal section
  //this is simply how variables are set in React
  const [openSignIn, setOpenSignIn] = useState('false');
  //set states for username, password, and email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null) //keeps track of user




  useEffect(() => {
    //this code serves as back end listner; if we log in/don't etc
    //any signle time  change happens the code below fires off
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        //CONSOLE LOG THE USER THEN CAPTURE USER INTO THE STATE CREATED
        //KEEP USER LOGGED IN REGARDLESS OF REFRESH
        console.log(authUser);
        setUser(authUser);

      }
      else {
        //user has logged out
        setUser(null);
      }
    })

    return () => {
      //perform some clean up actions
      unsubscribe();
    }
  }, [user, username]);

  // useEffect runs a pecve of code based on a specific condition

  useEffect(() => {
    // this is where the code runs 
    //it runs every time a component such as posts change
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {

      //this is essentualoly a real time listnr. 
      //everytime something gtets pushed into colelction, it reires the pcde and update the 
      //post and rerenders t the page, it refies the code and in rel time re-renders it onto the screen
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, //gets the id of the document from the "posts" collection in firebase
        post: doc.data() //gets the actual data; caption, imageurl,username, of the corresponding document(id)
      }))); //this allows me to loop through it and give us access to it
    }) //this takes a snapshot and document of any changes made ot the databse(firebase)
  }, []); //sqaure brackets means run whatever code in above section once when the page refreshes

  const signUp = (event) => {
    //handles the sign up button
    event.preventDefault(); //avoids refresh
    auth
      .createUserWithEmailAndPassword(email, password) //creates user profile with email and password authentication
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
    //parses email and passowrd with the signup button(being passed from the states created) and catches any error-->creates an alert pop/error message on the screen
  }
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false); //closes up the modal/window once sign in process is complete
  }

  return (
    <div className="app">

      <Modal //this modal will serve as a pop up window to give users access to sign up -retrieved from material ui
        open={open}
        onClose={() => setOpen(false)} //sets the state of the modal of the modal to be false, closes everytime anywhere outside the modal is clicked / serves as an event listener
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img
                className="app-header-logo"
                src={catchlogo}
                alt=""
              />
            </center>

            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}> Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal //this modal will serve as a pop up window to give users access to sign in/log in
        open={openSignIn}
        onClose={() => setOpenSignIn(false)} //sets the state of the modal of the modal to be false, closes everytime anywhere outside the modal is clicked / serves as an event listener
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img
                className="app-header-logo"
                src={catchlogo}
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}> Sign In</Button>
          </form>
        </div>
      </Modal>

      {/* div header- for primary navigation bar on top of screen*/}
      <div className="app-header">
        <img
          className="app-header-logo"
          src={catchlogo}
          alt=""
        />


        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
            <div className="app-login">
              <Button className="sign-inbutt" onClick={() => setOpen(true)}> Sign In</Button>
              <Button onClick={() => setOpen(true)}> Sign Up</Button>
              <Link to='/About'>
                <Button> About</Button>
              </Link>             
            </div>

          )}
      </div>

      <div className="app-posts">
        {
          posts.map(({ id, post }) => (
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            //the above re-renders the new posts only and pushes the old one down. knows to refresh the new post
          ))
          //goes through every post above and returns every information and loops them
          //mapping goes through every post  outputting a mpost component evrytime theres information given.  
        }

      </div>



      {user?.displayName ? ( //optionals (?) in java script as replacement for try catch to apply the condition so as to not break if user is undefined
        //only renders if user is signed in.
        <ImageUpload username={user.displayName} /> /* section to upload an image and select the file is over here */

      ) : ( //if they arent login they get this message to log in
          <h3 className="warning"  > Sign Up or Sign in to upload an image  </h3>

        )}

    </div>
  );
}

export default App;
