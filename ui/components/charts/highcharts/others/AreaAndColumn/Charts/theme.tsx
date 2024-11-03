interface color {
  linearGradient: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  stops: (string | number)[][];
}

export interface themeProps {
  fillColor: color;
  lineColor: color;
  hoverColor: color;
}

export interface themes {
  [key: string]: themeProps;
}

export const themeChart: themes = {
  "theme-default": {
    fillColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "rgba(255, 144, 63, 0.3)"],
        [1, "rgba(255, 144, 63, 0.3)"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "rgba(255, 144, 63)"],
        [1, "rgba(255, 144, 63)"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "rgb(255, 144, 63)"],
        [1, "rgb(255, 144, 63)"],
      ],
    },
  },
  "light-blue": {
    fillColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
  },
  "dark-blue": {
    fillColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, "#73A8F8"],
        [1, "#3a57e8"],
      ],
    },
  },
  "light-green": {
    fillColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
  },
  "dark-green": {
    fillColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#0F7D54"],
        [1, "#7AE5B5"],
      ],
    },
  },
  "light-orange": {
    fillColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
  },
  "dark-orange": {
    fillColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
    hoverColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
    lineColor: {
      linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
      stops: [
        [0, "#ff891d"],
        [1, "#ffac60"],
      ],
    },
  },
};
