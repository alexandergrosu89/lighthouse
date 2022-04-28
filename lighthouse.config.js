module.exports = {
  extends: "lighthouse:default",
  settings: {
    // onlyCategories: ["performance"],
    // onlyAudits: ["is-on-https", "service-worker", "viewport"],
  },
  categories: {
    performance: {
      title: "Performance",
      description: "This category judges your performance",
      auditRefs: [
        { id: "first-meaningful-paint", weight: 2, group: "metrics" },
        { id: "first-contentful-paint", weight: 3, group: "metrics" },
        { id: "interactive", weight: 5, group: "metrics" },
      ],
    },
  },
};
