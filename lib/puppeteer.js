import lighthouse from "lighthouse";
import _ from "lodash";
import Promise from "bluebird";
import puppeteer from "puppeteer";

const urls = [
  // "https://www.example.com",
  "https://www.arteriorshome.com/",
  "https://www.madegoods.com/",
  "https://www.phillipscollection.com",
  "https://www.globalviews.com/",
  "http://www.palecek.com/palecek/",
  "https://fourhands.com/",
  "https://cyan.design/",
];

const config = require("../lighthouse.config");

export async function getReports(mobile = false) {
  var reports = [];
  if (Array.isArray(urls)) {
    await Promise.each(urls, async (url) => {
      const browser = await puppeteer.launch({
        headless: true,
        // product: "chrome",
        // channel: "chrome",
        // defaultViewport: null,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const options = {
        logLevel: "info",
        output: "json",
        port: new URL(browser.wsEndpoint()).port,
        formFactor: "desktop",
        screenEmulation: { disabled: true },
      };

      if (mobile) {
        options.formFactor = "mobile";
        options.screenEmulation = { disabled: true };
      }

      const runnerResult = await lighthouse(url, options, config);
      const report = JSON.parse(runnerResult.report);

      await browser.close();

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
