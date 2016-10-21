import { CSC435ProjectPage } from './app.po';

describe('csc435-project App', function() {
  let page: CSC435ProjectPage;

  beforeEach(() => {
    page = new CSC435ProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
