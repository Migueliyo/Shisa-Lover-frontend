import { Box, styled } from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    display: "flex",
    flexFlow: "column wrap",
    fontSize: 14,
    fontWeight: 600,
    ".content-graph-about-icon": {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      paddingTop: 3,
      gap: 5,
      color: "#adadb8",
      position: "relative",
      transition: "color 0 ease",
    },
    ".content-graph-about-icon::after": {
      content: "'\u2197'",
      color: "#adadb8",
      opacity: 0,
      transition: "opacity 0 ease, right 0 ease",
    },
    ".content-graph-about-icon:hover": {
      cursor: "pointer",
      color: "#ff7400",
    },
    ".content-graph-about-icon:hover::after": {
      opacity: 1,
    },
  };
  return {
    ...commonStyles,
    //@media (max-width: 1200px)
    [theme.breakpoints.down("1200")]: {
      ...commonStyles,
    },
  };
});

function UserSocialMedia({ user }) {
  const socialMediaIcons = {
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    youtube: YouTubeIcon,
    reddit: RedditIcon,
  };

  return (
    <FormatedBox>
      {user.social_media
        .filter((media) => media.url) // Filtrar las redes sociales que tienen URL no nula
        .map((media) => {
          const IconComponent = socialMediaIcons[media.name];
          return (
            <Box
              key={media.name}
              className="content-graph-about-icon"
              component="a"
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {IconComponent && <IconComponent sx={{ marginRight: 1 }} />}
              {media.name.charAt(0).toUpperCase() + media.name.slice(1)}
            </Box>
          );
        })}
    </FormatedBox>
  );
}

export default UserSocialMedia;
