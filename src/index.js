import fs from 'fs';
import cheerio from 'cheerio';

import Folder from './model/folder';
import Link from './model/link';
import {convert2json, convert2html} from './helpers/convertor' ;
import {storeBookmarks, storeBookmarksHtml} from './utils/storeUtils';


// const fileName = "./assets/bookmarks_selfmade.html";
const fileName = "./assets/bookmarks_2017_7_10.html";

let bookmarksObj = new Folder('', [], []);

var bookmarksInfo = fs.readFileSync(fileName, 'utf8');
const $ = cheerio.load(bookmarksInfo, { decodeEntities: false }); // decodeEntities forbidden decode utf-8

const toolbarTitleNode = $('H3[PERSONAL_TOOLBAR_FOLDER=true]');
const bookmarksRoot = $(toolbarTitleNode).parent().parent();

convert2json(bookmarksRoot, bookmarksObj, $);

let jsonString = JSON.stringify(bookmarksObj);
storeBookmarks(jsonString);

let html = convert2html(bookmarksObj);
storeBookmarksHtml(html);