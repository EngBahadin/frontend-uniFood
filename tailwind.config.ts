import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      "white": "#F4F4F4",
      "pure-white": "#FFFFFF",
      "black": "#2A2A2A",
      "pure-black": "#000000",
      "primary-lm": "#8E5C11",
      "success-lm": "#067F18",
      "error-lm": "#C92424",
      "warning-lm": "#DC9F04",
      "info-lm": "#2582EE",
      "primary-dm": "#F5A52E",
      "success-dm": "#30B043",
      "error-dm": "#FF2A2A",
      "warning-dm": "#FFBB0B",
      "info-dm": "#3D98FF",
      "red-bg": "#FDE1E1",

      "gray": {
        100: "#908F8F",
        75: "#ACABAB",
        50: "#C7C6C6",
        25: "#E3E3E3",
        15: "#EFEEEE",
      },
    },
    fontSize: {
      // sub-heading-1 with various font weights
      "sub-heading-1-regular": [
        "34px",
        { lineHeight: "42.5px", fontWeight: "400" },
      ],
      "sub-heading-1-medium": [
        "34px",
        { lineHeight: "42.5px", fontWeight: "500" },
      ],
      "sub-heading-1-semiBold": [
        "34px",
        { lineHeight: "42.5px", fontWeight: "600" },
      ],
      "sub-heading-1-bold": [
        "34px",
        { lineHeight: "42.5px", fontWeight: "700" },
      ],
      // sub-heading-2 with various font weights
      "sub-heading-2-regular": [
        "27px",
        { lineHeight: "37.8px", fontWeight: "400" },
      ],
      "sub-heading-2-medium": [
        "27px",
        { lineHeight: "37.8px", fontWeight: "500" },
      ],
      "sub-heading-2-semiBold": [
        "27px",
        { lineHeight: "37.8px", fontWeight: "600" },
      ],
      "sub-heading-2-bold": [
        "27px",
        { lineHeight: "37.8px", fontWeight: "700" },
      ],
      // body-1 with various font weights
      "body-1-regular": ["24px", { lineHeight: "33.6px", fontWeight: "400" }],
      "body-1-medium": ["24px", { lineHeight: "33.6px", fontWeight: "500" }],
      "body-1-semiBold": ["24px", { lineHeight: "33.6px", fontWeight: "600" }],
      "body-1-bold": ["24px", { lineHeight: "33.6px", fontWeight: "700" }],
      // body-2 with various font weights
      "body-2-regular": ["22px", { lineHeight: "30.8px", fontWeight: "400" }],
      "body-2-medium": ["22px", { lineHeight: "30.8px", fontWeight: "500" }],
      "body-2-semiBold": ["22px", { lineHeight: "30.8px", fontWeight: "600" }],
      "body-2-bold": ["22px", { lineHeight: "30.8px", fontWeight: "700" }],
      // body-3 with various font weights
      "body-3-regular": ["20px", { lineHeight: "30px", fontWeight: "400" }],
      "body-3-medium": ["20px", { lineHeight: "30px", fontWeight: "500" }],
      "body-3-semiBold": ["20px", { lineHeight: "30px", fontWeight: "600" }],
      "body-3-bold": ["20px", { lineHeight: "30px", fontWeight: "700" }],
      // body-4 with various font weights
      "body-4-regular": ["18px", { lineHeight: "27px", fontWeight: "400" }],
      "body-4-medium": ["18px", { lineHeight: "27px", fontWeight: "500" }],
      "body-4-semiBold": ["18px", { lineHeight: "27px", fontWeight: "600" }],
      "body-4-bold": ["18px", { lineHeight: "27px", fontWeight: "700" }],
      // text-1 with various font weights
      "text-1-regular": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "text-1-medium": ["16px", { lineHeight: "24px", fontWeight: "500" }],
      "text-1-semiBold": ["16px", { lineHeight: "24px", fontWeight: "600" }],
      "text-1-bold": ["16px", { lineHeight: "24px", fontWeight: "700" }],
      // text-2 with various font weights
      "text-2-regular": ["14px", { lineHeight: "21px", fontWeight: "400" }],
      "text-2-medium": ["14px", { lineHeight: "21px", fontWeight: "500" }],
      "text-2-semiBold": ["14px", { lineHeight: "21px", fontWeight: "600" }],
      "text-2-bold": ["14px", { lineHeight: "21px", fontWeight: "700" }],
      // text-3 with various font weights
      "text-3-regular": ["12px", { lineHeight: "18.6px", fontWeight: "400" }],
      "text-3-medium": ["12px", { lineHeight: "18.6px", fontWeight: "500" }],
      "text-3-semiBold": ["12px", { lineHeight: "18.6px", fontWeight: "600" }],
      "text-3-bold": ["12px", { lineHeight: "18.6px", fontWeight: "700" }],
      // caption-1 with various font weights
      "caption-1-regular": [
        "11px",
        { lineHeight: "17.05px", fontWeight: "400" },
      ],
      "caption-1-medium": [
        "11px",
        { lineHeight: "17.05px", fontWeight: "500" },
      ],
      "caption-1-semiBold": [
        "11px",
        { lineHeight: "17.05px", fontWeight: "600" },
      ],
      "caption-1-bold": ["11px", { lineHeight: "17.05px", fontWeight: "700" }],
      // caption-2 with various font weights
      "caption-2-regular": ["9px", { lineHeight: "14.4px", fontWeight: "400" }],
      "caption-2-medium": ["9px", { lineHeight: "14.4px", fontWeight: "500" }],
      "caption-2-semiBold": [
        "9px",
        { lineHeight: "14.4px", fontWeight: "600" },
      ],
      "caption-2-bold": ["9px", { lineHeight: "14.4px", fontWeight: "700" }],
    },

    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
       mini_mobile:"360px"
      },
      fontFamily: {
        Poppins: "Poppins",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
