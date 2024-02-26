const path = require("path")

const shimModuleRegexs = {
    //ignore to build(include) in web
    'web': [
        /**
         * Unable to resolve "react-native-web/dist/exports/PermissionsAndroid" from "src\screens\AndroidPermissionScreen.tsx"
         */
        /^react-native-web\/.*Android$/,
    ]
}

function shouldResolve(moduleName, platform) {
    return shimModuleRegexs[platform]?.some((regx) => {
        return regx.test(moduleName)
    })
}

const shimModuleResolver = (context, moduleName, platform) => {
    if (shouldResolve(moduleName, platform)) {
        console.log("Ignore ", moduleName, platform)
        return {
            filePath: path.resolve(__dirname + "/shim-module.js"),
            type: "sourceFile"
        }
    }
    return context.resolveRequest(context, moduleName, platform)
}

module.exports = {
    resolver: {
        resolveRequest: shimModuleResolver,
    }
}