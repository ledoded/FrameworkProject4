window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax_container');
        const city = document.querySelector('.images-parallax_city');
        const supra = document.querySelector('.images-parallax_supra');
        const girl1 = document.querySelector('.images-parallax_girl1');
        const girl2 = document.querySelector('.images-parallax_girl2');

        const forCity = 50;
        const forSupra = 20;
        const forGirls = 10;

        const speed = 0.06;

        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;


        function setMouseParallaxStyle(){
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);


            city.style.cssText = `transform: translate(${positionX / forCity}%,${positionY / forCity}%);`;
            supra.style.cssText = `transform: translate(${positionX / forSupra}%,${positionY / forSupra}%);`;
            girl1.style.cssText = `transform: translate(${positionX / forGirls}%,${positionY / forGirls}%);`;
            girl2.style.cssText = `transform: translate(${positionX / forGirls}%,${positionY / forGirls}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function (e) {
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
            //console.log(girl1);
        });
    }
}