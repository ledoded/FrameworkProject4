Figure.prototype.hyperbolicparaboloid = (count = 30, a = 4, b = 4) => {
    const points = [];
    const edges = [];
    const polygons = [];

    // точки
    for (let x = -count/2; x < count/2; x++) {
        for (let y = -count/2; y < count/2; y++) {
            points.push(new Point(
                x,
                y,
                x * x / (a * a) - y * y / (b * b)
            ));
        }
    }

    //ребра
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        }
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }

    //полигоны
    let k=0;
    for (let i = 0; i < points.length; i++) {
        if (((i / 3) % count) == 0) {
            k++;
        }
        if (((i + k * 3) % 6) <= 2) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#daa2f2"));
            }
        } else {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], "#daa2f2"));
            }
        }
    }

    return new Subject(points, edges, polygons);
}