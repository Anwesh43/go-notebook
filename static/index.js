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
