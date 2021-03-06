import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import siteLogo from '../../assets/images/logo_ah_secondo.png';
import siteLogoSmall from '../../assets/images/logo_ah_small.png';
import { Img, Button } from '../common';
import HeaderUserMenu from './HeaderUserMenu/HeaderUserMenu';
import HeaderUserImage from './HeaderUserImage/HeaderUserImage';
import Notification from './Notifications/getNotifications';
import edit from '../../assets/icons/edit.png';
// import search from '../../assets/icons/search.svg';

class Header extends Component {
  state = { showUserMenu: false };

  componentDidMount = async () => {
    window.document.addEventListener('click', (e) => {
      const { parentNode, classList } = e.srcElement;
      return (
        (classList || parentNode.classList)
        && !classList.contains('header-user-button')
        && !parentNode.classList.contains('HeaderUserImage')
        && this.setState({ showUserMenu: false })
      );
    });
  };

  toggleUserMenu = () => {
    const { showUserMenu } = this.state;
    this.setState({ showUserMenu: !showUserMenu });
  };

  render() {
    let isAuth;
    if (localStorage.getItem('token') !== null) {
      isAuth = true;
    } else {
      isAuth = false;
    }
    const { showUserMenu } = this.state;
    return (
      <header className="Header">
        <div className="container1">
          <div className="small-screen-1 medium-screen-2 large-screen-2">
            <div className="logo hide-on-small">
              <Link to="/">
                <Img imgSrc={siteLogo} alt="Authors Haven" />
              </Link>
            </div>
            <div className="logo-small hide-on-medium hide-on-large">
              < Link to="/">
                <Img imgSrc={siteLogoSmall} alt="Authors Haven" width="60px" />
              </Link>
            </div>
          </div>

          <div className="small-screen-3 medium-screen-2 large-screen-2 right-align">
            { isAuth && window.location.pathname !== '/createArticle' ? (
                <Link to="/createArticle">
                <small className='header-create-article-icon'><img src={edit} /></small>
                <small className= 'create-article-text-header'>Create article</small>
                </Link>
            ) : (
              ' '
            )}

            {window.location.pathname !== '/search' ? (
                <span className="inline-block header-search-button">
                  <Link to="/search">
                  <FontAwesomeIcon icon={faSearch} style={{ color: '#000000' }} />
                  </Link>
                </span>
            ) : (
              ' '
            )}
            {isAuth && (<Notification />)}
            <span className="inline-block header-user-button">
              <Button
                buttonClass="button white"
                id="toggleUserMenuButton"
                onClick={this.toggleUserMenu}
              >
                <HeaderUserImage />
              </Button>

              {showUserMenu ? <HeaderUserMenu /> : ''}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  isAuth: PropTypes.bool,
};

const mapStateToProps = ({ userCredentials: { userCredentials: { isAuth } } }) => ({ isAuth });


export default connect(mapStateToProps)(Header);
