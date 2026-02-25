import fs from 'fs';

try {
    const dirs = fs.readdirSync('.');
    if (dirs.includes('Src') && !dirs.includes('src')) {
        fs.renameSync('Src', 'src');
        console.log('Fixed capitalization of src folder for Vercel');
    }
} catch (e) {
    console.error('Error fixing folder casing:', e);
}
