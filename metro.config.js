/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("cjs");

module.exports = config;
