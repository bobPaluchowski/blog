const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  basePath:isProd ? '/my_blog' : '',
  assetPrefix: isProd ? '/my_blog' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
