module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Sử dụng babel-preset-expo thay cho expo-router/babel
    plugins: [
      "nativewind/babel", // Plugin cho NativeWind
    ],
  };
};
