import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default ({ env }) => ({
  map: false,
  from: undefined,
  plugins: [
    {
      postcssPlugin: 'grouped',
      Once(root, { result }) {
        return postcss([
          postcssImport({ root: 'src/style' }),
          postcssMixins,
        ]).process(root, result.opts);
      },
    },
    tailwindcssNesting,
    tailwindcss,
    autoprefixer,
    env === 'production' ? cssnano : false,
  ],
});
