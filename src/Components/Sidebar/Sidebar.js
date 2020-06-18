import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { TweenLite, TimelineLite, Power1, CSSPlugin, gsap } from "gsap";
import "./index.css";
import { logo } from "./logo";

class MySidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.drawer = null;
    this.menuBtn = null;
    this.contentVeil = null;
    this.drawerTween = new TimelineLite({
      paused: true,
    });
    this.toggleContentVeil = this.toggleContentVeil.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.veilClickHandler = this.veilClickHandler.bind(this);
  }
  toggleContentVeil() {
    TweenLite.set(this.contentVeil, {
      autoAlpha: this.drawerTween.reversed() ? 0 : 0.25,
    });
  }
  toggleDrawer() {
    this.drawerTween.reversed(!this.drawerTween.reversed());
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }
  veilClickHandler(e) {
    e.stopPropagation();
    this.toggleDrawer();
  }
  componentDidMount() {
    this.drawerTween
      .call(this.toggleContentVeil)
      .to(this.drawer, 0.25, {
        x: 0,
        ease: Power1.easeOut,
      })
      .to(
        this.menuBtn,
        0.25,
        {
          x: 170,
          ease: Power1.easeOut,
        },
        0
      )
      .reverse();
  }
  menuItemCreater(categories) {
    const menuItems = [
      { type: "link", url: "/", title: "Главная", icon: "fa-th-large" },
      { type: "divider", title: "divider-1" },
    ];
    if (Array.isArray(categories)) {
      categories.forEach((el) => {
        menuItems.push({
          type: "link",
          url: `/${el}`,
          title: el,
          icon: "fa-box",
        });
      });
    }
    menuItems.push({ type: "divider", title: "divider-2" });
    menuItems.push({
      type: "link",
      url: "/account",
      title: "Account",
      icon: "fa-user",
    });
    return menuItems;
  }
  render() {
    gsap.registerPlugin(CSSPlugin);
    // console.log(this.props)
    const menuItems = this.menuItemCreater(this.props.allCollections);
    return (
      <nav className="drawer-wrap">
        <div className="container-fluid menu-header">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6">
                <a href="tel:+375295804093">
                  <p className="h2 text-right telephone mt-2">
                    +375(29)580-40-93
                  </p>
                </a>
              </div>
              <div className="col-12 col-sm-6">
                <div className="h2 text-right mt-2">
                  <img
                    className="img-logo"
                    src={logo}
                    style={{ height: "60px" }}
                    alt="logo"
                  />
                  <p className="logo-text">
                    ТОВАРЫ ДЛЯ <br /> ДЕТЕЙ
                  </p>
                  {/* Sonushka.by */}
                </div>
              </div>
              {/* <div className="col-12">
                                <div className="h2 text-right mt-2">Sonushka.by</div>
                                <a href="tel:+375291234567"><p className="text-right telephone">+37529-1234567</p></a>
                            </div> */}
            </div>
          </div>
        </div>
        <div className="drawer" ref={(e) => (this.drawer = e)}>
          <div className="drawer-header">
            <h5 className="pl-3">Menu</h5>
          </div>
          <div className="menu-container py-3">
            {menuItems.map((e) => {
              if (e.type === "divider") {
                return <div className="divider" key={e.title}></div>;
              } else {
                return (
                  <NavLink
                    key={e.title}
                    exact
                    to={e.url}
                    className="menu-item"
                    onClick={(e) => {
                      this.toggleDrawer();
                      this.props.handlCategory(e.target.textContent);
                    }}
                    // onClick={(e)=>{console.log(e)}}
                  >
                    <i className={`fas ${e.icon} mr-3`}></i>
                    {e.title}
                  </NavLink>
                );
              }
            })}
          </div>
        </div>
        <button
          className="btn shadow-sml menu-button"
          ref={(e) => (this.menuBtn = e)}
          onClick={this.toggleDrawer}
        >
          <i
            className={`fas ${this.state.menuOpen ? "fa-times" : "fa-bars"}`}
          ></i>
        </button>
        <div
          className="content-veil"
          ref={(e) => (this.contentVeil = e)}
          onClick={this.veilClickHandler}
        ></div>
      </nav>
    );
  }
}

export default MySidebar;
