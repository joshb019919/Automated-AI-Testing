import { test, expect } from '@playwright/test';

test('adds a todo', async ({ page }) => {
  await page.goto('/');
  await page.locator('#todo-input').fill('Learn Playwright');
  await page.locator('#add-btn').click();

  await expect(page.locator('#todo-body tr')).toHaveCount(3);
  await expect(page.locator('#todo-body tr').last()).toContainText('Learn Playwright');
});

test('strikes through completed todo', async ({ page }) => {
  await page.goto('/');
  const firstRow = page.locator('#todo-body tr').first();
  await firstRow.locator('input[type="checkbox"]').check();

  await expect(firstRow.locator('span')).toHaveCSS('text-decoration-line', 'line-through');
});

test('deletes a todo', async ({ page }) => {
  await page.goto('/');
  const firstRow = page.locator('#todo-body tr').first();
  await firstRow.locator('button').nth(1).click();

  await expect(page.locator('#todo-body tr')).toHaveCount(1);
});
