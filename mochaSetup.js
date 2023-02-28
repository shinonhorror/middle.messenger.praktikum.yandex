import { JSDOM } from "jsdom";
import { XMLHttpRequest } from "xmlhttprequest";

const dom = new JSDOM(
  `<!DOCTYPE html><html><body><div id="root"></div></body></html>`,
  {
    url: `http://localhost:3000`,
  }
);

global.window = dom.window;
global.location = dom.window.location;
global.document = dom.window.document;
global.XMLHttpRequest = XMLHttpRequest;
global.FormData = dom.window.FormData;
global.DocumentFragment = dom.window.DocumentFragment;
