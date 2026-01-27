import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default ({ env }) => ({
  map: false,
  from: undefined,
  plugins: [
    autoprefixer,
    env === 'production' ? cssnano : false,
  ],
});
