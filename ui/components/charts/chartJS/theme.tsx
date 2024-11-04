interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    titleColor: string;
    borderColor: string;
    gridLineColor: string[];
    tooltipTextColor: string[];
    backgroundAreaGradient: string[];
    fillColor: string[];
  };
}

export const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#9baeca",
    tooltipTextColor: ["#9BAECA", "#1B2559"],
    borderColor: "#e9edf7",
    gridLineColor: ["#fff", "#E9EDF7"],
    backgroundAreaGradient: ["rgba(115, 168, 248, 0.3)", "rgb(255, 255, 255)"],
    fillColor: ["rgba(115, 168, 248)", "rgba(58, 87, 232)"],
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#9baeca",
    tooltipTextColor: ["#9BAECA", "#fff"],
    borderColor: "rgba(254, 254, 254, 0.05)",
    gridLineColor: ["#151429", "#0F0F0F"],
    backgroundAreaGradient: ["rgb(115, 168, 248, 0.3)", "#0E0E1F"],
    fillColor: ["rgba(115, 168, 248)", "rgba(58, 87, 232)"],
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#a7a7a7",
    tooltipTextColor: ["#a7a7a7", "#1B2559"],
    borderColor: "#e9edf7",
    gridLineColor: ["#fff", "#E9EDF7"],
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(122, 229, 181)", "rgb(15, 125, 84)"],
  },
  "dark-green": {
    tooltipBackgroundColor: "#151515",
    titleColor: "#a7a7a7",
    tooltipTextColor: ["#a7a7a7", "#fff"],
    borderColor: "rgba(254, 254, 254, 0.05)",
    gridLineColor: ["#0F0F0F", "#0F0F0F"],
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(122, 229, 181)", "rgb(15, 125, 84)"],
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#a7a7a7",
    tooltipTextColor: ["#a7a7a7", "#1B2559"],
    borderColor: "#e9edf7",
    gridLineColor: ["#fff", "#E9EDF7"],
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(255, 137, 29)", "rgb(255, 137, 29)"],
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151515",
    titleColor: "#a7a7a7",
    tooltipTextColor: ["#a7a7a7", "#fff"],
    borderColor: "rgba(254, 254, 254, 0.05)",
    gridLineColor: ["#0F0F0F", "#0F0F0F"],
    backgroundAreaGradient: ["#66E2AD", "#FFFFFF"],
    fillColor: ["rgb(255, 137, 29)", "rgb(255, 137, 29)"],
  },
};
