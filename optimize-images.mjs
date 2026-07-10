import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join } from 'path';

const root = 'public/images';
const MAX = 1600; // cap long edge
const Q = 74; // mozjpeg quality

function walk(dir) {
  let files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files = files.concat(walk(p));
    else files.push(p);
  }
  return files;
}

const jpgs = walk(root).filter((f) => /\.jpe?g$/i.test(f));
let before = 0,
  after = 0;
for (const f of jpgs) {
  const b = statSync(f).size;
  before += b;
  const meta = await sharp(f).metadata();
  const long = Math.max(meta.width || 0, meta.height || 0);
  const tmp = f + '.tmp';
  let pipe = sharp(f).rotate();
  if (long > MAX) {
    pipe = pipe.resize({
      width: meta.width >= meta.height ? MAX : null,
      height: meta.height > meta.width ? MAX : null,
      fit: 'inside',
    });
  }
  await pipe.jpeg({ quality: Q, mozjpeg: true }).toFile(tmp);
  renameSync(tmp, f);
  const a = statSync(f).size;
  after += a;
  console.log(`${f.replace('public/images/', '')}: ${(b / 1024) | 0}KB -> ${(a / 1024) | 0}KB`);
}
console.log(
  `\nTOTAL JPEG: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB  (saved ${((1 - after / before) * 100).toFixed(0)}%)`
);
