class Subject {
    constructor(
        points = [],
        edges = [],
        polygons = [],
        center = new Point,
        animations = []
    ) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.animations = animations;
        this.center = center;
    }

    addAnimation(animation) {
        this.animations.push(animation);
    }
}