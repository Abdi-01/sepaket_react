import React from 'react'
import { connect } from 'react-redux'
import "../assets/styles/front-page.css"
import frontpage from "../../src/assets/images/front-page.png"
import faq from "../../src/assets/images/faq.png"
import { Link } from "react-router-dom";

class frontPage extends React.Component {    
    render(){

        return (
            <div>
                <div class="container">
                    <div class="row">
                        
                        <div class="col-lg-7 col-md-12 col-12 d-flex align-items-center">
                            <div class="about-text">
                                <h6>Welcome......</h6>
                                <p>
                                    be there for their special day, show your love from anywhere, send them something thoughtful, recreating wonderful stories, because we believe every gift represent different meaning to each people according to their unique stories
                                </p>

                                <h1 class="animated animated-text pt-4 mt-4">
                                    <span>Sepaket</span>
                                    <div class="animated-info ms-3">
                                        <span class="animated-item">Parcel Natal</span>
                                        <span class="animated-item">Parcel Wisuda</span>
                                        <span class="animated-item">Custom Parcel</span>
                                    </div>
                                </h1>

                                <ul class="mt-2 pt-2">
                                    <li>mix & match gift items</li>
                                    <li>get free exclusive & beautiful card</li>
                                    <li>gift delivery to all Indonesia area</li>
                                    <li>sameday delivery available for Jabodetabek area</li>
                                </ul>

                                {
                                this.props.userGlobal.username? null
                                :
                                <div class="custom-btn-group mt-4">
                                <Link to="/Login"><a href="#login" class="btn mr-lg-2 custom-btn"><i class='uil uil-file-alt'></i> Login</a></Link>
                                <Link to="/Register"><a href="#register" class="btn custom-btn custom-btn-bg custom-btn-link">Register</a></Link>
                                </div>
                                }

                            </div>
                        </div>

                        <div class="col-lg-5 col-md-12 col-12">
                            <div class="about-image svg">
                                <img src={frontpage} class="img-fluid" alt="svg"/>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div class="container">
                    <div id="about" class="pt-5 col-lg-12 mx-auto ">
                        <h4 class="mx-2 px-2">About Us</h4>
                        <p class="mx-2 px-2">
                            Sepaket is a online-based gift purveyor. We’re here to help you, our customer, prepare a gift box plus the contents which will complete your special day with your loved ones. You can select the contents of the gift box from our selection of products

                            We believe that each and every of our customers have unique and special relationships with their closest people, thus we offer the freedom to our customers by channeling their personal touch through the gifts that we will pack into a box and deliver to the intended recipients. These gift boxes are unique and tailored to each receiver, and they represent the unique needs of our customers.

                            We also aim to deliver a convenient way of gift-shopping for our customer. We offer the ease of buying gifts by using a user-friendly website-based system, so all you have to do is make a few clicks here and there in the website, and we’ll take care of the rest!
                        </p>
                    </div>
                </div>

                <div class="container">
                    <div id="faq" class=" col-lg-12 mx-auto ">
                        <div class="panel-group accordion-main" id="accordion">

                            <img src={faq} class="img-fluid" alt="faq" style={{width : 300}}/>
                            
                            <div class="panel">
                                <a class="text-decoration-none text-dark panel-title " data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <p>How long does it take to complete a box?</p> 
                                </a>
                                <div id="collapseExample1" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>
                                        The whole process from your order to the shipping takes about 1-2 days, depending on the complexity of the personalization (please consider extra days for delivery time)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="panel">
                                <a class="text-decoration-none text-dark panel-title " data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <p>How can I estimate the arrival time of the gift box?</p> 
                                </a>
                                <div id="collapseExample2" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>
                                        Customers can adjust the arrival time by inputting the expected arrival time in the order form. Sepaket will ship the gift box accordingly (disclaimer : arrival time may be late if the courier experiences the unexpected, please allocate some spare time and input the exact address to avoid delay).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="panel">
                                <a class="text-decoration-none text-dark panel-title " data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <p>Can I send it directly to the recipient?</p> 
                                </a>
                                <div id="collapseExample3" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>
                                        Absolutely, you can fill the delivery address with your recipient’s details and we’ll send it directly to them!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            
                            <div class="panel">
                                <a class="text-decoration-none text-dark panel-title " data-bs-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <p>Is international shipping available?</p> 
                                </a>
                                <div id="collapseExample4" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>
                                        Currently Sepaket only delivers within the Indonesia area. But, we can help if you are overseas and wanting to deliver gifts to your loved ones in Indonesia.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="panel">
                                <a class="text-decoration-none text-dark panel-title " data-bs-toggle="collapse" href="#collapseExample5" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    <p>What if I had special requests?</p> 
                                </a>
                                <div id="collapseExample5" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>
                                        If you have special requests regarding specific delivery date or details of your gift box, please kindly write it down on the NOTE FOR BOX column during checkout or contact our team through our WhatsApp or Line@.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            
                
                <div id="contact" class="container my-4 py-4">
                    <div class="row">
                    
                        <div class="col-lg-5 mr-lg-5 col-12">
                            <div class="google-map w-100">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12088.558402180099!2d-73.99373482142036!3d40.75895421922642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855b8fb3083%3A0xa0f9aef176042a5c!2sTheater+District%2C+New+York%2C+NY%2C+USA!5e0!3m2!1sen!2smm!4v1549875377188" width="400" height="300" frameborder="0" style={{border:0}} allowfullscreen></iframe>
                            </div>
                        </div>

                        <div class="col-lg-6 col-12">
                            <div class="contact-form">
                            <h2 class="mb-4">Interested to work together? Let's talk</h2>

                            <form action="" method="get">
                                <div class="row">
                                <div class="col-lg-6 col-12">
                                    <input type="text" class="form-control" name="name" placeholder="Your Name" id="name"/>
                                </div>

                                <div class="col-lg-6 col-12">
                                    <input type="email" class="form-control" name="email" placeholder="Email" id="email"/>
                                </div>

                                <div class="col-12">
                                    <textarea name="message" rows="6" class="form-control" id="message" placeholder="Message"></textarea>
                                </div>

                                <div class="ml-lg-auto col-lg-5 col-12">
                                    <input type="submit" class="form-control submit-btn" value="Send"/>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user
    }
}


export default connect(mapStateToProps)(frontPage)
