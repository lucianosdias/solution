module.exports = {
  targetNames: {
    ExportCommit: "ExportCommit",
    ImportCommit: "ImportCommit",
    CreateKnowledgeBase: "CreateKnowledgeBase",
    ExportCommit: "ExportCommit",
  },
  generate(kbPath, target = this.targetNames.ExportCommit, body) {
    return `<Project DefaultTargets="TestGenexus" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
        <Import Project="C:\\Program Files (x86)\\GeneXus\\GeneXus16\\Genexus.Tasks.targets" />
        <Import Project="C:\\Program Files (x86)\\GeneXus\\GeneXus16\\Genexus.Server.Tasks.targets" />

        <Target Name="${target}">
            <OpenKnowledgeBase Directory="${kbPath}" />
            ${body}
        </Target>
    </Project>`;
  },
};
