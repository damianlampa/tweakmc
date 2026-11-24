export default {
  '*.{js,jsx,cjs,mjs}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '!(*.js|*.jsx|*.cjs|*.mjs)': 'prettier --write --ignore-unknown',
};
