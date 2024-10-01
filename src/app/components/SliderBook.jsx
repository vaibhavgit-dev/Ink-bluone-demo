import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBook = ({ testimonials }) => {
  const settings = {
    dots: false,         
    infinite: true,     
    speed: 500,         
    slidesToShow: 1,    
    slidesToScroll: 1,   
    autoplay: true,     
    autoplaySpeed: 3000, 
    arrows: true       
  };

  return (
    <div className="wrapper bg-[#DDF5FF] w-full">
      <div className="container mx-auto p-0 pt-6">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center p-8 w-full">
              <div className="text-4xl font-serif text-gray-600 mb-4">“</div>
              <p className="text-xl md:text-2xl text-gray-700">
                {testimonial.quote}
              </p>
              <div className="text-center mt-6">
                <p className="text-xl font-bold text-blue-800">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderBook;
