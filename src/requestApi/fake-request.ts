interface FakeRequestInterface {
    data?: object
    error: {message: string}
    effect?(arg1?: unknown, arg2?: unknown): void
}
export const fakeRequest = async({
    data = {},
    error = {message: "Error resolve data"},
    effect = () => {}
    }: FakeRequestInterface
    ) => {
    const random = Math.random() > 0.5
    return await new Promise((res, rej) => {
        setTimeout(() => {
            if(random) {
                rej(new Error(error.message))
                return
            } else {
                effect()
                res(data)
            }
        }, 2000)
    })
}