acid = document.getElementById('ACId');
acid.addEventListener("beforeinput", formatInput);

const searchEvent = new Event("acid_search");

//                     1 1
// 0 1 2 3 4 5 6 7 8 9 0 1
// 0 | 1 2 | 3 4 | 5 6 7 8
dataCursorConv = [0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9];
dataCursorInv = [0, 1.5, 3, 4.5, 6, 7.5, 9, 10, 11, 12];

function cancelEvt(evt) {
    if (typeof evt.cancelable !== "boolean" || evt.cancelable) {
        evt.preventDefault();
    } else {
        console.warn(`The following event couldn't be canceled:`);
        console.dir(evt);
    }
}

function moveCursor(input, pos) {
    input.selectionStart = pos;
    input.selectionEnd = pos;
}

function moveCursorForward(input, pos) {
    moveCursor(input, Math.ceil(dataCursorInv[pos]));
}

function moveCursorBackward(input, pos) {
    moveCursor(input, Math.floor(dataCursorInv[pos]));
}

function setInputData(input, data) {
    input.value = data.slice(0, 1) 
        + "|" + data.slice(1, 3)
        + "|" + data.slice(3, 5)
        + "|" + data.slice(5, 9);
}

function getInputData(input) {
    return input.value.slice(0, 1)
        + input.value.slice(2, 4)
        + input.value.slice(5, 7)
        + input.value.slice(8, 12); 
}

function formatInput(evt) {
    input = evt.target;
    cursor = input.selectionStart;

    cancelEvt(evt);

    inputData = getInputData(input);
    dataCursor = dataCursorConv[cursor];

    if (evt.data != null && cursor < 12){
        data = evt.data.toUpperCase().replace(/[^A-Z*]+/g, '');
        data = data.slice(0, 9 - dataCursor);

        inputData = inputData.slice(0, dataCursor) + data + inputData.slice(dataCursor + data.length);
        inputData = inputData.slice(0, 9);
        setInputData(input, inputData);

        newPosCursor = dataCursor + data.length;
        moveCursorForward(input, newPosCursor);
        input.dispatchEvent(searchEvent);
        return;
    }

    if (cursor == input.selectionEnd){
        if (evt.inputType == "deleteContentBackward" && dataCursor > 0) {
            inputData = inputData.slice(0, dataCursor - 1) + "*" + inputData.slice(dataCursor);
            setInputData(input, inputData);
            moveCursorBackward(input, dataCursor - 1);
        } else if (evt.inputType == "deleteContentForward" && dataCursor < 9) {
            inputData = inputData.slice(0, dataCursor) + "*" + inputData.slice(dataCursor + 1);
            setInputData(input, inputData);
            moveCursorBackward(input, dataCursor);
        } 
    } else {
        deleteInputTypes = [
            "deleteContentBackward",
            "deleteContentForward",
            "deleteContent",
            "deleteByDrag",
            "deleteByCut",
        ]
        selected = dataCursorConv[input.selectionEnd] - dataCursor;
        if (deleteInputTypes.includes(evt.inputType)) {
            inputData = inputData.slice(0, dataCursor) + "*".repeat(selected) + inputData.slice(dataCursor + selected);
            setInputData(input, inputData);
            moveCursorBackward(input, dataCursor);
        }
    }

    input.dispatchEvent(searchEvent);
}
