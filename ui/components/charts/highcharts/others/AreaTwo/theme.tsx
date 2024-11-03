interface themes {
  [key: string]: {
    tooltipBackgroundColor: string;
    titleColor: string;
    rangeSelectorButtons: string;
    lineColor: (string | number)[][];
    fillColor: (string | number)[][];
  };
}

export const themeChart: themes = {
  "light-blue": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#1B2559",
    rangeSelectorButtons: "#f8fafd",
    lineColor: [
      [0, "#73A8F8"],
      [1, "rgba(58, 87, 232, 0.80)"],
    ],
    fillColor: [
      [0, "rgba(58, 87, 232, 0.35)"],
      [1, "rgba(115, 168, 248,0)"],
    ],
  },
  "dark-blue": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#FEFEFE",
    rangeSelectorButtons: "#0d0d1f",
    lineColor: [
      [0, "#73A8F8"],
      [1, "rgba(58, 87, 232, 0.80)"],
    ],
    fillColor: [
      [0, "rgba(58, 87, 232, 0.35)"],
      [1, "rgba(115, 168, 248,0)"],
    ],
  },
  "light-green": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#1B2559",
    rangeSelectorButtons: "#f8fafd",
    lineColor: [
      [0, "#0F7D54"],
      [1, "#7AE5B5"],
    ],
    fillColor: [
      [0, "#66E2AD"],
      [1, "#fff"],
    ],
  },
  "dark-green": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#FEFEFE",
    rangeSelectorButtons: "#0d0d1f",
    lineColor: [
      [0, "#0F7D54"],
      [1, "#7AE5B5"],
    ],
    fillColor: [
      [0, "#66E2AD"],
      [1, "#fff"],
    ],
  },
  "light-orange": {
    tooltipBackgroundColor: "#fff",
    titleColor: "#1B2559",
    rangeSelectorButtons: "#f8fafd",
    lineColor: [
      [0, "#0F7D54"],
      [1, "#7AE5B5"],
    ],
    fillColor: [
      [0, "#66E2AD"],
      [1, "#fff"],
    ],
  },
  "dark-orange": {
    tooltipBackgroundColor: "#151429",
    titleColor: "#FEFEFE",
    rangeSelectorButtons: "#0d0d1f",
    lineColor: [
      [0, "#0F7D54"],
      [1, "#7AE5B5"],
    ],
    fillColor: [
      [0, "#66E2AD"],
      [1, "#fff"],
    ],
  },
};
