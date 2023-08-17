import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList, tempCoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios
      .get(CoinList(currency))
      .catch((e) => JSON.parse(tempCoinList));
    console.log(coins);
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () => {
    if (!search) return coins;
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const navigate = useNavigate();

  const StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Cryptocurrency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <TableContainer>
              <Table style={{ width: "100%" }}>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          key={row.name}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#131111")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#16171a")
                          }
                          style={{
                            backgroundColor: "#16171a",
                            cursor: "pointer",
                            fontFamily: "Montserrat",
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: "150px" }}
                          >
                            <Box display="flex" alignItems="center">
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginLeft: "10px",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>
                            </Box>
                          </TableCell>
                          <TableCell align="right" style={{ width: "100px" }}>
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              width: "120px",
                              color: profit ? "rgb(14,203,129)" : "red",
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" style={{ width: "140px" }}>
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TableContainer>

        <StyledPagination
          count={Math.ceil(handleSearch().length / 10)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          page={page}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
