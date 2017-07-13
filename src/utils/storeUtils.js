import fs from 'fs';
import path from 'path';
const outputDir = 'output';
export function storeBookmarks(json){
    let outputPath = path.resolve(__dirname,'../../output');
    if(!fs.existsSync(outputPath)){
        fs.mkdir(outputPath, 0o777, function (err) {
            if (err) throw err;
        });
    }

    fs.writeFile(`${outputPath}/bookmarks-${Date.now()}.json`,json,function (err) {
        if (err) throw err;
        console.log('bookmarks has saved!');
    });
}

export function storeBookmarksHtml(html){
    let outputPath = path.resolve(__dirname,'../../output');
    if(!fs.existsSync(outputPath)){
        fs.mkdir(outputPath, 0o777, function (err) {
            if (err) throw err;
        });
    }

    fs.writeFile(`${outputPath}/bookmarks-${Date.now()}.html`,html,function (err) {
        if (err) throw err;
        console.log('bookmarks html has saved!');
    });
}