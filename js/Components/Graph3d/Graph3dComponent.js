class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        const height = 700;
        const width = window.innerWidth * 0.9;
        this.proportion = width / height;

        this.WIN = {
            LEFT: -10 * this.proportion,
            BOTTOM: -10,
            WIDTH: 20 * this.proportion,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, -50),
            DISPLAY: new Point(0, 0, -30),

        }

        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'graphics',
            width, 
            height,
            callbacks: {
                wheel: event => this.wheel(event),
                mouseDown: (event) => this.mousedown(event),
                mouseMove: (event) => this.mousemove(event),
                mouseUp: () => this.mouseup(),
            }
        });

        this.graph3D = new Graph3D({
            WIN: this.WIN,
        });

        //фигура
        this.figure = (new Figure).cube();

        this.canRotate = false;
        this.isPolygons = true;
        this.isEdges = false;
        this.isPoints = true;

        //свет
        this.LIGHT = new Light(-40, 2, 0, 25000);

        //FPS
        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now();

        const animLoop = () => {
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            this.render();
            requestAnimFrame(animLoop);
        }
        animLoop();
    }

    _addEventListeners() {
        document.addEventListener('keydown', event => this.keyDownHandler(event));
        document.getElementById('selectFigure').addEventListener('change', () => {
            let value = document.getElementById('selectFigure').value;
            this.changeFigures(value);
        });
        const powerLight = document.getElementById('powerlight');
        powerLight.addEventListener(
            'change',
            () => {
                this.LIGHT.lumen = powerLight.value - 0;
            }
        );
        document.getElementById('color').addEventListener(
            'change',
            () => {
                const color = document.getElementById('color').value;
                this.figure.polygons.forEach(poly => {
                    poly.color = poly.hexToRgb(color);
                });
                }
            );
        document.getElementById('isPolygons').addEventListener(
            'click',
            () => this.isPolygons = !this.isPolygons
        );
        document.getElementById('isEdges').addEventListener(
            'click',
            () => this.isEdges = !this.isEdges
        );
        document.getElementById('isPoints').addEventListener(
            'click',
            () => this.isPoints = !this.isPoints
        );
    }

    //выбор фигуры
    changeFigures(value) {
        switch (value) {
            case "empty":
                break;
            case "cone":
                this.figure = (new Figure).cone();
                break;
            case "cube":
                this.figure = (new Figure).cube();
                break;
            case "twosheetedhyperboloid":
                this.figure = (new Figure).twosheetedhyperboloid();
                break;
            case "onesheetedhyperboloid":
                this.figure = (new Figure).onesheetedhyperboloid();
                break;
            case "ellipsoid":
                this.figure = (new Figure).ellipsoid();
                break;
            case "ring":
                this.figure = (new Figure).ring();
                break;
            case "sphere":
                this.figure = (new Figure).sphera();
                break;
            case "cylinder":
                this.figure = (new Figure).cylinder();
                break;
            case "paraboliccylinder":
                this.figure = (new Figure).paraboliccylinder();
                break;
            case "hyperboliccylinder":
                this.figure = (new Figure).hyperboliccylinder();
                break;
            case "hyperbolicparaboloid":
                this.figure = (new Figure).hyperbolicparaboloid();
                break;
            case "ellipticalcylinder":
                this.figure = (new Figure).ellipticalcylinder();
                break;
            case "ellipticalparaboloid":
                this.figure = (new Figure).ellipticalparaboloid();
                break;
        }
    }

    keyDownHandler(event) {
        switch (event.keyCode) {
            case 65: //a влево
                this.figure.points.forEach(point => {
                    this.graph3D.move(-1, 0, 0, point);
                });
                break;
            case 68: //d вправо
                this.figure.points.forEach(point => {
                    this.graph3D.move(1, 0, 0, point);
                });
                break;
            case 87: //w вверх
                this.figure.points.forEach(point => {
                    this.graph3D.move(0, 1, 0, point);
                });
                break;
            case 83: //s вниз
                this.figure.points.forEach(point => {
                    this.graph3D.move(0, -1, 0, point);
                });
                break;
        }
    }

    //зум
    wheel(event) {
        const delta = (event.wheelDelta > 0) ? 1.1 : 0.9;
        this.figure.points.forEach(point => {
            this.graph3D.zoom(delta, point);
        });
    }

    //вращения
    mousemove(event) {
        const gradus = Math.PI / 180 / 4;
        if (this.canRotate) {
            this.figure.points.forEach(point => {
                this.graph3D.rotateOy((this.dx - event.offsetX) * gradus, point);
                this.graph3D.rotateOx((this.dy - event.offsetY) * gradus, point);
            });
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    mousedown() {
        this.canRotate = true;
    }

    mouseup() {
        this.canRotate = false;
    }

    render() {
        this.canvas.clear(this.colorClear);
        // рендер полигоны
        if (this.isPolygons) {
            const figure = this.figure;
            const polygons = figure.polygons;
            this.graph3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
            this.graph3D.calcDistance(figure, this.LIGHT, 'lumen');
            this.graph3D.sortByArtistAlgoritm(polygons);
            polygons.forEach(polygon => {
                const points = polygon.points.map(point => {
                    return {
                        x: this.graph3D.xs(figure.points[point]),
                        y: this.graph3D.ys(figure.points[point])
                    }
                });
                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.canvas.polygon(points, polygon.rgbToHex(r, g, b));
            });
        }
        if (this.isEdges) {
            this.figure.edges.forEach(edge => {
                const point1 = this.figure.points[edge.p1];
                const point2 = this.figure.points[edge.p2];
                this.canvas.line(
                    this.graph3D.xs(point1),
                    this.graph3D.ys(point1),
                    this.graph3D.xs(point2),
                    this.graph3D.ys(point2)
                );
            });
        }
        if (this.isPoints) {
            this.figure.points.forEach(point => {
                this.canvas.point(
                    this.graph3D.xs(point),
                    this.graph3D.ys(point),
                );
            });
        }

        this.animationCheckbox = document.getElementById('animationCheckbox');

        //обработчик события изменения состояния CheckBox
        this.animationCheckbox.addEventListener('change', () => {
            if (this.animationCheckbox.checked) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        });

    }

    startAnimation() {
        if (!this.animationRunning) {
            this.animationRunning = true;
            this.animLoop();
        }
    }

    stopAnimation() {
        this.animationRunning = false;
    }

    animLoop() {
        if (!this.animationRunning) {
            return;
        }

        //код анимации
        
        requestAnimFrame(this.animLoop.bind(this));

        
    }    
    animLoop() {
        if (!this.animationRunning || !this.animationCheckbox.checked) {
            return;
        }
    
        // Ваш код анимации
    
        requestAnimFrame(this.animLoop.bind(this));
    }
}