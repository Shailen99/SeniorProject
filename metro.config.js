// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure resolver object exists and initialize assetsExts if it doesn't
if (!config.resolver) {
  config.resolver = {};
}

if (!config.resolver.assetsExts) {
  config.resolver.assetsExts = [];
}

// Now you can safely push to assetsExts
config.resolver.assetsExts.push('cjs');

module.exports = config;
