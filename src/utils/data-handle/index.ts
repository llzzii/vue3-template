import { DataMap } from './dataMap';
import { DataQueue } from './dataQueue';
import { Box3d } from './box3d';
export class DataHandler {
  sigbits = 5; //符号位
  rshift = 8 - this.sigbits; //右移
  maxIterations = 1000; //最大迭代次数
  fractByPopulations = 0.75;

  map(array, f?) {
    let o: any = {};
    return f
      ? array.map(function (d, i) {
          o.index = i;
          return f.call(o, d);
        })
      : array.slice();
  }
  naturalOrder(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  sum(array, f?) {
    let o: any = {};
    return array.reduce(
      f
        ? function (p, d, i) {
            o.index = i;
            return p + f.call(o, d);
          }
        : function (p, d) {
            return p + d;
          },
      0,
    );
  }
  max(array, f?) {
    return Math.max.apply(null, f ? this.map(array, f) : array);
  }
  //获取像素的缩减空间颜色索引
  /*
   * 左移(<<)将32位二进制向左移动指定的位数，空缺的位将会使用0填充。左移不会影响符号位。
   * 左移是乘法，移动的位数是2的幂数
   * 3<<6 =3*2^6=3*64=192
   *
   **/
  getColorIndex(r, g, b) {
    return (r << (2 * this.sigbits)) + (g << this.sigbits) + b;
  }
  //返回（一维数组，给出像素数颜色空间的每个量化区域），或者出错时为 null
  /**
   * >>有符号右移,右移(>>)将32位二进制向右移动指定的位数，但是保留符号位，右移空缺的符号位使* 用0填充。符号位0代表正数，1代表负数
   *  右移是除法，移动的位数是2的(幂数 × -1)
   *  192>>6=192/(2^6)=192/64=3
   */
  getColorSpace(pixels) {
    let historySize = 1 << (3 * this.sigbits),
      colorSpace = new Array(historySize),
      index,
      r,
      g,
      b;
    pixels.forEach((pixel) => {
      r = pixel[0] >> this.rshift;
      g = pixel[1] >> this.rshift;
      b = pixel[2] >> this.rshift;
      index = this.getColorIndex(r, g, b);
      colorSpace[index] = (colorSpace[index] || 0) + 1;
    });
    return colorSpace;
  }
  box3dFromPixels(pixels, histo) {
    let rmin = 1000000,
      rmax = 0,
      gmin = 1000000,
      gmax = 0,
      bmin = 1000000,
      bmax = 0,
      rval,
      gval,
      bval;
    // find min/max
    pixels.forEach((pixel) => {
      rval = pixel[0] >> this.rshift;
      gval = pixel[1] >> this.rshift;
      bval = pixel[2] >> this.rshift;
      if (rval < rmin) rmin = rval;
      else if (rval > rmax) rmax = rval;
      if (gval < gmin) gmin = gval;
      else if (gval > gmax) gmax = gval;
      if (bval < bmin) bmin = bval;
      else if (bval > bmax) bmax = bval;
    });
    return new Box3d(rmin, rmax, gmin, gmax, bmin, bmax, histo);
  }
  doCut(color, box3d, partialsum, total, lookaheadsum) {
    let dim1 = color + '1',
      dim2 = color + '2',
      left,
      right,
      box3d1,
      box3d2,
      d2,
      count2 = 0;
    for (let i = box3d[dim1]; i <= box3d[dim2]; i++) {
      if (partialsum[i] > total / 2) {
        box3d1 = box3d.copy();
        box3d2 = box3d.copy();
        left = i - box3d[dim1];
        right = box3d[dim2] - i;
        if (left <= right) d2 = Math.min(box3d[dim2] - 1, ~~(i + right / 2));
        else d2 = Math.max(box3d[dim1], ~~(i - 1 - left / 2));
        // avoid 0-count boxes
        while (!partialsum[d2]) d2++;
        count2 = lookaheadsum[d2];
        while (!count2 && partialsum[d2 - 1]) count2 = lookaheadsum[--d2];
        // set dimensions
        box3d1[dim2] = d2;
        box3d2[dim1] = box3d1[dim2] + 1;
        // console.log('box3d counts:', box3d.count(), box3d1.count(), box3d2.count());
        return [box3d1, box3d2];
      }
    }
  }
  medianCutApply(histo, box3d: Box3d) {
    if (!box3d.count()) return;
    let rw = box3d.r2 - box3d.r1 + 1,
      gw = box3d.g2 - box3d.g1 + 1,
      bw = box3d.b2 - box3d.b1 + 1,
      maxw = this.max([rw, gw, bw]);
    //只有一个元素时不需要切割
    if (box3d.count() == 1) {
      return [box3d.copy()];
    }
    //沿所选轴查找部分和数组
    let total = 0,
      partialsum: any = [],
      lookaheadsum: any = [],
      i,
      j,
      k,
      sum,
      index;
    if (maxw == rw) {
      for (i = box3d.r1; i <= box3d.r2; i++) {
        sum = 0;
        for (j = box3d.g1; j <= box3d.g2; j++) {
          for (k = box3d.b1; k <= box3d.b2; k++) {
            index = this.getColorIndex(i, j, k);
            sum += histo[index] || 0;
          }
        }
        total += sum;
        partialsum[i] = total;
      }
    } else if (maxw == gw) {
      for (i = box3d.g1; i <= box3d.g2; i++) {
        sum = 0;
        for (j = box3d.r1; j <= box3d.r2; j++) {
          for (k = box3d.b1; k <= box3d.b2; k++) {
            index = this.getColorIndex(j, i, k);
            sum += histo[index] || 0;
          }
        }
        total += sum;
        partialsum[i] = total;
      }
    } else {
      /* maxw == bw */
      for (i = box3d.b1; i <= box3d.b2; i++) {
        sum = 0;
        for (j = box3d.r1; j <= box3d.r2; j++) {
          for (k = box3d.g1; k <= box3d.g2; k++) {
            index = this.getColorIndex(j, k, i);
            sum += histo[index] || 0;
          }
        }
        total += sum;
        partialsum[i] = total;
      }
    }
    partialsum.forEach(function (d, i) {
      lookaheadsum[i] = total - d;
    });
    // determine the cut planes
    return maxw == rw
      ? this.doCut('r', box3d, partialsum, total, lookaheadsum)
      : maxw == gw
      ? this.doCut('g', box3d, partialsum, total, lookaheadsum)
      : this.doCut('b', box3d, partialsum, total, lookaheadsum);
  }
 // 进行迭代的内部函数

  iter(lh, target,histo){
    let ncolors = lh.size(),
      niters = 0,
      vbox;
    while (niters < this.maxIterations) {
      if (ncolors >= target) return;
      if (niters++ > this.maxIterations) {
        // console.log("infinite loop; perhaps too few pixels!");
        return;
      }
      vbox = lh.pop();
      if (!vbox?.count()) {
        /* just put it back */
        lh.push(vbox);
        niters++;
        continue;
      }
      // do the cut
      let vboxes = this.medianCutApply(histo, vbox)||[],
        vbox1 = vboxes[0],
        vbox2 = vboxes[1];

      if (!vbox1) {
        // console.log("vbox1 not defined; shouldn't happen!");
        return;
      }
      lh.push(vbox1);
      if (vbox2) {
        /* vbox2 can be null */
        lh.push(vbox2);
        ncolors++;
      }
    }
  }
  quantize(pixels, maxcolors) {
    // short-circuit
    if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
      return false;
    }

    // 检查颜色内容并在不足时转换为灰度

    let histo = this.getColorSpace(pixels),
      histosize = 1 << (3 * this.sigbits);

    // 检查我们是否已经低于 maxcolors
    let nColors = 0;
    histo.forEach(function () {
      nColors++;
    });
    if (nColors <= maxcolors) {
      // 从 histo 生成新颜色并返回
    }

    // 从颜色中获取开始的 box3d
    let box3d = this.box3dFromPixels(pixels, histo),
      pq = new DataQueue((a, b)=> {
        return this.naturalOrder(a.count(), b.count());
      });
    pq.push(box3d);

   

    // 第一组颜色，按Populations排序
    this.iter(pq, this.fractByPopulations * maxcolors,histo);
    // console.log(pq.size(), pq.debug().length, pq.debug().slice());

    // Re-sort by the product of pixel occupancy times the size in color space.
    let pq2 = new DataQueue( (a, b)=> {
      return this.naturalOrder(a.count() * a.volume(), b.count() * b.volume());
    });
    while (pq.size()) {
      pq2.push(pq.pop());
    }

    // next set - generate the median cuts using the (npix * vol) sorting.
    this.iter(pq2, maxcolors,histo);

    // calculate the actual colors
    let cmap = new DataMap();
    while (pq2.size()) {
      cmap.push(pq2.pop());
    }

    return cmap;
  }
}
export const dataHandler = new DataHandler();
