class CalculatorComponent extends Component {
    constructor(options) {
        super(options);

        this.calculator = new Calculator();
    }


    _addEventListeners() {
        const buttons = document.querySelectorAll('.operands');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.makeCalculate(button.dataset.operand));
        });
        document.getElementById('point').addEventListener('click', () => this.calculatePoint());
    }

    makeCalculate(operand) {
        const textA = document.getElementById('firstNumber');
        const textB = document.getElementById('secondNumber');
        const textC = document.getElementById('resultNumber');

        let a = this.calculator.toValue(textA.value);
        let b = this.calculator.toValue(textB.value);

        if (a && b) {
            if (operand == 'zero' || operand == 'one') {
                textC.value = this.calculator[operand](null, a).toString();
                return;
            }
            return textC.value = this.calculator[operand](a, b).toString();
        }
    }

    calculatePoint() {
        const textC = document.getElementById('resultNumber');
        const resultPoint = document.getElementById('resultPoint');

        if (resultPoint.value) {
            let point = this.calculator.toValue(resultPoint.value);
            let result = this.calculator.toValue(textC.value)
            return resultPoint.value = result.getValue(point);
        }
    }
}