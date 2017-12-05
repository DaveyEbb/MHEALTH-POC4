import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('navbar-brand should be mhealth-poc4@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('mhealth-poc4@0.0.1');
  });

  
    it('Dataset component should be loadable',() => {
      page.navigateTo('/Dataset');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Dataset');
    });

    it('Dataset table should have 8 columns',() => {
      page.navigateTo('/Dataset');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  
    it('Grant component should be loadable',() => {
      page.navigateTo('/Grant');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Grant');
    });

    it('Grant table should have 6 columns',() => {
      page.navigateTo('/Grant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
