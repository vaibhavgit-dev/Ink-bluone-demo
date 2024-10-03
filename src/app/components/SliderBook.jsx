import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftarrow from "@/app/assests/image/leftarrow.svg";
import rightarrow from "@/app/assests/image/rightarrow.svg";
import Image from "next/image";

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="custom-arrow next-arrow absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer p-2 z-10"
      onClick={onClick}
    >
      <Image src={rightarrow} width={25} height={25} alt="Next" />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="custom-arrow prev-arrow absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer p-2 z-10"
      onClick={handleClick}
    >
      <Image src={leftarrow} width={25} height={25} alt="Prev" />
    </div>
  );
};

const SliderBook = ({ testimonials }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="wrapper bg-[#DDF5FF] w-full relative">
      <div className="container mx-auto p-0 pt-6">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center p-8 w-full">
              <p className="text-xl md:text-2xl text-gray-700">“{testimonial.quote}”</p>
              <div className="text-center mt-6">
                <p className="text-xl font-bold text-blue-800">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.designation}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderBook;
