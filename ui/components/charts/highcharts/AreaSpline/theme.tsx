import handlesIcon from "../../../../assets/svg/handles-chart-navigation.svg";
import handlesIconDark from "../../../../assets/svg/handles-chart-navigation-dark.svg";

interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    gridLineColor: string;
    titleColor: string;
    barColor: string;
    barBorderColor: string;
    iconNavigatorButtons: string[];
    fillColor: (string | number)[][];
    lineColor: (string | number)[][];
    hoverBarColor: string;
    maskFillColor: string;
  };
}

export const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    gridLineColor: "#e9edf7",
    titleColor: "#1B2559",
    barColor: "#73a8f8",
    barBorderColor: "white",
    iconNavigatorButtons: [`url(${handlesIcon})`, `url(${handlesIcon})`],
    fillColor: [
      [0, "rgba(58, 87, 232, 0.35)"],
      [1, "rgba(115, 168, 248,0)"],
    ],
    lineColor: [
      [0, "#73A8F8"],
      [1, "rgba(58, 87, 232, 0.80)"],
    ],
    hoverBarColor: "rgb(115, 168, 248, 0.7)",
    maskFillColor: "rgba(115, 168, 248, 0.2)",
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    gridLineColor: "rgba(254, 254, 254, 0.05)",
    titleColor: "#9baeca",
    barColor: "#73a8f8",
    barBorderColor: "#151429",
    iconNavigatorButtons: [`url(${handlesIconDark})`, `url(${handlesIconDark})`],
    fillColor: [
      [0, "rgba(58, 87, 232, 0.35)"],
      [1, "rgba(115, 168, 248,0)"],
    ],
    lineColor: [
      [0, "#73A8F8"],
      [1, "rgba(58, 87, 232, 0.80)"],
    ],
    hoverBarColor: "rgb(115, 168, 248, 0.9)",
    maskFillColor: "rgba(115, 168, 248, 0.2)",
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    gridLineColor: "#e9edf7",
    titleColor: "#a7a7a7",
    barColor: "#00bc84",
    barBorderColor: "white",
    iconNavigatorButtons: [`url(${handlesIcon})`, `url(${handlesIcon})`],
    fillColor: [
      [0, "#66E2AD"],
      [1, "#fff"],
    ],
    lineColor: [
      [0, "#7AE5B5"],
      [1, "#7AE5B5"],
    ],
    hoverBarColor: "#73f89f90",
    maskFillColor: "rgba(0, 188, 132, 0.2)",
  },
  "dark-green": {
    tooltipBackgroundColor: "#151515",
    gridLineColor: "rgba(254, 254, 254, 0.05)",
    titleColor: "#a7a7a7",
    barColor: "#00bc84",
    barBorderColor: "#151515",
    iconNavigatorButtons: [`url(${handlesIconDark})`, `url(${handlesIconDark})`],
    fillColor: [
      [0, "rgba(122, 229, 181, 0.3)"],
      [1, "rgba(122, 229, 181, 0.01)"],
    ],
    lineColor: [
      [0, "#7AE5B5"],
      [1, "#7AE5B5"],
    ],
    hoverBarColor: "rgba(115, 248, 159, 0.9)",
    maskFillColor: "rgba(0, 188, 132, 0.2)",
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    gridLineColor: "#e9edf7",
    titleColor: "#a7a7a7",
    barColor: "#fd7913",
    barBorderColor: "white",
    iconNavigatorButtons: [`url(${handlesIcon})`, `url(${handlesIcon})`],
    fillColor: [
      [0, "rgb(255, 137, 29, 0.2)"],
      [1, "rgb(255, 137, 29, 0)"],
    ],
    lineColor: [
      [0, "#ff891d"],
      [1, "#ffac60"],
    ],
    hoverBarColor: "rgb(253, 121, 19, 0.8)",
    maskFillColor: "rgba(253, 121, 19, 0.2)",
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151515",
    gridLineColor: "rgba(254, 254, 254, 0.05)",
    titleColor: "#a7a7a7",
    barColor: "#fd7913",
    barBorderColor: "#151515",
    iconNavigatorButtons: [`url(${handlesIconDark})`, `url(${handlesIconDark})`],
    fillColor: [
      [0, "rgb(255, 137, 29, 0.2)"],
      [1, "rgb(255, 137, 29, 0)"],
    ],
    lineColor: [
      [0, "#ff891d"],
      [1, "#ffac60"],
    ],
    hoverBarColor: "rgb(253, 121, 19, 0.9)",
    maskFillColor: "rgba(253, 121, 19, 0.2)",
  },
};
