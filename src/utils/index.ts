export function customError({
    msg,
    status,
    statusCode,
    data = {},
}: {
    msg: string
    status: string
    statusCode: number
    data?: any
}) {
    console.log("error", msg)
    const err: any = new Error(msg)
    err.status = status
    err.statusCode = statusCode
    err.data = data
    return err
}
export function Err(next: any, error: any) {
    console.log('err', error.message)
    return next(
        customError({
            msg: error.message,
            status: 'failed',
            statusCode: 500,
        })
    )
}