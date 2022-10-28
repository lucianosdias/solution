const importTypes = {
  AllObjects: "AllObjects",
  DifferentObject: "DifferentObject",
  NewerObjects: "NewerObjects",
};

const languageTranslations = {
  Update: "Update",
  Keep: "Keep",
  ReplaceAll: "ReplaceAll",
};

const tableIndexesBehaviors = {
  // completely overwrites user defined Indexes with the provided values.
  Overwrite: "Overwrite",
  // merges existing Indexes with the provided values.
  IncrementalIntegration: "IncrementalIntegration",
  // Only import the system defined Indexes with the provided values.
  ImportDefaultContent: "ImportDefaultContent",
  // completely overwrites both user and system defined Indexes with the provided values.
  OverwriteEvenDefaultContent: "OverwriteEvenDefaultContent",
};

module.exports = {
  /**
   * https://wiki.genexus.com/commwiki/servlet/wiki?35599,Import+MSBuild+Task
   */
  importCommitXml(
    fileName,
    // updateFilePath,
    {
      importType = importTypes.AllObjects,
      languageTranslation = languageTranslations.Keep,
      importKbInformation = true,
      tableIndexesBehavior = tableIndexesBehaviors.IncrementalIntegration,
    } = {}
  ) {
    // AutomaticBackup="$(AutomaticBackup)"
    // ImportType="$(ImportType)"
    // RedefineExternalPrograms="$(RedefineExternalPrograms)"
    // IncludeItems="$(IncludeItems)"
    // ExcludeItems="$(ExcludeItems)"
    // PreviewMode="$(PreviewMode)"
    // UpdateFile="${updateFilePath}"

    const xml = `<Import File="${fileName}" 
        ImportType="${importType}"
        LanguageTranslations="${languageTranslation}" 
        ImportKBInformation="${importKbInformation}" 
        TableIndexesImportBehavior="${tableIndexesBehavior}">
            <Output TaskParameter="ImportedItems" ItemName="ImportedItem" />
    </Import>`;

    return xml.trim();
  },
};
