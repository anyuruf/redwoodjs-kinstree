const { getPaths } = require('@redwoodjs/internal')

module.exports = {
  schema: getPaths().generated.schema,
  documents: './web/src/**/!(*.d).{ts,tsx,js,jsx}', // 👈 Tells VS Code plugin where to find fragments
}
