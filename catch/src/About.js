import React from "react";
import './About.css';


function About() {

    return (
        <div className="body">
            <div className="container">
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <h2>About</h2>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <p>Raymond Ezekiel</p>
                            <p>ITMD-463</p>

                            <p>This application was deisgned to mimic that of a photo sharing application</p>
                            <p>such as Instagram or Tumblr.</p>
                            <p>But less crowded. </p>
                            <p>More images and uploads with good captions, less unecessary features.</p>
                            <p><i>Enjoy, Catch</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}

export default About;