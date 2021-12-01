const codes = document.querySelectorAll('.highlight');
codes.forEach((code) => {
    var div = document.createElement('div');
    var button = document.createElement('button');
    div.className = 'code-header';
    button.className = 'copy-code-button';
    button.ariaLabel = "Copy code to clipboard"
    div.appendChild(button);
    code.parentNode.insertBefore(div, code);

    const text = code.querySelector('.rouge-code').innerText;

    button.addEventListener('click', () => {
        window.navigator.clipboard.writeText(text);
        button.classList.add('copied');

        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    });
});

// const codeBlocks = document.querySelectorAll('.rouge-code');
// const copyCodeButtons = document.querySelectorAll('.copy-code-button');
// console.log(codeBlocks)
// copyCodeButtons.forEach((copyCodeButton, index) => {
//     const code = codeBlocks[index].innerText;

//     copyCodeButton.addEventListener('click', () => {
//         window.navigator.clipboard.writeText(code);
//         copyCodeButton.classList.add('copied');

//         setTimeout(() => {
//             copyCodeButton.classList.remove('copied');
//         }, 2000);
//     });
// });
