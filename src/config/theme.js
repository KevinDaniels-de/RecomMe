const theme = {
    mediaQueries: {
        tablet: "@media (min-width: 768px)",
        desktop: "@media (min-width: 1280px)"
    },

    typography: {
        font: {
            text: "'Crimson Text'",
            headline: "'Montserrat'"
        }
    },

    colors: {
      purple: "#BC9CFF",
      lightPurple: "#95A2FB",
      grey: "#E9E9EC",
      green: "#6FCF97",
      darkGreen: "#256C43",
      darkShade: {
        100: "rgba(31, 32, 65, 100)",
        75: "rgba(31, 32, 65, 0.75)",
        50: "rgba(31, 32, 65, 0.50)",
        25: "rgba(31, 32, 65, 0.25)",
        10: "rgba(31, 32, 65, 0.10)",
        5: "rgba(31, 32, 65, 0.05)",
        2: "rgba(31, 32, 65, 0.02)"
      }
    },
    typography2: {
      fontFamily: "Quicksand",
      h1: {
        fontSize: "42px"
      },
      h2: {
          fontSize: "32px"
      },
  
      h3: {
          fontSize: "24px"
      },
  
      h4: {
          fontSize: "24px"
      }, 
  
      h6: {
        fontSize: "14px",
        fontWeight: "bold"
      },
  
      em: {
        fontSize: "11px",
      }
  
    }
  };
  
export default theme;  