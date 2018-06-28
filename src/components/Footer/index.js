import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">

            <div className="col-12">
              <ul className="footer__social clearfix">
                <li>
                  <a href="https://medium.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-medium"></i></a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                </li>
                <li>
                  <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-reddit"></i></a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                </li>
              </ul>
            </div>

            <div className="col-12">
              <small className="footer__copyright">Copyright © 2018. All rights reserved</small>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
