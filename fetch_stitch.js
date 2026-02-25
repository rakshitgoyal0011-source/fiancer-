import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = "YOUR_API_KEY_HERE";
const PROJECT_ID = "1752682248118390833";
const SCREENS = [
    "05bd28bfa6734608b45ca6d409993319",
    "077d1cabdafc49cd93b19c76d05b4492",
    "0eda345bd684429f9873f16018d6bc40",
    "1b73f2506b204448aa49f3adb20b026d",
    "1eb91e6dd7e84bd79e29a6117f5e6e96",
    "43449968a7244a10a5a2e783bf4cc255",
    "44a86a68fc9545d9b505be844d0984cc",
    "633727ccb6694f49bb80bf974a6f5bc7",
    "8fb4495f247240438a330128c1971961",
    "c9fec70c26e342f2a5eb433290f76a9f",
    "f9f9d6e7b25d4e15952d884da43982fe",
    "fa0f23769fae46d88fafaaa4e43147ef"
];

const BASE_DIR = path.join(process.cwd(), 'stitch_screens');
if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR);
}

const fetchJson = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { "X-Goog-Api-Key": API_KEY } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
};

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

async function main() {
    for (const id of SCREENS) {
        console.log(`Fetching metadata for screen ${id}...`);
        try {
            const data = await fetchJson(`https://stitch.googleapis.com/v1/projects/${PROJECT_ID}/screens/${id}`);
            const screenDir = path.join(BASE_DIR, id);
            if (!fs.existsSync(screenDir)) {
                fs.mkdirSync(screenDir);
            }

            if (data.htmlCode && data.htmlCode.downloadUrl) {
                console.log(`Downloading HTML for ${id}...`);
                await downloadFile(data.htmlCode.downloadUrl, path.join(screenDir, 'index.html'));
            }
            if (data.screenshot && data.screenshot.downloadUrl) {
                console.log(`Downloading Screenshot for ${id}...`);
                await downloadFile(data.screenshot.downloadUrl, path.join(screenDir, 'screenshot.png'));
            }
            console.log(`Successfully downloaded screen ${id}`);
        } catch (e) {
            console.error(`Failed on screen ${id}:`, e);
        }
    }
    console.log('All screens downloaded.');
}

main();
