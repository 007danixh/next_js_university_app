module.exports = {
    // ...other Jest config options...
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // Add the 'tsconfig' key with the path to your test-specific tsconfig file:
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json', // Specify the path to your test tsconfig file
        },
    },
};
