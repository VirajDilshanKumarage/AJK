import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../Component/Loader/Loader';
import './Home.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import homeImage from '../../../src/asset/home_image.png';
import 'animate.css/animate.min.css';
import { HiHand } from 'react-icons/hi';








function Home() {
  return (
    <>
    
    <div  className='home_content '>
      <div className='mb-5 text-center'>
            <h3 className='mb-3'>Welcome</h3>
            <p>`Hello There` <span><HiHand/></span></p>
            <hr className='mb-4'  style={{ borderColor: '#3498db' }} />
            <img src={homeImage} className='home_image' alt='Home' />
      </div>
    </div>
    
    </>
  
  )
}

export default Home