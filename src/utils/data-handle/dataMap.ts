import { dataHandler } from '.';
import { DataQueue } from './dataQueue';
export class DataMap{
    box3ds:DataQueue;
    constructor(){
        this.box3ds=new DataQueue((a,b)=>{
            return dataHandler.naturalOrder(
                a.vbox.count() * a.vbox.volume(),
                b.vbox.count() * b.vbox.volume()
            )
        })
    }
    push(vbox) {
        this.box3ds.push({
            vbox: vbox,
            color: vbox.avg()
        });
    }
    palette() {
        return this.box3ds.map(function(vb) {
            return vb.color
        });
    }

    size() {
        return this.box3ds.size();
    }
    //Palette
    map(color) {
        var box3ds = this.box3ds;
        for (var i = 0; i < box3ds.size(); i++) {
            if (box3ds.peek(i).vbox.contains(color)) {
                return box3ds.peek(i).color;
            }
        }
        return this.nearest(color);
    }
    nearest(color) {
        var box3ds = this.box3ds,
            d1, d2, pColor;
        for (var i = 0; i < box3ds.size(); i++) {
            d2 = Math.sqrt(
                Math.pow(color[0] - box3ds.peek(i).color[0], 2) +
                Math.pow(color[1] - box3ds.peek(i).color[1], 2) +
                Math.pow(color[2] - box3ds.peek(i).color[2], 2)
            );
            if (d2 < d1 || d1 === undefined) {
                d1 = d2;
                pColor = box3ds.peek(i).color;
            }
        }
        return pColor;
    }
    forcebw() {
        // XXX: won't  work yet
        var box3ds = this.box3ds;
        box3ds.sort((a, b)=> {
            return dataHandler.naturalOrder(dataHandler.sum(a.color), dataHandler.sum(b.color))
        });

        // force darkest color to black if everything < 5
        var lowest = box3ds[0].color;
        if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
            box3ds[0].color = [0, 0, 0];

        // force lightest color to white if everything > 251
        var idx = box3ds.size() - 1,
            highest = box3ds[idx].color;
        if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
            box3ds[idx].color = [255, 255, 255];
    }
}