import { PeterTestPage } from './app.po';

describe('peter-test App', () => {
  let page: PeterTestPage;

  beforeEach(() => {
    page = new PeterTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
