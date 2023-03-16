export const blobToBase64 = (url: string) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
        const response = await fetch(url)
        const blob = await response.blob()
        const fileReader = new FileReader()
        fileReader.readAsDataURL(blob)
        fileReader.onloadend = () => {
            resolve(fileReader.result)
        }
    })
}