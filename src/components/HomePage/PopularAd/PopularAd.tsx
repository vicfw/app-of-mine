import { Container, Grid, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Colors } from "../../../utils/colors";
import Ad from "../../Ad/Ad.components";

const PopularAd: FC<any> = ({}) => {
  const [popularAds, setPopularAds] = useState<
    | {
        image: string[];
        title: string;
        description: string;
        id: string;
        phone: string;
      }[]
    | []
  >([]);

  useEffect(() => {
    fetch("/api/ad/popular", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((result) => {
        if (result.success) {
          const mappedData = result.data.map((dt: any) => {
            return {
              id: dt._id,
              image: dt.images,
              description: dt.description,
              title: dt.title,
              phone: dt.phone,
            };
          });

          setPopularAds(mappedData);
        }
      })
    );
  }, []);

  return (
    <Container sx={{ padding: { lg: "20px 0", xs: "20px 11px" } }}>
      <Paper
        sx={{
          backgroundColor: "#eff0f1",
          padding: { lg: "25px", xs: "10px" },
          boxShadow: "1px 1px 3px rgba(0,0,0,17%)",
        }}
      >
        <Grid container spacing={2}>
          {popularAds.map((item) => {
            return (
              <Grid item lg={3} xs={12}>
                <Ad
                  image={item.image[0]}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  isPop={true}
                  number={item.phone}
                  key={item.id}
                  bgColor="#fff"
                />
              </Grid>
            );
          })}

          <Grid
            item
            lg={3}
            xs={12}
            textAlign="center"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              component={"h2"}
              sx={{
                backgroundColor: Colors.primary.main,
                color: "#04e940",
                textAlign: "center",
                maxWidth: "70px",
                padding: "5px",
                borderRadius: "8px",
                fontWeight: "bolder",
                fontSize: "30px",
              }}
            >
              POP
            </Typography>
            <Typography
              component={"p"}
              sx={{ color: "#000", fontWeight: "bold" }}
              py={5}
            >
              Most Popular Cars in Canada
            </Typography>
            <Typography
              component={"span"}
              sx={{ color: Colors.grey.dark, fontSize: "17px" }}
            >
              You can see the most popular cars for sale and purchase in Canada
              on our site
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default PopularAd;
