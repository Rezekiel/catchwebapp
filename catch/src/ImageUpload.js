import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from './firebase';
import firebase from "firebase";
import './ImageUpload.css';


function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    // const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');



    const handleChange = (e) => {//handle change function that fires off an event
        if (e.target.files[0]) { //get the file slected (first file selected) ----protects us from selecting multiple files to upload
            setImage(e.target.files[0]); //set the image in state to the file/image selected
        }
    };

    const handleUpload = () => {
        //creates a folder in firebase where all images will be stored "`images/`"
        //accesses the storage folder in firabase
        //image.name = name of file and put image is grabbing th eiamge and putting it 
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress functino that keep user updated on the progress of the upload
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            }, //code above is ismply for the visual of the progress bar/show progress
            (error) => {
                //error function..
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete the function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL() //inorder to get the url to do something, we have to get the download url via the referenced image folder and name
                    //this essentially grabs it to use as a POST submission
                    .then(url => { //uploads to firebase storage, gives us tdownload link then push the download link (imageUrl: url) as part of the post 
                        //this is where the image will be posted inside the database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),//allows to sort posts with correct timing---recent to the top
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);//resets the prgress bar to 0 after it's done
                        setCaption(""); //resets all the user forms for content upload
                        setImage(null);//brings it all back how it was before the user uploaded--blank
                    })
            }
        )
    }
    return (
        <div className="imageupload">
            {/* actual structure of the image upload section on the screen */}
           
            <progress className="imageprogress" value={progress} max="100" />
            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption} />
            {/* //fire off an event that keeps updating the caption */}
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
