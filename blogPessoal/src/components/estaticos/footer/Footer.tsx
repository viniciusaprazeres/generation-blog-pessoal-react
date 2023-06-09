import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import "./Footer.css";

function Footer() {

  var footerComponent;
  
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={12}>
          <Box className="box1">
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                className="textoFooter"
              >
                Siga-nos nas redes sociais{" "}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a
                href="https://www.facebook.com/generationbrasil"
                target="_blank"
              >
                <GitHubIcon className="redes" />
              </a>
              <a
                href="https://www.instagram.com/generationbrasil/"
                target="_blank"
              >
                <InstagramIcon className="redes" />
              </a>
              <a
                href="https://www.linkedin.com/school/generationbrasil/"
                target="_blank"
              >
                <LinkedInIcon className="redes" />
              </a>
            </Box>
          </Box>
          <Box className="box2">
            <Box paddingTop={1}>
              <Typography
                variant="subtitle2"
                align="center"
                gutterBottom
                className="textoFooter"
              >
                Feito por Vinicius Prazeres © 2023
              </Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://brasil.generation.org">
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="textoFooter"
                  align="center"
                >
                  brasil.generation.org
                </Typography>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
