const { it, expect } = require('@jest/globals');
const fs = require('fs');
const html = require('../util/html');

describe('isKeyInObject function test', () => {
  const mockObject = {
    lang: 'en-us',
    output: 'dist',
    config: 'test.config',
  };
  it('should return true when the object has a key', () => {
    const result = html.isKeyInObject(mockObject, 'config');
    expect(result).toBe(true);
  });

  it('should return false when the object does not have a key', () => {
    const result = html.isKeyInObject(mockObject, 'jiyun');
    expect(result).toBe(false);
  });
});

describe('getHTML function test', () => {
  const mockParam = ['my html', '<div>Test</div>', 'en-us', 'dark'];

  const darkTheme = `body {background-color: black; color: white;}`;

  it('should include dark theme code', () => {
    expect(html.getHTML(...mockParam)).toContain(darkTheme);
  });
});

describe('HTMLgenerator function test', () => {
  const mockParam = {
    input: 'Silver Blaze.txt',
    lang: 'en-us',
    theme: 'dark',
  };
    const mockMDParam = {
    input: 'README.md',
    lang: 'en-us',
    theme: 'dark',
  };
  const mockDirParam = {
    input: 'test',
    lang: 'en-us',
    theme: 'dark',
  };
  const mockIncorrectParam = {
    input: 'Silve Blaze.txt',
    lang: 'en-us',
    theme: 'dark',
  };
  it('should return promise resolve with correct data', () => {
    expect(html.HTMLgenerator(mockParam)).resolves.toEqual(undefined);
  });

   it('should return promise resolve with md file correct data', () => {
    expect(html.HTMLgenerator(mockMDParam)).resolves.toEqual(undefined);
  });

  it('should return promise reject with incorrect data', () => {
    expect(html.HTMLgenerator(mockIncorrectParam)).rejects.not.toBe(undefined);
  });

  it('should run fs.promise.return.readdir when the file is a directory', async () => {
    const spyFn = jest.spyOn(fs.promises, 'readdir'); // mocking function to count
    await html.HTMLgenerator(mockDirParam);
    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  it('should run if the filetype is marked down', async () => {
    //const spyFn = jest.spyOn();
  });
});
