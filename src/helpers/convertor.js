import ejs from 'ejs';
import fs from 'fs';

import Folder from '../model/folder.js';
import Link from '../model/link.js';

export function convert2json(node, folder, $) {
    if (!node || !folder || !$) return;
    let dtNodes = $(node).children('DT');
    let handlingNode = dtNodes.first();
    while (handlingNode.length != 0) {
        let isFolder = $('H3', handlingNode).length != 0;
        // 目录，添加folder并convert2json(handlingNode,folder, $) 
        if (isFolder) {
            let folderNode = $('H3', handlingNode).first();
            let subFolder = new Folder(folderNode.text(), [], []);
            convert2json($('DL', handlingNode), subFolder, $);
            if (!folder.subfolders) {
                folder.subfolders = [];
            }
            folder.subfolders.push(subFolder);
        } else {
            let linkNode = $('a', handlingNode);
            let link = new Link(linkNode.text(), linkNode.attr('href'), linkNode.attr('icon'));
            if (!folder.links) {
                folder.links = [];
            }
            folder.links.push(link);
        }
        handlingNode = handlingNode.next();
    }
}

export function convert2html(folder) {
    let templ = fs.readFileSync('./src/templates/bookmarks.ejs', 'utf8');
    let html = ejs.render(templ, {folder: folder}, { filename: './src/templates/x.ejs' }); // 因为template中include是relative path，所以需要制定相对哪个文件
    return html;
}