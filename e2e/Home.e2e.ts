import {element, waitFor} from 'detox';

describe('List Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have logo', async () => {
    await waitFor(element(by.id('logo')))
      .toBeVisible()
      .withTimeout(2000);
  });

  it('should not have have undeclared text', async () => {
    await waitFor(element(by.id('wrong')))
      .not.toBeVisible()
      .withTimeout(2000);
  });

  it('should be able to type a non existent search drug and render an empty list', async () => {
    await element(by.id('inputText')).typeText('zw');
    await waitFor(element(by.id('emptyText')))
      .toHaveText('No Matching Drugs')
      .withTimeout(2000);
  });

  it('should be able to search for a drug and render the drug item', async () => {
    await element(by.id('inputText')).typeText('folic');
    await waitFor(element(by.id('itemName')))
      .toHaveText('Folic Acid')
      .withTimeout(2000);
  });
});
