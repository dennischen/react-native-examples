module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            //for custom source
            [
                "module-resolver",
                {
                    alias: {
                        "@": "./src",
                        "@assets": "./assets",
                    },
                }
            ],
            //for reanimated
            "@babel/plugin-proposal-export-namespace-from",
            "react-native-reanimated/plugin",
        ],
    }
}
