import { Parser as HtmlToReactParser } from 'html-to-react';

const convertHTMLToJSX = (htmlString) => {
  const htmlToReactParser = new HtmlToReactParser();
  const reactElement = htmlToReactParser.parse(htmlString);
  return reactElement;
};

export default convertHTMLToJSX;
