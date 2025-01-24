module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      // 'module:metro-react-native-babel-preset'
    ],
    plugins: [
      '@babel/plugin-transform-react-jsx',        // JSX 코드 변환
      '@babel/plugin-transform-arrow-functions', // 화살표 함수 변환
      '@babel/plugin-transform-async-to-generator' // async/await를 generator로 변환
    ]
  };
};
