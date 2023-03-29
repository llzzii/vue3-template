import { dataHandler } from "@/utils/data-handle";

export const UseHandleImg = () => {
  let imgUrl = '';

  const getImgThemeColor = async (imgSrc: string) => {
    let colorCountedSet: any = [];
    let themeColor = '';
    const img = new Image();
    img.src = imgSrc;
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    const canvas = document.createElement('canvas');
    // 图片缩小
    let shrinkFactor = 10;
    if (img.width > 300) {
      shrinkFactor = img.width / 300;
    }
    let height = img.height / shrinkFactor;
    let width = img.width / shrinkFactor;
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    imgUrl = canvas.toDataURL('image/jpeg', 1);
    let originalPiexls;
    try {
      getColor(ctx);
      console.log(
        '🚀 ~ file: useHandleImg.ts:36 ~ getImgThemeColor ~ getColor(ctx);:',
        getColor(ctx),
      );
      //   //保存像素
      originalPiexls = ctx.getImageData(0, 0, width, height).data;
     let colors= getColor(originalPiexls);
     themeColor=colors[0]
    } catch (error) {
      console.log(error);
    }
    return themeColor;
  };

  const getColor = (colorData) => {
    console.log("🚀 ~ file: useHandleImg.ts:41 ~ getColor ~ colorData:", colorData)
    const matrix: any = Array.from(colorData);
    console.log("🚀 ~ file: useHandleImg.ts:42 ~ getColor ~ matrix:", matrix)
    let colorArr: any = [];
    let colorList = {};
    const pixelArray:any = [];
    let i = 0;
    while (i < matrix.length) {
      const r = matrix[i];
      const g = matrix[i + 1];
      const b = matrix[i + 2];
      const a = matrix[i + 3];
      i = i + 4; // 最后 +4 比每次 i++ 快 10ms 左右性能
      // If pixel is mostly opaque and not white
      if (typeof a === 'undefined' || a >= 125) {
        if (!(r > 250 && g > 250 && b > 250)) {
            pixelArray.push([r, g, b]);
        }
    }
      const key = [r, g, b, a].join(',');
      key in colorList ? ++colorList[key] : (colorList[key] = 1);
    }
    // 发送数组到聚类值的量化函数,使用中值切割算法
    const cmap    = dataHandler.quantize(pixelArray, 3);
    const palette = cmap? cmap.palette() : null;
    console.log("🚀 ~ file: useHandleImg.ts:69 ~ getColor ~ palette:", palette)
    return palette
    // for (let key in colorList) {
    //   colorArr.push({
    //     rgba: `rgba(${key})`,
    //     num: colorList[key],
    //   });
    // }
    // colorArr = colorArr.sort((a, b) => {
    //   return b.num - a.num;
    // });
    // console.log('🚀 ~ file: useHandleImg.ts:60 ~ getColor ~ colorArr:', colorArr);
    // return colorArr;
  };
  return { getImgThemeColor };
};
