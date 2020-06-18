import React from "react"; // , { useState }
import { Container, Row } from "react-bootstrap";
// import { NavLink } from "react-router-dom";

import ItemCard from "../ItemCard/ItemCard";
import BrandSwiper from "./BrandSwiper";
import "./index.css";

const StartScreen = (props) => {
  // const [brand, setBrand] = useState("");
  const {
    location: { pathname },
    allBase,
  } = props;
  // console.log(allBase);

  const brandList = Object.keys(allBase)
    .filter((el) => {
      return allBase[el].brand;
    })
    .map((el) => {
      return allBase[el].brand;
    });

  // console.log(Array.from(new Set(brandList)));
  return (
    <Container fluid>
      <BrandSwiper brandList={brandList} />
      {/* <Navbar variant="light">
        {Array.from(new Set(brandList)).map((el) => {
          return (
            <NavLink key={el} exact className="menu-brand-item" to={`/${el}`}>
              {el}
            </NavLink>
          );
        })}
      </Navbar> */}
      <h1>{pathname.slice(1) === "" ? "Все товары" : pathname.slice(1)}</h1>
      <Row>
        {
          // eslint-disable-next-line array-callback-return
          Object.values(props.allBase).map((el) => {
            // console.log(el);
            if (el.category === pathname.slice(1)) {
              return <ItemCard {...props} key={el.name} item={el} />;
            }
            if (el.brand === pathname.slice(1)) {
              return <ItemCard {...props} key={el.name} item={el} />;
            }
            if (pathname.slice(1) === "") {
              return <ItemCard {...props} key={el.name} item={el} />;
            }
          })
        }
      </Row>
    </Container>
  );
};

export default StartScreen;
