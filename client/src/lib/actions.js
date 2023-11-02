const outputEl = document.querySelector('#output');

export function render(hbsFunction, data) {
    outputEl.innerHTML = hbsFunction(data);
}
