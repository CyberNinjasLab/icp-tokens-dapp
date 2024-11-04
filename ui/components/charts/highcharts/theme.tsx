import handlesIcon from "../../../assets/svg/handles-chart-navigation.svg";
import handlesIconDark from "../../../assets/svg/handles-chart-navigation-dark.svg";

interface GradientColorStopObject {
  0: number;
  1: string;
}

interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    gridLineColor: string;
    tooltipTextColor: string[];
    titleColor: string;
    barColor: string;
    barBorderColor: string;
    iconNavigatorButtons: string[];
    fillColor: GradientColorStopObject[];
    lineColor: GradientColorStopObject[];
    crosshairs: string;
    borderColor: string;
    hoverBarColor: string;
    maskFillColor: string;
    bgSelector: {
      linearGradient: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
      };
      stops: (string | number)[][];
    };
  };
}

export const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    gridLineColor: "#e9edf7",
    tooltipTextColor: ["#9BAECA", "#1B2559"],
    titleColor: "#1B2559",
    barColor: "#73a8f8",
    barBorderColor: "white",
    crosshairs: "#73A8F8",
    borderColor: "#e9edf7",
    iconNavigatorButtons: [`url(${handlesIcon})`, `url(${handlesIcon})`],
    fillColor: [
      { 0: 0, 1: "rgba(58, 87, 232, 0.35)" },
      { 0: 1, 1: "rgba(115, 168, 248,0)" },
    ],
    lineColor: [
      { 0: 0, 1: "#73A8F8" },
      { 0: 1, 1: "rgba(58, 87, 232, 0.80)" },
    ],
    hoverBarColor: "rgb(115, 168, 248, 0.7)",
    maskFillColor: "rgba(115, 168, 248, 0.2)",
    bgSelector: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    gridLineColor: "rgba(254, 254, 254, 0.05)",
    tooltipTextColor: ["#9BAECA", "#fff"],
    titleColor: "#9baeca",
    barColor: "#73a8f8",
    barBorderColor: "#151429",
    crosshairs: "#73A8F8",
    borderColor: "rgba(254, 254, 254, 0.05)",
    iconNavigatorButtons: [`url(${handlesIconDark})`, `url(${handlesIconDark})`],
    fillColor: [
      { 0: 0, 1: "rgba(58, 87, 232, 0.35)" },
      { 0: 1, 1: "rgba(115, 168, 248,0)" },
    ],
    lineColor: [
      { 0: 0, 1: "#73A8F8" },
      { 0: 1, 1: "rgba(58, 87, 232, 0.80)" },
    ],
    hoverBarColor: "rgb(115, 168, 248, 0.9)",
    maskFillColor: "rgba(115, 168, 248, 0.2)",
    bgSelector: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    gridLineColor: "#e9edf7",
    tooltipTextColor: ["#a7a7a7", "#1B2559"],
    titleColor: "#a7a7a7",
    barColor: "#00bc84",
    barBorderColor: "white",
    crosshairs: "#7AE5B5",
    borderColor: "#e9edf7",
    iconNavigatorButtons: [`url(${handlesIcon})`, `url(${handlesIcon})`],
    fillColor: [
      { 0: 0, 1: "#66E2AD" },
      { 0: 1, 1: "#fff" },
    ],
    lineColor: [
      { 0: 0, 1: "#7AE5B5" },
      { 0: 1, 1: "#7AE5B5" },
    ],
    hoverBarColor: "#73f89f90",
    maskFillColor: "rgba(0, 188, 132, 0.2)",
    bgSelector: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
  },
  "dark-green": {
    tooltipBackgroundColor: "#151515",
    gridLineColor: "rgba(254, 254, 254, 0.05)",
    tooltipTextColor: ["#a7a7a7", "#fff"],
    titleColor: "#a7a7a7",
    barColor: "#00bc84",
    barBorderColor: "#151515",
    crosshairs: "#7AE5B5",
    borderColor: "rgba(254, 254, 254, 0.05)",
    iconNavigatorButtons: [`url(${handlesIconDark})`, `url(${handlesIconDark})`],
    fillColor: [
      { 0: 0, 1: "rgba(122, 229, 181, 0.3)" },
      { 0: 1, 1: "rgba(122, 229, 181, 0.01)" },
    ],
    lineColor: [
      { 0: 0, 1: "#7AE5B5" },
      { 0: 1, 1: "#7AE5B5" },
    ],
    hoverBarColor: "rgba(115, 248, 159, 0.9)",
    maskFillColor: "rgba(0, 188, 132, 0.2)",
    bgSelector: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    gridLineColor: "#e9edf7",
    titleColor: "#a7a7a7",
    tooltipTextColor: ["#a7a7a7", "#1B2559"],
    barColor: "#fd7913",
    barBorderColor: "white",
    crosshairs: "#ffac60",
    borderColor: "#e9edf7",
    iconNavigatorButtons: [`url(${handlesIcon})`, `url(${handlesIcon})`],
    fillColor: [
      { 0: 0, 1: "rgba(255, 137, 29, 0.2)" },
      { 0: 1, 1: "rgba(255, 137, 29, 0)" },
    ],
    lineColor: [
      { 0: 0, 1: "#ff891d" },
      { 0: 1, 1: "#ffac60" },
    ],
    hoverBarColor: "rgba(253, 121, 19, 0.8)",
    maskFillColor: "rgba(253, 121, 19, 0.2)",
    bgSelector: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151515",
    gridLineColor: "rgba(254, 254, 254, 0.05)",
    tooltipTextColor: ["#a7a7a7", "#fff"],
    titleColor: "#a7a7a7",
    barColor: "#fd7913",
    barBorderColor: "#151515",
    crosshairs: "#ffac60",
    borderColor: "rgba(254, 254, 254, 0.05)",
    iconNavigatorButtons: [`url(${handlesIconDark})`, `url(${handlesIconDark})`],
    fillColor: [
      { 0: 0, 1: "rgba(255, 137, 29, 0.2)" },
      { 0: 1, 1: "rgba(255, 137, 29, 0)" },
    ],
    lineColor: [
      { 0: 0, 1: "#ff891d" },
      { 0: 1, 1: "#ffac60" },
    ],
    bgSelector: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
    hoverBarColor: "rgba(253, 121, 19, 0.9)",
    maskFillColor: "rgba(253, 121, 19, 0.2)",
  },
};
