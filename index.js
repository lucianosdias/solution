const fs = require("fs/promises");
const argv = require("minimist")(process.argv.slice(2));
const { generate, targetNames } = require("./generate-build");
const { exportXml } = require("./export-commit");
const { importCommitXml } = require("./import-commit");

const actions = {
  export: "export",
  import: "import",
};

(async () => {
  const {
    t: ticket = "",
    o: baseKbPath = `C:\\Models\\TesteSoftDesign`,
    d: destKbPath = `C:\\Models\\TesteSoftDesign`,
    a: action = actions.export,
  } = argv;

  try {
    const xpzName = "export.xpz";
    switch (action) {
      case actions.export: {
        const filename = "export.build";
        const commitsFile = "./commit_small.xml";
        const exportCommitXml = await exportXml(xpzName, ticket, commitsFile);
        const xmlBuild = generate(baseKbPath, targetNames.ExportCommit, exportCommitXml);
        await fs.writeFile(`./${filename}`, xmlBuild);
        console.info(`Arquivo ${filename} gerado.`);
        break;
      }
      case actions.import:
        const filename = "import.build";
        const importXml = importCommitXml(xpzName);
        const xmlBuild = generate(destKbPath, targetNames.ImportCommit, importXml);
        await fs.writeFile(`./${filename}`, xmlBuild);
        console.info(`Arquivo ${filename} gerado.`);
        break;
    }
  } catch (error) {
    console.info(error.message);
  }
})();
