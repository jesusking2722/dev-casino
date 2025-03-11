const express = require("express");
const router = express.Router();
const {
  getLanguages,
  getBasicTranslations,
} = require("../controllers/translationController");

router.get("/translations", getLanguages);
router.get("/translations/:lang", getBasicTranslations);

module.exports = router;
