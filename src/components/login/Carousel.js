import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import '../../assets/styles/carousel.scss';
import safariMeetingRoom from '../../assets/images/SafariMeetingRoom.png';
import cognitio from '../../assets/images/cognitio.jpg';
import entebbe from '../../assets/images/entebbe.png';
import banku from '../../assets/images/banku.jpg';


class CustomCarousel extends Component {
  state = {
    position: 0,
    rooms: [
      {
        legend: 'Safari Meeting Room, Andela New York',
        img: safariMeetingRoom,
      },
      {
        legend: 'Cognitio Meeting Room, Andela Lagos',
        img: cognitio,
      },
      {
        legend: 'Entebbe Meeting Room, Andela Kampala',
        img: entebbe,
      },
      {
        legend: 'Banku Meeting Room, Andela Lagos',
        img: banku,
      },
    ],
  };

  componentDidUpdate = () => {
    const { autoplay } = this.props;
    return autoplay ? this.slider.slickPlay() : this.slider.slickPause();
  }

  onImageChange = (imgPosition) => {
    const { position, rooms } = this.state;
    if (position < rooms.length) {
      this.setState({ position: imgPosition });
    } else {
      this.setState({ position: 0 });
    }
  }


  render() {
    const { legendPosition } = this.props;
    const { rooms, position } = this.state;
    const settings = {
      dots: true,
      fade: true,
      dotsClass: 'slick-dots',
      pauseOnHover: false,
      infinite: true,
      pauseOnFocus: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 3000,
      touchThreshold: 100,
      slidesToShow: 1,
      slidesToScroll: 3,
      pauseOnDotsHover: true,
      cssEase: 'ease-in',
      appendDots: dots => (
        <div id="adjust-dots">
          <ul> {dots} </ul>
        </div>
      ),
    };
    return (
      <div className="carousel">
        <Slider ref={(slider) => { this.slider = slider; }} className="slide" selectedItem={position} onChange={imgPosition => this.onImageChange(imgPosition)} {...settings}>
          {rooms.map(({ legend, img }) => (
            <div key={legend}>
              <p className={`legend ${legendPosition}`}>{legend}</p>
              <img src={img} alt={legend} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

CustomCarousel.propTypes = {
  legendPosition: PropTypes.string,
  autoplay: PropTypes.bool,
};

CustomCarousel.defaultProps = {
  legendPosition: 'center',
  autoplay: true,
};


export default CustomCarousel;
