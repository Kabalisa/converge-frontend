import React, { Component, Fragment } from 'react';
import TopMenu from '../components/navbars/TopMenu';
import SideBar from '../components/commons/SideBar';
import '../assets/styles/sidebar.scss';
import SetupInfoPage from '../components/setup/SetupInfoPage';


// eslint-disable-next-line react/prefer-stateless-function
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBaroption: 'home',
    };
  }
  SetSidebarOption = (link) => {
    this.setState(state => ({
      ...state,
      sideBaroption: link,
    }));
  };
  render() {
    return (
      <Fragment>
        <TopMenu />
        <SideBar setContent={this.SetSidebarOption} />
        <div className="divTitle">
          {this.state.sideBaroption === 'home' && <div>Home</div>}
          {this.state.sideBaroption === 'meeting' && <div>Meetings</div>}
          {this.state.sideBaroption === 'insights' && <div>Insights</div>}
          {this.state.sideBaroption === 'setup' && <div><SetupInfoPage /></div>}
          {this.state.sideBaroption === 'devices' && <div>Devices</div>}
          {this.state.sideBaroption === 'resources' && <div>Resources</div>}
          {this.state.sideBaroption === 'people' && <div>People</div>}
          {this.state.sideBaroption === 'rooms' && <div>Rooms</div>}
        </div>
      </Fragment>
    );
  }
}

export default Container;
