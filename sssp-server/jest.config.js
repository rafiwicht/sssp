module.exports = {
    testEnvironment: 'node',
    setupFiles: [
        "<rootDir>/.jest/setEnvVars.js"
    ],
    //roots: [
    //    "<rootDir>/src"
    //],
    testMatch: [
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}