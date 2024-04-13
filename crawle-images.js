const path = require("node:path");
const fs = require("node:fs/promises");

const banners = path.resolve("./public/banners/");
const constants = path.resolve("./lib/constants.ts");

async function reDoBannersReference(images) {
  const variable = "export const banners =";
  const file = (await fs.readFile(constants)).toString();

  if (file.includes(variable)) {
    const data = file.replace(
      /(export const banners\s?\=\s?)(\[([\s\S]*)?\])(\;)/,
      (match, p1, _p2, _p3, p4) => {
        return `${p1}${JSON.stringify(images)}${p4}`;
      }
    );

    await fs.writeFile(constants, data);
    return;
  }

  await fs.writeFile(
    constants,
    file + "\n" + `${variable} ${JSON.stringify(images)};`
  );
}

async function main() {
  const images = [];

  const dir = await fs.opendir(banners);
  for await (const image of dir) {
    if (image.isFile()) {
      images.push(image.name);
    }
  }

  await reDoBannersReference(images);
}

main();
