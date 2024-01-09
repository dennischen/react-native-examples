const path = require("path")

const shimModuleRegexs = {
    'web': [/^react-native-web\/.*Android$/]
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