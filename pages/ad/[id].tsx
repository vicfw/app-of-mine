import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { FC } from "react";
import Layout from "../../src/components/Layout/Layout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import AdComponent from "../../src/components/Ad/Ad.components";
import { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
import Ad from "../../models/Ad";
import { AdsType } from "../../types/ad";
import dbConnect from "../../src/utils/dbConnect";

interface SingleAdPropsTypes {
  ad: AdsType;
}

const SingleAd: FC<SingleAdPropsTypes> = ({ ad }) => {
  return (
    <Layout>
      <Container sx={{ marginTop: "20px" }}>
        {/* breadcrumb */}
        <Paper
          sx={{
            backgroundColor: "#efefef",
            padding: "20px 40px",
            borderRadius: "10px",
            boxShadow: "2px 5px 5px #b3b3b3 ",
          }}
        >
          <Box display={"flex"} alignContent="center">
            <HomeIcon />
            <Box
              display={"flex"}
              alignContent="center"
              ml={1}
              sx={{ marginTop: "2px" }}
            >
              <Typography
                component={"span"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                Home
              </Typography>
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ marginTop: "4px", fontSize: "15px" }}
              />
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                {ad.title}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Grid container mt={1} spacing={2}>
          <Grid item lg={8} xs={12}>
            <Paper
              sx={{
                backgroundColor: "#efefef",
                padding: "20px 40px",
                borderRadius: "10px",
                boxShadow: "2px 5px 5px #b3b3b3 ",
              }}
            >
              <Box>
                <Image
                  src={"/term-bg-1-666de2d941529c25aa511dc18d727160.jpg"}
                  width={200}
                  height={150}
                  layout="responsive"
                />
              </Box>
              <Typography mt={1} fontSize="1.4rem" component={"h2"}>
                {ad.title}
              </Typography>
              <Divider sx={{ marginTop: "10px" }} />
              <Typography component={"p"}>{ad.description}</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Paper
              sx={{
                backgroundColor: "#efefef",
                padding: "20px 40px",
                borderRadius: "10px",
                boxShadow: "2px 5px 5px #b3b3b3 ",
              }}
            >
              <Box display={"flex"} justifyContent="center">
                <Image
                  src={"/term-bg-1-666de2d941529c25aa511dc18d727160.jpg"}
                  width={200}
                  height={200}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection="column"
                gap="10px"
                justifyContent="center"
                mt={1}
              >
                <Button sx={{ color: "#fff" }} variant="contained">
                  {ad.phone}
                </Button>
                <Button variant="outlined">site.user@gamil.com</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Paper
          sx={{
            backgroundColor: "#efefef",
            padding: "20px 40px",
            borderRadius: "10px",
            boxShadow: "2px 5px 5px #b3b3b3 ",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <AdComponent
                bgColor="#fff"
                description="desc"
                id="s"
                image="/ss"
                number="3333"
                title="hello"
              />
            </Grid>

            <Grid item lg={4}>
              <AdComponent
                bgColor="#fff"
                description="desc"
                id="s"
                image="/ss"
                number="3333"
                title="hello"
              />
            </Grid>
            <Grid item lg={4}>
              <AdComponent
                bgColor="#fff"
                description="desc"
                id="s"
                image="/ss"
                number="3333"
                title="hello"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};
export default SingleAd;

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params);

  try {
    if (!context.params?.id) {
      throw new Error("Bad Request");
    }

    await dbConnect();
    const ad = await Ad.findById(context.params.id);

    console.log(ad, "ad");

    return {
      props: { ad: JSON.parse(JSON.stringify(ad)) },
    };
  } catch (e) {
    console.log(e);

    return { props: {} };
  }
};
