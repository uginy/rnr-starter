module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
          // Enable import.meta transformation for web compatibility
          unstable_transformImportMeta: true,
        },
      ],
      'nativewind/babel',
    ],
  };
};
