import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext.js";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { styled } from "@mui/system";
import CoinInfo from "../components/CoinInfo.js";
import { LinearProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../components/Banner/Carousel.js";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const StyleContainer = styled("div")(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const StyleSidebar = styled("div")(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));

  const StyleHeading = styled("Typography")({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  });

  const StyleDescription = styled("Typography")({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  });

  const MarketData = styled("div")(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      dalignItems: "start",
    },
  }));

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <StyleContainer>
      <StyleSidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBotton: 20 }}
        />
        <StyleHeading variant="h3">{coin?.name}</StyleHeading>
        <StyleDescription variant="subtitle1">
          {coin?.description.en.split(". ")[0]}.
        </StyleDescription>
        <MarketData>
          <span style={{ display: "flex" }}>
            <StyleHeading variant="h5">Rank: </StyleHeading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <StyleHeading variant="h5">Current Price: </StyleHeading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <StyleHeading variant="h5">Market Cap: </StyleHeading>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </MarketData>
      </StyleSidebar>
      <CoinInfo coin={coin} />
    </StyleContainer>
  );
};

export default CoinPage;
