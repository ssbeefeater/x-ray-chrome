module.exports = {
    testPathIgnorePatterns: ["testFolder", "coverage", "<rootDir>/build/", "<rootDir>/config/"],
    coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/config/", "<rootDir>/__tests__/",
     "<rootDir>/build/lib/test-utils", "<rootDir>/build/lib/constants"],
     "testURL":"http://localhost",
    "moduleFileExtensions": [
        "ts",
        "js",
        "json",
    ],
    "transform": {
        "\\.(ts)$": "ts-jest"
    },
    "testRegex": "/__tests__/.*\\.test.(ts|js)$",
};