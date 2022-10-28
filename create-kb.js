module.exports = {
  createKnoledgeBaseXml(
    kbDirectory = "c:MyKBs",
    { template = "Java.KBTemplate", overwrite = false, createDbInKbFolder = true, integratedSecurity = true } = {}
  ) {
    // Template="kbTemplate" |  BulkCopyFile="fileNameWithBCPformat"
    // TemplatesPath=${templatesPath}
    // IntegratedSecurity="true|false"
    // UserId="userId"
    // Password="password"
    // ServerInstance = "instance";
    // DBName="dbName"
    // Language="language"

    const xml = `<CreateKnowledgeBase
        Directory="${kbDirectory}"
        Template="${template}"
        Overwrite="${overwrite}"
        IntegratedSecurity="${integratedSecurity}"
        CreateDbInKbFolder="${createDbInKbFolder}"
     />`;

    return xml.trim();
  },
};
