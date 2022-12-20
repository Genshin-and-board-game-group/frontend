import parseAPNG, { APNG } from "apng-js";

export function getImgBuffer(url: URL | RequestInfo) {
  return new Promise(async resolve => {
    const blob = await fetch(url).then(res => res.blob());
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
  });
}

export async function createApngPlayer(url: URL | RequestInfo, ctx: any, flag: boolean) {
  const imgBuffer = await getImgBuffer(url);
  const apng = parseAPNG(imgBuffer as ArrayBuffer) as APNG;
  if(flag) {
    apng.numPlays = 1;
  }
  const player = await apng.getPlayer(ctx);
  return player;
}