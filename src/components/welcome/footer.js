import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
        return(
            <div className='footer'>
                    <div className='footer-col'>
                        <div className='footer-logo'>
                            HBTU Connect
                        </div>
                        <div className='footer-developer'>
                            Developed By @yv-official
                        </div>
                        <div className='footer-copyright'>
                            Copyright @HBTU Connect
                        </div>
                        
                    </div>
                    <div className='footer-col'>
                        <div className='footer-links'>
                            <ul>
                                <li>Quick Links</li>
                                <li>
                                <Link className="footer-links-link" to='/'>
                                    Sign Up
                                </Link>
                                </li>
                                <li>
                                <Link className="footer-links-link" to='/about'>
                                    About
                                </Link>
                                </li>
                                <li>
                                <Link className="footer-links-link" to='/team'>
                                    Team
                                </Link>
                                </li>
                                <li>
                                <Link className="footer-links-link" to='/terms'>
                                    Terms & Policies
                                </Link>
                                </li>
                                <li>
                                <Link className="footer-links-link" to='/help'>
                                    Help
                                </Link>
                                </li>
                                <li>
                                <Link className="footer-links-link" to='/feedback'>
                                    Feedback
                                </Link>
                                </li>
                                
                            </ul>
                        </div>
                        
                    </div>
                    <div className='footer-col'>
                        <div className='footer-social-icons'>
                            <span className='footer-social-icons-heading'>
                                Connect with Us
                            </span>
                            <a href="#" target='blank' className="fa fa-facebook"></a>
                            <a href="#" target='blank' className="fa fa-twitter"></a>
                            <a href="#" target='blank' className="fa fa-linkedin"></a>
                            <a href="#" target='blank' className="fa fa-youtube"></a>
                            <a href="#" target='blank' className="fa fa-instagram"></a>
                            <a href="#" target='blank' className="fa fa-snapchat-ghost"></a>
                        </div>
                    </div>

        </div>
    )
};

export default Footer;