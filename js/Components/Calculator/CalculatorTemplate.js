Template.prototype.calculatorTemplate = () => `
    <div class="calcInputs">
        <div class="getValueInputs">
            <textarea placeholder="0" class="number" id="firstNumber"></textarea>
            <textarea placeholder="0" class="number" id="secondNumber"></textarea>
        </div>

        <div class="results">
            <textarea  class="resultNumber" id="resultNumber"></textarea>
            <button id="point"> point </button>
            <textarea  class="resultNumber" id="resultPoint"></textarea>
        </div>
    </div>
    <div class="operandButtons">
        <button class="operands" data-operand="add"> Add </button>
        <button class="operands" data-operand="sub"> Sub </button>
        <button class="operands" data-operand="mult"> Mult </button>
        <button class="operands" data-operand="divide"> Div </button>
        <button class="operands" data-operand="prod"> Prod </button>
        <button class="operands" data-operand="zero"> Zero </button>
        <button class="operands" data-operand="one"> One </button>
        <button class="operands" data-operand="pow"> Pow </button>
    </div>
`;