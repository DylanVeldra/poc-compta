export async function writeIntoClipboard(text: string) {
    if (!navigator.clipboard || !window.isSecureContext) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise<void>((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
    return navigator.clipboard.writeText(text);
}
