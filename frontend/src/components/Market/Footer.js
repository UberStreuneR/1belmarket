import React from "react";
import { Container, Grid, Typography, Link, GlobalStyles } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: [{ title: "Team", link: "/team", id: 0 }],
  },
  {
    title: "Resources",
    description: [
      {
        title: "GitHub",
        link: "https://github.com/UberStreuneR/1belmarket/",
        id: 0,
        router: false,
      },
    ],
  },
  {
    title: "Legal",
    description: [{ title: "Privacy policy", link: "/privacy-policy", id: 0 }],
  },
];

function Footer(props) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          mt: 4,
          py: [3, 4],
        }}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item.id}>
                    {item.router ? (
                      <RouterLink
                        style={{
                          textDecoration: "none",
                          underline: "none",
                          color: "black",
                          fontSize: "18px",
                        }}
                        to={item.link}>
                        {item.title}
                      </RouterLink>
                    ) : (
                      <Link
                        href={item.link}
                        sx={{
                          textDecoration: "none",
                          underline: "none",
                          color: "black",
                          fontSize: "18px",
                        }}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </React.Fragment>
  );
}

export default Footer;
