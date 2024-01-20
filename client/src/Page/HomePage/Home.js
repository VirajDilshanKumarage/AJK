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
import { IoMdHand } from 'react-icons/io';








function Home() {
  return (
    <>
    <Loader/>
      <div>
          <div className='home_content '>
              <div>
                <h3 className='d-flex justify-content-center align-items-center'>welcome</h3>
                <p className='d-flex justify-content-center align-items-center'>' Hello There '<IoMdHand className='m-1'/></p>
              </div>
          </div>
          <div>
            <img src={homeImage} className='position-absolute top-50 start-50 translate-middle w-40 h-50' id='HomeImage'></img>
          </div>
      </div>
    </>
  
  )
}

export default Home