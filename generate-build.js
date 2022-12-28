const TASKS_TARGETS = "C:\\Program Files (x86)\\GeneXus\\GeneXus17Trial\\Genexus.Tasks.targets";
const SERVER_TARGETS = "C:\\Program Files (x86)\\GeneXus\\GeneXus17Trial\\Genexus.Server.Tasks.targets";

module.exports = {
  targetNames: {
    ExportCommit: "ExportCommit",
    ImportCommit: "ImportCommit",
    CreateKnowledgeBase: "CreateKnowledgeBase",
    ExportCommit: "ExportCommit",
  },
  generate(kbPath, target = this.targetNames.ExportCommit, body) {
    return `<Project DefaultTargets="TestGenexus" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
        <Import Project="${TASKS_TARGETS}" />
        <Import Project="${SERVER_TARGETS}" />

        <Target Name="${target}">
            <OpenKnowledgeBase Directory="${kbPath}" />
            ${body}
        </Target>
    </Project>`;
  },
};
