export default function Zone () {
    let message;
    const display = false;
    if(display) {
        message = <h1>This is message 1</h1>;
    } else {
        message = <h1>This is message 2</h1>;
    }
    return message;
}