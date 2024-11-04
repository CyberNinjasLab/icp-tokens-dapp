interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    tooltipTitleColor: string;
    titleColor: string;
    gridLineColor: string;
    fillColor: string[];
    lineColor: string[];
  };
}

export const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    tooltipTitleColor: "#1b2559",
    titleColor: "#9baeca",
    gridLineColor: "#e9edf7",
    fillColor: ["rgba(58, 87, 232, 0.00)", "rgba(115, 168, 248, 0.40)"],
    lineColor: ["#73A8F8", "#3A57E8"],
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    tooltipTitleColor: "#fefefe",
    titleColor: "#9baeca",
    gridLineColor: "#0D0D1F",
    fillColor: ["rgba(58, 87, 232, 0.00)", "rgba(115, 168, 248, 0.40)"],
    lineColor: ["#73A8F8", "#3A57E8"],
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    tooltipTitleColor: "#1b2559",
    titleColor: "#a7a7a7",
    gridLineColor: "#e9edf7",
    fillColor: ["#fff", "#66E2AD"],
    lineColor: ["#0F7D54", "#7AE5B5"],
  },
  "dark-green": {
    tooltipBackgroundColor: "#151429",
    tooltipTitleColor: "#fefefe",
    titleColor: "#a7a7a7",
    gridLineColor: "rgba(33, 32, 52, 0.5)",
    fillColor: ["rgba(122, 229, 181, 0.01)", "rgba(122, 229, 181, 0.4)"],
    lineColor: ["#0F7D54", "#7AE5B5"],
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    tooltipTitleColor: "#1b2559",
    titleColor: "#a7a7a7",
    gridLineColor: "#e9edf7",
    fillColor: ["#fff", "#ff8a1d6c"],
    lineColor: ["#ff891d", "#ffac60"],
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151429",
    tooltipTitleColor: "#fefefe",
    titleColor: "#a7a7a7",
    gridLineColor: "rgba(33, 32, 52, 0.5)",
    fillColor: ["rgba(255, 138, 29, 0.01)", "rgba(255, 138, 29, 0.45)"],
    lineColor: ["#ff891d", "#ffac60"],
  },
};
