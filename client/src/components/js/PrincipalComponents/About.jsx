import React from "react";
import Swal from 'sweetalert2';

import styles from "../../styles/About.module.css";
import plano from "../../../scr_img/plano.png";
import profileImge from "../../../scr_img/profile-pic.png";
import papel from "../../../scr_img/papel.png";

const About = () => {

    const copytext=(text)=>{
        navigator.clipboard.writeText(text);
        Swal.fire(
            'Copied!',
            '',
            'success'
        )
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <h1>ABOUT THE PROJECT</h1>
            </div>
            <div className={styles.bodyAndImgameContainer}>
                <div className={styles.body}>
                    <h3>This project was develop for my individual project of the bootcamp Soy Henry</h3>
                    <h3>with the technologies:</h3>
                    <ul>
                        <li>JavaScript</li>
                        <li>Node js</li>
                        <li>React js</li>
                        <li>Sequelize</li>
                        <li>Redux js</li>
                        <li>HTML / CSS</li>
                        <li>Postgres SQL</li>
                    </ul>
                </div>
                <img src={plano} alt="" />
            </div>
            <div className={styles.header}>
                <h1>ABOUT THE DEVELOPER</h1>
            </div>
            <div className={styles.bodyAndImgameContainer}>
                <div className={styles.body}>
                    <h3>Camilo Sarmiento.</h3>
                    <h4>Full Stack Developer</h4>
                    <p>Focused on the continuous 
                        learning of new skills,
                        with the ability to create applications using web
                        technologies, highlighting the solution of problems
                        in the environment and in teams. With skills in creating
                        applications using JS, React, Redux, Node, Express, PosgresSQL,
                        Sequileze, MongoDB, Mongoose and among others.</p>
                </div>
                <img src={profileImge} alt="" />
            </div>
            <div className={styles.header}>
                <h1>CONTACT</h1>
            </div>
            <div className={styles.contact}>
                <div>
                    <h3>camilo.sarmiento.amado@gmail.com</h3>
                    <img  src={papel} onClick={()=>copytext("camilo.sarmiento.amado@gmail.com")} alt="" />
                </div>
                <div className={styles.socialNet}>
                    <a target="_blank" href="https://www.linkedin.com/in/camilo-sarmiento-051a80244/">
                    <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="" />
                    </a>
                    <a target="_blank" href="https://github.com/Camilo-845">
                    <img src="https://cdn-icons-png.flaticon.com/512/3291/3291667.png" alt="" />
                    </a>
                    <a target="_blank" href="https://www.instagram.com/">
                    <img src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png" alt="" />
                    </a>
                    <a target="_blank" href="https://twitter.com/CamiloSar_24">
                    <img src="https://cdn-icons-png.flaticon.com/512/2504/2504947.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}


export default About;