import React from "react";
import { styled, Container } from "@mui/system";
import { Typography } from "@mui/material";
import Carousel from "./Carousel.js";

const StyledDiv = styled("div")({
  backgroundImage: "url(./banner2.jpg)",
});

const StyledContainer = styled("Container")({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const StyleDivTagline = styled("div")({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const StyleCarousel = styled("Carousel")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const Banner = () => {
  return (
    <StyledDiv>
      <StyledContainer>
        <StyleDivTagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the info regarding your favorite Cryptocurrency!
          </Typography>
        </StyleDivTagline>
        <Carousel></Carousel>
      </StyledContainer>
    </StyledDiv>
  );
};

export default Banner;
