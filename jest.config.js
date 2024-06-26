module.exports = {
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "moduleDirectories": [
        "node_modules",
        __dirname
    ],
    "rootDir": "test",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
}