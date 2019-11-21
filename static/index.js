const socket = io.connect('http://localhost:8000/ns1')
class CodeInput {

    constructor() {
        this.initInput()
    }

    initInput() {
        this.ci = `code_input_${new Date().getTime()}`
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
        this.text = document.createElement('div')
        this.text.style.display = "none"
        this.text.className = "output"
        document.body.appendChild(this.text)
    }

    handleInput() {
        this.input.onblur = () => {
            this.removeResult()
        }

        this.input.onfocus = () => {
            this.removeResult()
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

    showResult(text) {
        this.text.style.display = 'block'
        this.text.innerHTML = text
        this.textShown = true
    }

    removeResult() {
        if (this.textShown) {
            this.text.style.display = 'none'
            this.textShown = false
        }
    }

    handleClick() {
        this.executeButton.onclick = () => {
            socket.emit('execute', {
                ci : this.ci,
                content : this.input.value,
                lang : 'GO_LANG_COMMAND'
            })
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

const init = () => {
    const addBtn = AddButton.create()
    socket.on('result', (data) => {
        const {ci, status} = data
        addBtn.codeInputs.filter((codeInput) => codeInput.ci == ci).forEach((codeInput) => {
            if (status == "success") {
                codeInput.showResult(data.output)
            } else {
                codeInput.showResult(JSON.stringify(data.err))
            }
        })
    })
}

init()
