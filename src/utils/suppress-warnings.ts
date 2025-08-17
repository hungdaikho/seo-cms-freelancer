// Utility to suppress Ant Design React 19 compatibility warnings
export const suppressAntdReact19Warning = () => {
  if (typeof window !== "undefined") {
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.warn = (...args) => {
      // Suppress specific Ant Design React 19 compatibility warning
      if (
        args[0] &&
        typeof args[0] === "string" &&
        ((args[0].includes("[antd: compatible]") &&
          args[0].includes("antd v5 support React is 16 ~ 18")) ||
          args[0].includes("antd v5 support React is 16 ~ 18") ||
          args[0].includes(
            "You are calling notice in render which will break in React 18 concurrent mode"
          ) ||
          args[0].includes("[antd: Tabs]") ||
          args[0].includes("TabPane") ||
          args[0].includes("is deprecated"))
      ) {
        return; // Suppress these specific warnings
      }
      // Allow all other warnings to pass through
      originalConsoleWarn.apply(console, args);
    };

    console.error = (...args) => {
      // Suppress specific Ant Design warnings that come through console.error
      if (
        args[0] &&
        typeof args[0] === "string" &&
        (args[0].includes("[antd: compatible]") ||
          args[0].includes("You are calling notice in render") ||
          args[0].includes("[antd: Tabs]") ||
          args[0].includes("TabPane") ||
          args[0].includes("is deprecated"))
      ) {
        return; // Suppress these specific errors
      }
      // Allow all other errors to pass through
      originalConsoleError.apply(console, args);
    };
  }
};

// Call this function early in your app initialization
export default suppressAntdReact19Warning;
