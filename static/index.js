const byId = (id) => {
    return document.getElementById(id)
}
const socket = io.connect('http://localhost:8000/ns1')
const textBox = byId('t1')
textBox.onkeydown = (e) => {
    const value = textBox.value
    if (value.length % 10 == 0 && value.length != 0) {
        console.log(value)
        socket.emit('newWords', value)
    }
}

class CodeInput {

    constructor() {
        this.initInput()
    }

    initInput() {
        this.input = document.createElement('textarea')
        this.input.cols = 200
        this.input.rows = 10
        document.body.appendChild(this.input)
        this.executeButton = document.createElement('button')
        this.button.innerHTML = "EXECUTE"
        document.body.appendChild(this.executeButton)
    }

    handleInput() {
        this.input.onblur = () => {
            console.log(this.input.value)
        }

        this.input.onkeydown = (event) => {
            if (event.keyCode == 13) {
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
        document.body.appendChild(this.addBtn)
    }

    handleClick() {
        this.addBtn.onclick = () => {
            this.codeInputs.push(CodeInput.create())
        }
    }

    static init() {
        const addBtn = new AddButton()
        addBtn.handleClick()
        return addBtn
    }
}
