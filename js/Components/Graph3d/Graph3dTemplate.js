Template.prototype.graph3DTemplate = () => `
    <div class="settings">
        <label class="text">
            <input class="check" type="checkbox" checked=true  id="isPoints"></input>
        points</label>
        <label class="text">
            <input class="check" type="checkbox" id="isEdges"></input>
        edges</label>
        <label class="text">
            <input class="check" type="checkbox" checked=true id="isPolygons">polygons</input>
        </label>
        <label class="text">
        <input class="check" type="checkbox" id="animationCheckbox">animation</input>
        </label>
        <select id="selectFigure" class="figures">
            <option value="empty">Выбор фигур</option>
            <option value="cube">Куб</option>
            <option value="sphere">Сфера</option>
            <option value="ellipsoid">Эллипсоид</option>
            <option value="cone">Конус</option>
            <option value="cylinder">Цилиндр</option>
            <option value="ring">Пончик</option>
            <option value="ellipticalparaboloid">Эллиптический параболоид</option>
            <option value="hyperbolicparaboloid">Седло</option>
            <option value="ellipticalcylinder">Эллиптический цилиндр</option>
            <option value="paraboliccylinder">Параболический цилиндр</option>
            <option value="hyperboliccylinder">Гиперболический цилиндр</option>
            <option value="onesheetedhyperboloid">Однополостной гиперболоид</option>
            <option value="twosheetedhyperboloid">Двуполостной гиперболоид</option>
        </select>
        <input type="color" id="color" placeholder="color" class="color" value="#daa2f2">
        <input class="light" type="range" min="20000" max="57000" value="powerlight" id="powerlight">
    </div>
    <div align='center'>
        <canvas id='graphics'></canvas>
    </div>
`;