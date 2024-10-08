import React from 'react'
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './footer.scss'

const Footer = () => {
  return (
   <footer id='footer'>
   <div className='leftFooter'>
   <h4>Download Our App</h4>
   <p>Download App for Android and IOS mobile phone</p>
   <img src={playStore} alt="playstore" />
    <img src={appStore} alt="Appstore" />
   </div>
   <div className="midFooter">
   <h1>ECOMMERCE.</h1>
    <p>High Quality is our first priority</p>

    <p>Copyrights 2024 &copy; Aryaman</p>
    <p>Testing Credentials: <br/>
        **email** :  test@gmail.com <br/>
        **password** :  password
    </p>
   </div>
   <div className="rightFooter">
   <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
   </div>
   </footer>
  )
}

export default Footer


