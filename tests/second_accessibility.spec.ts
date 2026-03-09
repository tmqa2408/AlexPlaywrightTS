import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";

test.only("Custom tags verifications", async ({ page }) => {
  await page.goto("https://commitquality.com/");
  //await page.goto("https://www.testing101.net");  // No accessibility violations

  await test.step("Run accessibility checks with custom rules", async () => {
    // Run accessibility checks with default axe rules
    const axeBuilder = await new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
    ]);

    const accessibilityScanResults = await axeBuilder.analyze();

    // Log the results
    console.log(
      "Accessibility Scan Results:",
      accessibilityScanResults.violations);

    // Store the results in a file
    const reportLines: string[] = [];

    // Log the results
    if (accessibilityScanResults.violations.length > 0) {
        reportLines.push('Accessibility Violations Found:');
        for (const violation of accessibilityScanResults.violations) {
            reportLines.push(`Violation: ${violation.id}`);
            reportLines.push(`Descriptions: ${violation.description}`);
            reportLines.push(`Impact: ${violation.impact}`);
            for (const node of violation.nodes) {
                reportLines.push(`  NodeHTML: ${node.html}`);
                reportLines.push(`  Failure Summary: ${node.failureSummary}`);
                reportLines.push(`  Node Selector: ${node.target.join(', ')}`);
                reportLines.push('');
            }
            reportLines.push('');
        }
    } else {
        reportLines.push('No accessibility violations found.');
    }

    //console.log(reportLines.join('\n'));

    const reportFilePath = 'accessibility-reports/accessibility_report.txt';
    await fs.promises.writeFile(reportFilePath, reportLines.join('\n'));


    // Assert that there are no violations found
    expect(
      accessibilityScanResults.violations.length,
      "Accessibility violations found",
    ).toBe(0);
  });
});
