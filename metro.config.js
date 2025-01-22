const { getDefaultConfig } = require('expo/metro-config');

// 기본 Metro Bundler 구성 가져오기
const config = getDefaultConfig(__dirname);

// .bin 확장자 추가
config.resolver.assetExts.push('bin');

// Watchman 비활성화
// config.resolver.useWatchman = false;

module.exports = config;
