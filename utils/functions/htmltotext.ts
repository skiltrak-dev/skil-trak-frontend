export const htmltotext = (value: string) => {
    return value?.replace(/<([A-z]+)([^>^/]*)>\s*<\/\1>/gim, '')
}

export const HtmlToPlainText = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html

    const plainText = div.textContent || div.innerText

    return plainText
}
