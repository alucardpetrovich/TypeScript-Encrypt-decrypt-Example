var form = document.forms[0];
var fieldset = form.children[0];
var action;
var key;
var message;
var textarea = document.createElement('textarea');
var button = form.elements['button'];
function setKeyForm() {
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
function setMessageForm() {
    key = +(form.elements['key'].value);
    setAttributes(textarea, {
        name: 'message', cols: 40, rows: 7, style: 'margin: auto', placeholder: 'Your message ...'
    });
    fieldset.insertBefore(textarea, fieldset.children[1]);
    fieldset.removeChild(form.elements['key']);
    form.elements['button'].setAttribute('onclick', 'setAnswer()');
}
function setAnswer() {
    message = form.elements['message'].value;
    form.elements['message'].value = getAnswer();
    form.elements['message'].disabled = true;
}
function getAnswer() {
    var tmp;
    var resultArr = [], resultStr = '';
    if (action == 'encrypt') {
        for (var i = 0; i < message.length; i++) {
            tmp = message.charCodeAt(i);
            resultArr.push(tmp ^ key);
        }
    }
    else if (action == 'decrypt') {
        var tmpStrArr = message.split(',');
        var tmpNumArr = [];
        for (var i_1 = 0; i_1 < tmpStrArr.length; i_1++) {
            tmpNumArr[i_1] = +(tmpStrArr[i_1]);
        }
        for (var j = 0; j < tmpNumArr.length; j++) {
            tmp = tmpNumArr[j] ^ key;
            resultStr += String.fromCharCode(tmp);
        }
    }
    return resultStr ? resultStr : resultArr;
}
function setAttributes(node, attrs) {
    for (var key_1 in attrs) {
        node.setAttribute(key_1, attrs[key_1]);
    }
}
//# sourceMappingURL=app.js.map