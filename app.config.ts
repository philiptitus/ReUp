import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 * 
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    plugins: [
      ...existingPlugins,
      require("./plugins/withSplashScreen").withSplashScreen,
    ],
    extra: {
      ...config.extra,
      // eas: {
      //   projectId: "0c421310-1efd-41e5-a34e-72d51cc94994"
      // }
      "eas": {
        "projectId": "2c03c96f-8e99-47d9-a649-7fa3397d7fd4"
      }
    }
  }
}
