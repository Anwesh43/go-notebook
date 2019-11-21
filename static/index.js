const socket = io.connect('http://localhost:8000/ns1')
class CodeInput {

    constructor() {
        this.initInput()
    }

    initInput() {
        this.input = document.createElement('textarea')
        this.input.cols = 150
        this.input.rows = 2
        this.input.className = 'tarea'
        this.input.style.float = 'top'
        document.body.appendChild(this.input)
        this.executeButton = document.createElement('button')
        this.executeButton.innerHTML = "EXECUTE"
        this.executeButton.className = 'execbtn'
        this.executeButton.style.float = 'top'
        document.body.appendChild(this.executeButton)
    }

    handleInput() {
        this.input.onblur = () => {
            console.log(this.input.value)
        }

        this.input.onkeydown = (event) => {
            if (event.keyCode == 13) {
                const text = this.input.value
                const l = text.length
                const ch = text.substring(0, l).charAt(l - 1)
                if (ch == '{') {
                    this.input.value += '\n\n}'
                }
                this.input.rows = parseInt(this.input.rows) + 1
            }
        }
    }

    handleClick() {
        this.executeButton.onclick = () => {
            alert('Started executing current code')
        }
    }

    static create() {
        const codeInput = new CodeInput()
        codeInput.handleInput()
        codeInput.handleClick()
        return codeInput
    }
}

class AddButton {

    constructor() {
        this.codeInputs = []
        this.initButton()
    }

    initButton() {
        this.addBtn = document.createElement('button')
        this.addBtn.innerHTML = "ADD"
        this.addBtn.className = 'addbtn'
        document.body.appendChild(this.addBtn)
    }

    handleClick() {
        this.addBtn.onclick = () => {
            this.codeInputs.push(CodeInput.create())
        }
    }

    static create() {
        const addBtn = new AddButton()
        addBtn.handleClick()
        return addBtn
    }
}

AddButton.create()
