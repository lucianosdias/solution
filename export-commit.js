const fs = require("fs/promises");
const { XMLParser } = require("fast-xml-parser");

/*
 * https://wiki.genexus.com/commwiki/servlet/wiki?44328,How+to+specify+an+object+list+in+a+MSBuild+task
 */
const objectTypes = {
  Procedure: "Procedure",
  Transaction: "Transaction",
  "Web Panel": "WebPanel",
  "External Object": "ExternalObject",
  "Deployment Unit": "DeploymentUnit",
  "Data Provider": "DataProvider",
  API: "API",
  // confirmar com Vinicius
  "Work With Plus": "WorkWithPlus",
  Domain: "Domain",
  "Structured Data Type": "StructuredDataType",
  "Subtype Group": "SubTypeGroup",
  Attribute: "Attribute",
  "Color Palette": "ColorPalette",
  Image: "Image",
  "Theme Color": "ThemeColor",
  "Theme Class": "ThemeClass",
  Theme: "Theme",
  File: "File",
};

/**
 * DependencyType: when using the Objects parameter, you may set DependencyType to “ReferencedBy” or “ReferencesTo” to also export objects that either
 * is referenced by or reference to, respectively, the original set. Default: “ReferencesTo”.
 */
const dependencyTypes = {
  ReferencedBy: "ReferencedBy",
  ReferencesTo: "ReferencesTo", // default
};

/**
 * ReferenceType: controls what kinds of references are used when adding objects with a given DependencyType. 
    Possible values are: “None” (no reference is considered, which avoids the effect of the DependencyType parameter); 
    “Minimal” (only the references that would be needed when importing in a new KB); “Hard” (all hard references); and “All”. Default: “Minimal”.
    */
const referencyTypes = {
  None: "None",
  Minimal: "Minimal", // default
  Hard: "Hard",
  All: "All",
};

module.exports = {
  async exportXml(
    xpzName,
    ticket,
    commitsFile,
    {
      dependencyType = dependencyTypes.ReferencesTo,
      referencyType = referencyTypes.Minimal,
      includeGXMessages = false,
      includeUntranslatedMessages = false,
      exportKbInfo = true, // default true
      exportAll = false,
    } = {}
  ) {
    const parser = new XMLParser();
    const xmlFile = await fs.readFile(commitsFile);
    const commitsJson = parser.parse(xmlFile);
    const commitsArray = [].concat(commitsJson.log.logentry);

    const onlySpecificCommit = commitsArray.filter((entry) => ticket.length <= 0 || entry.msg.includes(ticket));

    const onlyWithActions = onlySpecificCommit.filter((entry) => entry.actions.toString().length);
    const commitChanges = onlyWithActions.flatMap((entry) => entry.actions.action);

    if (!commitChanges.length) {
      throw new Error("Nenhuma alteração encontrada.");
    }

    const uniqueFiles = commitChanges.reduce((accumulator, item) => {
      const { objectGuid } = item;
      if (!accumulator.some((a) => a.objectGuid === objectGuid)) accumulator.push(item);

      return accumulator;
    }, []);

    const changesString = uniqueFiles.reduce((accumulator, item) => {
      const { objectType, objectName } = item;

      const type = objectTypes[objectType];
      if (accumulator[objectType]) {
        accumulator[type] += `,${objectName}`;
      } else {
        accumulator[type] = `${objectName}`;
      }
      return accumulator;
    }, {});

    const objects = Object.keys(changesString)
      .map((k) => `${k}:${changesString[k]}`)
      .join(";");

    const xml = `<Export			
        File="${xpzName}" 
        Objects="${objects}"
        DependencyType="${dependencyType}"
        ReferenceType="${referencyType}"
        IncludeGXMessages="${includeGXMessages}"
        IncludeUntranslatedMessages="${includeUntranslatedMessages}"
        ExportKBInfo="${exportKbInfo}"
        ExportAll="${exportAll}"
    />`;

    return xml.trim();
  },
};
