
import './style.css';

const Cards: React.FC = ()=>{

	return (
		<>
           <article className="col-md-12">

        <div className="cards-1 section-gray">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-blog">
                            <div className="card-image">
                                <a href="#"> <img className="img" src="http://adamthemes.com/demo/code/cards/images/blog01.jpeg" alt=''/>
                                    <div className="card-caption"> Quisque a bibendum magna </div>
                                </a>
                                <div className="ripple-cont"></div>
                            </div>
                            <div className="table">
                                <h6 className="category text-info">Cinema</h6>
                                <p className="card-description"> Lorem ipsum dolor sit amet, consectetur adipis cingelit. Etiam lacinia elit et placerat finibus. Praesent justo metus, pharetra vel nibh sit amet, tincidunt posuere nulla. Vivamus odio antement, feugiat eget nisi sit amet, scelerisque dignissim velit antement. </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="table table-info">
                                <h5 className="category-social">
                        <i className="fa fa-twitter"></i> Twitter
                      </h5>
                                <h4 className="card-caption">
                        <a href="#">"Vivamus odio ante, feugiat eget nisi sit amet, dignissim velit. Sus pendisse ultricies varius."</a>
                      </h4>
                                <div className="ftr">
                                    <div className="author">
                                        <a href="#"> <img src="http://adamthemes.com/demo/code/cards/images/avatar3.png" alt="" className="avatar img-raised" /> <span>Debbon Amet</span> </a>
                                    </div>
                                    <div className="stats"> <i className="fa fa-heart"></i> 365 &nbsp; <i className="fa fa-share-alt"></i> 120 </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                   
                </div>
            </div>
        </div>
      
    </article>        
    </>           
		);
};

export default Cards;