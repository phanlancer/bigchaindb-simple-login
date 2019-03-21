import React, { Component } from "react";

import "./styles.css";

class Home extends Component {
  render() {
    return (
      <div>
        <section className="about about--arrow section--gradient">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="section__title section__title--white section__title--margin">
                  About Identiify Alpha
                </h2>
              </div>

              <div className="col-12">
                <div className="about__text">
                  <p>
                    We are developing a <b>Bigchaindb Demo</b> to secure privacy
                    of people. All <b>privacy information</b> such as name, date
                    of birth, address are kept in blocks of bigchaindb.
                  </p>
                  <p>
                    The entire process is extremely secured and no one without a
                    password can't see other's information.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--grey">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="section__title">How To Get Started</h2>
                <span className="section__tagline">Secure your Identify</span>
              </div>

              <div className="col-12 col-lg-4">
                <div className="box6">
                  <span className="box6__number">01</span>
                  <h3 className="box6__title">Register your information</h3>
                  <p className="box6__text">
                    Register your information in the form, and you will{" "}
                    <b>get a 16 characters password</b>. This password will be
                    used to see your information in the future.
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="box6">
                  <span className="box6__number">02</span>
                  <h3 className="box6__title">Log In</h3>
                  <p className="box6__text">
                    Log in the platform with the 16 characters password. Please
                    keep the password <b>secure</b> or others can see your
                    privacy information.
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="box6">
                  <span className="box6__number">03</span>
                  <h3 className="box6__title">See your information</h3>
                  <p className="box6__text">
                    Once log in, you can see your information which is{" "}
                    <b>secured by bigchaindb.</b>{" "}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <a href="/register" className="section__btn">
                  SIGN UP
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--pt0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h2 className="section__title">Roadmap</h2>
                <span className="section__tagline">Thorny path</span>
              </div>

              <div className="col-12 col-sm-10 offset-sm-1 col-lg-12 offset-lg-0">
                <ul className="roadmap">
                  <li>
                    <span>June 2018</span>
                    <p>Launch Demo version - proof of concept</p>
                  </li>
                  <li>
                    <span>September 2018</span>
                    <p>Launch MVP - key concepts are implemented</p>
                  </li>
                  <li>
                    <span>December 2018</span>
                    <p>Will consider later ....</p>
                  </li>
                </ul>
              </div>

              <div className="col-12">
                <a href="/register" className="section__btn">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
