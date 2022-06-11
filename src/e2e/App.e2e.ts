import {element, waitFor} from 'detox';

const commentText = 'description of expense';

describe('App Screens', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have header title', async () => {
    await waitFor(element(by.id('title')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should scroll through flatlist', async () => {
    await element(by.id('expenseList')).swipe('up', 'fast', 0.9);
    await device.reloadReactNative();
  });

  it('should be able to navigate to details page', async () => {
    await element(by.id('expenseItem')).atIndex(5).tap();
  });

  it('should check that details screen exists', async () => {
    await waitFor(element(by.id('detailsView')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should check that employee name text exists', async () => {
    await waitFor(element(by.id('employee')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should clear comment if it exists', async () => {
    await element(by.id('commentInput')).clearText();
  });

  it('should confirm that submit button is disabled when there is no inputted comment', async () => {
    waitFor(element(by.id('commentButton'))).not.toBeVisible();
  });

  it('should add comment', async () => {
    await element(by.id('commentInput')).typeText(commentText);
  });

  it('should submit comment', async () => {
    await element(by.id('commentButton')).tap();
  });

  it('should have added comment', async () => {
    await waitFor(element(by.id('commentInput')))
      .toHaveText(commentText)
      .withTimeout(2000);
  });
});
