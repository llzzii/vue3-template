import { dataHandler } from "./index";

export class Box3d{
    r1: any;
    r2: any;
    g1: any;
    g2: any;
    b1: any;
    b2: any;
    colorSpace: any;
    _volume: any;
    _count_set: any;
    _count: number|undefined;
    _avg: any;
    constructor(r1, r2, g1, g2, b1, b2, colorSpace){
        this.r1 = r1;
        this.r2 = r2;
        this.g1 = g1;
        this.g2 = g2;
        this.b1 = b1;
        this.b2 = b2;
        this.colorSpace = colorSpace;
    }
    //空间范围
    volume(force?){
        if (!this._volume || force) {
            this._volume = ((this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1));
        }
        return this._volume;
    }
    //
    count(force?) {
        if (!this._count_set || force) {
            var npix = 0,
                i, j, k, index;
            for (i = this.r1; i <= this.r2; i++) {
                for (j = this.g1; j <= this.g2; j++) {
                    for (k = this.b1; k <= this.b2; k++) {
                        index = dataHandler.getColorIndex(i, j, k);
                        npix += ( this.colorSpace[index] || 0);
                    }
                }
            }
            this._count = npix;
            this._count_set = true;
        }
        return this._count;
    }
    copy() {
        return new Box3d(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.colorSpace);
    }
    // 平均值
    avg(force?) {
       
        if (!this._avg || force) {
            var ntot = 0,
                mult = 1 << (8 - dataHandler.sigbits),
                rsum = 0,
                gsum = 0,
                bsum = 0,
                hval,
                i, j, k, histoindex;
            for (i = this.r1; i <= this.r2; i++) {
                for (j = this.g1; j <= this.g2; j++) {
                    for (k = this.b1; k <= this.b2; k++) {
                        histoindex = dataHandler.getColorIndex(i, j, k);
                        hval = this.colorSpace[histoindex] || 0;
                        ntot += hval;
                        rsum += (hval * (i + 0.5) * mult);
                        gsum += (hval * (j + 0.5) * mult);
                        bsum += (hval * (k + 0.5) * mult);
                    }
                }
            }
            if (ntot) {
                // ~ 按位非(NOT) 向下取整 ~~1.5 =1
                this._avg = [~~(rsum / ntot), ~~ (gsum / ntot), ~~ (bsum / ntot)];
            } else {
                //console.log('empty box');
                this._avg = [~~(mult * (this.r1 + this.r2 + 1) / 2), ~~ (mult * (this.g1 + this.g2 + 1) / 2), ~~ (mult * (this.b1 + this.b2 + 1) / 2)];
            }
        }
        return this._avg;
    }
    // 是否包含
    contains(pixel) {
          let r = pixel[0] >> dataHandler.rshift,
        g = pixel[1] >> dataHandler.rshift,
        b = pixel[2] >> dataHandler.rshift;
        return (r >= this.r1 && r <= this.r2 &&
            g >= this.g1 && g <= this.g2 &&
            b >= this.b1 && b <= this.b2);
    }
}