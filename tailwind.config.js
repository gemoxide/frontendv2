module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#99E6FF",
                    secondary: "#00004D",
                    success: "#47AE30",
                    warning: "#FFBD0C",
                    error: "#FF5151",
                },
                dark: {
                    primary: "#99E6FF",
                    secondary: "#00004D",
                    success: "#47AE30",
                    warning: "#FFBD0C",
                    error: "#FF5151",
                },
            },
        ],
    },
    theme: {
        extend: {
            colors: {
                tertiary: "#F4F9FF",
                grey: "#E6E6E6",
                "grey-primary": "#F7F7FC",
                "grey-secondary": "#92929D",
                "grey-tertiary": "#9A9AB0",
                green: "#43DD81",
                kebab: "#9A9AB0",
            },
            screens: {
                lg: "1025px",
            },
            width: {
                'fill-available': '-webkit-fill-available'
            }
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
