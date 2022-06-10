import {element, waitFor} from 'detox';

describe('List Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have title', async () => {
    await waitFor(element(by.id('title')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should be able to navigate to details page', async () => {
    await element(by.id('listItem')).atIndex(1).tap();
    await waitFor(element(by.id('detailsView')))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id('inputText')).typeText('see receipts');
    await waitFor(element(by.id('inputText')))
      .toHaveText('see receipts')
      .withTimeout(2000);
  });

  //   it('should have register screen', async () => {
  //   });

  //   it('should be able to input comments', async () => {
  //   });
});
