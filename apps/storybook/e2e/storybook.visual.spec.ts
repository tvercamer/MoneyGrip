import { expect, test } from "@playwright/test";

const portfolioStory =
  "/iframe.html?id=patterns-editorial-portfolio-shell--desktop-composition&viewMode=story";

test("renders the Editorial Grid portfolio composition in light mode", async ({ page }) => {
  await page.goto(`${portfolioStory}&globals=mode:light;locale:nl-BE`);
  await expect(page.getByRole("heading", { level: 1, name: "Good afternoon, Timo" })).toBeVisible();
  await expect(page).toHaveScreenshot("editorial-grid-light.png", { fullPage: true });
});

test("renders the Editorial Grid portfolio composition in charcoal mode", async ({ page }) => {
  await page.goto(`${portfolioStory}&globals=mode:dark;locale:nl-BE`);
  await expect(page.getByRole("heading", { level: 1, name: "Good afternoon, Timo" })).toBeVisible();
  await expect(page).toHaveScreenshot("editorial-grid-dark.png", { fullPage: true });
});

test("renders localized finance controls without horizontal overflow", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-actions-and-forms--form-controls&viewMode=story&globals=mode:light;locale:nl-BE",
  );
  await expect(page.getByRole("textbox", { name: "Investment name" })).toBeVisible();
  const widths = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(widths.scroll).toBe(widths.client);
});
