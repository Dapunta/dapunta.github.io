function handleKeyDown(event) {
    if (event.key === "Enter") {

        var value = event.target.value;
        const boxTerminal = document.getElementById('body-terminal');
        
        const newLine = document.createElement('input');
        newLine.type = 'text';
        newLine.onkeydown = handleKeyDown;

        const prevInput = event.target;
        newLine.className = prevInput.className;
        newLine.id = prevInput.id;
        newLine.value = '';
        newLine.autocomplete = 'off';

        if (value === 'clear') {
            boxTerminal.innerHTML = `<input id="terminal-input" class="row-terminal-input" type="text" onkeydown="handleKeyDown(event)" autocomplete="off"></input>`;
            const newLine = document.getElementById('terminal-input');
            newLine.focus();
        }
        else {
            console.log(value);
            boxTerminal.appendChild(newLine);
            newLine.focus();
        }
    }
}