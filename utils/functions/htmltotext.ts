export const htmltotext = (value: string) => {
    return value?.replace(/<([A-z]+)([^>^/]*)>\s*<\/\1>/gim, '')
}

export const HtmlToPlainText = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html

    const plainText = div.textContent || div.innerText

    return plainText
}

export const plainTextWithSpaces = (html: string) => {
    // Create a temporary div element to parse the HTML string
    // const div = document.createElement('div')
    // div.innerHTML = html

    // // Extract the text content from the div, fallback to an empty string
    // let plainText = div.textContent || div.innerText || ''

    // // Remove all non-breaking spaces, extra spaces, and trim the result
    // plainText = plainText.replace(/[\s\n\r]+/g, ' ').trim() // Collapse all white spaces into a single space
    const div = document.createElement('div')
    div.innerHTML = html

    // Extract the text content from the div, fallback to an empty string
    let plainText = div.textContent || div.innerText || ''

    // Replace multiple spaces, newlines, and non-breaking spaces with a single space
    plainText = plainText.replace(/\s+/g, ' ').trim() // Remove excess spaces/newlines
    plainText = plainText.replace(/&nbsp;/g, ' ') // Replace non-breaking spaces (&nbsp;)

    return plainText

    return plainText
}
