interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    tooltipTextColor: string[];
    fillColor: (string | number)[][];
  };
}

export const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    tooltipTextColor: ["#9BAECA", "#1B2559"],
    fillColor: [
      [0, "#73A8F8"],
      [1, "#73A8F800"],
    ],
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    tooltipTextColor: ["#9BAECA", "#fff"],
    fillColor: [
      [0, "#73A8F8"],
      [1, "#73A8F800"],
    ],
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    tooltipTextColor: ["#a7a7a7", "#1B2559"],
    fillColor: [
      [0, "#66E2AD"],
      [1, "#fff"],
    ],
  },
  "dark-green": {
    tooltipBackgroundColor: "#151515",
    tooltipTextColor: ["#a7a7a7", "#fff"],
    fillColor: [
      [0, "rgba(122, 229, 181, 1)"],
      [1, "rgba(122, 229, 181, 0.01)"],
    ],
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    tooltipTextColor: ["#a7a7a7", "#1B2559"],
    fillColor: [
      [0, "#ff8a1dc7"],
      [1, "#fff"],
    ],
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151515",
    tooltipTextColor: ["#a7a7a7", "#fff"],
    fillColor: [
      [0, "rgba(229, 179, 122, 1)"],
      [1, "rgba(255, 138, 29, 0.01)"],
    ],
  },
};
