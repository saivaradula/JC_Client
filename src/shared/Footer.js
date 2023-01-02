import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between py-2">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="#" target="_blank" rel="noopener noreferrer">JustCasting </a>2022</span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">A <a href="#" target="_blank" rel="noopener noreferrer"> Admin </a> portal by JustCasting</span>
        </div>
      </footer>
    );
  }
}

export default Footer;