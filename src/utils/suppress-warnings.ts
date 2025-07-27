// Utility to suppress Ant Design React 19 compatibility warnings
export const suppressAntdReact19Warning = () => {
    if (typeof window !== 'undefined') {
        const originalConsoleWarn = console.warn;
        console.warn = (...args) => {
            // Suppress specific Ant Design React 19 compatibility warning
            if (
                args[0] &&
                typeof args[0] === 'string' &&
                args[0].includes('[antd: compatible]') &&
                args[0].includes('antd v5 support React is 16 ~ 18')
            ) {
                return; // Suppress this specific warning
            }
            // Allow all other warnings to pass through
            originalConsoleWarn.apply(console, args);
        };
    }
};

// Call this function early in your app initialization
export default suppressAntdReact19Warning;
