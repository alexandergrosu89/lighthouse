import lighthouse from "lighthouse";
import _ from "lodash";
import Promise from "bluebird";

const urls = [
  "https://www.example.com",
  // "https://www.arteriorshome.com/",
  // "https://www.madegoods.com/",
  // "https://www.phillipscollection.com",
  // "https://www.globalviews.com/",
  // "http://www.palecek.com/palecek/",
  // "https://fourhands.com/",
  // "https://cyan.design/",
];

const config = require("../lighthouse.config");
const ChromeLauncher = require("chrome-launcher");

export async function getReports() {
  var reports = [];
  if (Array.isArray(urls)) {
    await Promise.each(urls, async (url) => {
      const chrome = await ChromeLauncher.launch({
        chromeFlags: ["--headless", "--disable-gpu"],
      });
      const options = {
        logLevel: "silent",
        output: "json",
        // formFactor: "mobile",
        // screenEmulation: {disabled: true},
        // onlyCategories: ["performance"],
        // onlyAudits: ["is-on-https"],
        port: chrome.port,
      };
      const runnerResult = await lighthouse(url, options, config);
      const report = JSON.parse(runnerResult.report);

      await chrome.kill();

      reports.push({
        url: url,
        performance: {
          title: _.get(report, "categories.performance.title"),
          score: _.get(report, "categories.performance.score") * 100,
        },
        accessibility: {
          title: _.get(report, "categories.accessibility.title"),
          score: _.get(report, "categories.accessibility.score") * 100,
        },
        best_practices: {
          title: _.get(report, "categories.best-practices.title"),
          score: _.get(report, "categories.best-practices.score") * 100,
        },
        seo: {
          title: _.get(report, "categories.seo.title"),
          score: _.get(report, "categories.seo.score") * 100,
        },
      });
    });
  }

  return reports;
}
