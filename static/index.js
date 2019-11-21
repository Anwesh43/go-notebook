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
        this.rows = 0
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
}
