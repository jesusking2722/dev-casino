const fs = require("fs");
const path = require("path");

// Define the base path for translations
const langPath = path.join(__dirname, "../resources/lang");

/**
 * Get the list of available languages (folders inside lang directory).
 */
const getLanguages = (req, res) => {
  try {
    if (!fs.existsSync(langPath)) {
      return res.json({
        success: false,
        message: "Language directory not found",
      });
    }

    const languages = fs
      .readdirSync(langPath, { withFileTypes: true })
      .filter((dir) => dir.isDirectory())
      .map((dir) => dir.name);

    if (languages.length === 0) {
      return res.json({
        success: true,
        message: "No languages found",
        data: [],
      });
    }

    return res.json({ success: true, data: languages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get translation files for a specific language.
 */
const getBasicTranslations = (req, res) => {
  const { lang } = req.params;
  console.log(lang);
  const langDir = path.join(langPath, lang);

  try {
    if (!fs.existsSync(langDir)) {
      return res.json({ success: false, message: "Language not found" });
    }

    const excludedFiles = ["games.json", "installer_messages.json", "log.json"];
    const files = fs
      .readdirSync(langDir)
      .filter(
        (file) => file.endsWith(".json") && !excludedFiles.includes(file)
      );

    if (files.length === 0) {
      return res.json({
        success: true,
        message: "No translation files found",
        data: {},
      });
    }

    let translations = {};

    files.forEach((file) => {
      const filePath = path.join(langDir, file);
      const fileName = path.basename(file, ".json");

      try {
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        translations[fileName] = jsonData;
      } catch (err) {
        console.error(`Error reading ${file}:`, err);
        return res.json({ success: false, message: `Error parsing ${file}` });
      }
    });

    return res.json({ success: true, data: translations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLanguages,
  getBasicTranslations,
};
