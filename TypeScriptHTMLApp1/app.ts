let form: HTMLFormElement = <HTMLFormElement>document.forms[0];
let fieldset: HTMLFieldSetElement = <HTMLFieldSetElement>form.children[0];
let action: string;
let key: number;
let message: string;
let textarea: HTMLTextAreaElement = document.createElement('textarea');
let button: HTMLButtonElement = form.elements['button'];

function setKeyForm(): void {
    action = form.elements['action'].value;

    fieldset.removeChild(fieldset.childNodes[3]);
    fieldset.removeChild(fieldset.childNodes[3]);
    fieldset.removeChild(fieldset.childNodes[3]);
    fieldset.removeChild(fieldset.childNodes[5]);

    setAttributes(form.elements['action'], {
        type: 'text', name: 'key',
        placeholder: 'Your key ...', value: ''
    });
    button.setAttribute('onclick', 'setMessageForm()');
    fieldset.children[0].innerHTML = "Please enter your key";
}

function setMessageForm(): void {
    key = +(form.elements['key'].value);
    setAttributes(textarea, {
        name: 'message', cols: 40, rows: 7, style: 'margin: auto', placeholder: 'Your message ...'
    });
    fieldset.insertBefore(textarea, fieldset.children[1]);
    fieldset.removeChild(form.elements['key']);

    form.elements['button'].setAttribute('onclick', 'setAnswer()');
}

function setAnswer(): void {
    message = form.elements['message'].value;
    form.elements['message'].value = getAnswer();
    form.elements['message'].disabled = true;
}

function getAnswer(): number[] | string {
    let tmp: number;
    let resultArr: number[] = [], resultStr: string = '';

    if (action == 'encrypt') {
        for (var i = 0; i < message.length; i++) {
            tmp = message.charCodeAt(i);
            resultArr.push(tmp ^ key);
        }
    }
    else if (action == 'decrypt') {
        let tmpStrArr: string[] = message.split(',');
        let tmpNumArr: number[] = [];

        for (let i = 0; i < tmpStrArr.length; i++) {
            tmpNumArr[i] = +(tmpStrArr[i]);
        }

        for (var j = 0; j < tmpNumArr.length; j++) {
            tmp = tmpNumArr[j] ^ key;
            resultStr += String.fromCharCode(tmp);
        }
    }
    return resultStr ? resultStr : resultArr;
}

function setAttributes(node, attrs: Object): void {
    for (let key in attrs) {
        node.setAttribute(key, attrs[key]);
    }
}