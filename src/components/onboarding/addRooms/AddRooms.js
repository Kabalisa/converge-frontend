/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from 'react';
import '../../../assets/styles/addroom.scss';
import BuildingCardFloor from '../../commons/BuildingCardFloor';
import InputWithNumbers from '../../commons/InputWithNumbers';
import roomImage from '../../../assets/images/roomImage.png';
import roomImage2 from '../../../assets/images/roomImage2.png';
import { Input } from '../../commons/Input';
import backIcon from '../../../assets/images/ic_back.svg';


class AddRooms extends Component {
  state= {
    Floors: ['Floor 1', 'Floor 2'],
    activeFloor: 'Floor 1',
    block: 'Block A',
  };
  render() {
    const { Floors, activeFloor, block } = this.state;
    return (
      <Fragment>
        <div>
          <div className="addroom-page-title">
            <div className="back_icon">
              <img src={backIcon} alt="back icon" />
            </div>
            <div>
              <span className="addroom-title">Add Rooms</span>
            </div>
          </div>
          <div>
            <p>Set the structure of your Center</p>
            <BuildingCardFloor Floors={Floors} activeFloor={activeFloor} block={block} />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div>
          <p>How many meetings rooms are in Floor 1?</p>
          <InputWithNumbers />
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <p>Name Your Meetings Rooms</p>
          <div className="name-rooms">
            <div className="name-rooms-left">
              <div className="name-rooms-image">
                <img src={roomImage} alt="room name" />
                <Input placeholder="Congitio" />
              </div>
            </div>
            <div className="name-rooms-right">
              <div className="name-rooms-image">
                <img src={roomImage2} alt="room name" />
                <Input placeholder="Congitio" />
              </div>
            </div>

          </div>
        </div>
      </Fragment>
    );
  }
}
export default AddRooms;
