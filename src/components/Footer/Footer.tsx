import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "next/link";
import { Context } from "../../context";

const Footer: FC<any> = ({}) => {
  const { state, dispatch } = useContext(Context);

  console.log(state, "state");

  useEffect(() => {
    fetch("/api/category", {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        dispatch({
          type: "FETCH_CATEGORIES",
          payload: data.data,
        });
      })
    );
  }, []);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#42414c",
        marginTop: "25px",
        padding: "0 0 25px 0",
      }}
    >
      <Container>
        <Grid container pt={5} color={"#fff"}>
          <Grid
            item
            lg={2}
            xs={12}
            sx={{
              display: { xs: "flex" },
              alignItems: { xs: "center" },
              flexDirection: { xs: "column" },
              marginBottom: { xs: "10px" },
            }}
          >
            <Typography component={"h2"} fontWeight={"bold"} fontSize={25}>
              Get Truck
            </Typography>
            <Typography>Halimun Stree 25</Typography>
            <Typography>Jakartam Indonesia</Typography>
            <Typography>12850</Typography>
            <Typography mt={3}>www.gettruck.com</Typography>
          </Grid>
          <Grid item lg={2} xs={4} sx={{ textAlign: { xs: "center" } }}>
            <Typography component={"h3"} fontSize={17}>
              Sitemap
            </Typography>
            <Link href="/" prefetch={false}>
              <Typography sx={{ cursor: "pointer" }}>Home</Typography>
            </Link>
            <Link href="/create-advertising" prefetch={false}>
              <Typography sx={{ cursor: "pointer" }}>
                Sell My Truck/Trailer
              </Typography>
            </Link>
            <Link href="/privacy-policy" prefetch={false}>
              <Typography sx={{ cursor: "pointer" }}>Privacy Policy</Typography>
            </Link>
          </Grid>
          <Grid item lg={2} xs={4} sx={{ textAlign: { xs: "center" } }}>
            <Typography component={"h3"} fontSize={17}>
              Categories
            </Typography>

            {state.categories?.length
              ? state.categories?.map((cat: any) => {
                  return <Typography>{cat.name}</Typography>;
                })
              : null}
          </Grid>
          <Grid item lg={2} xs={4} sx={{ textAlign: { xs: "center" } }}></Grid>
          <Grid
            item
            lg={4}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            gap="10px"
            xs={12}
            sx={{
              justifyContent: { xs: "center" },
            }}
          >
            <Box
              color={"#464545"}
              display="flex"
              style={{ cursor: "pointer", gap: 10, width: 150, height: 40 }}
            >
              <Image src="/logo.png" width={300} height={50} />
            </Box>
            <Typography component={"h3"}>
              Copyright &copy; 2020 getTruck
            </Typography>
            <Typography component={"h3"}>
              Company J.T All rights reserved.
            </Typography>
            <Grid display={"flex"} gap="10px" sx={{ cursor: "pointer" }}>
              <FacebookIcon />
              <GoogleIcon />
              <TwitterIcon />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
export default Footer;
