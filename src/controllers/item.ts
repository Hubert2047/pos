import type { NextFunction } from "express"

export async function postRecords(req: any, res: Response, next: NextFunction) {
    try {
        const pet = req.body
        const { account } = req.user
        pet.account = account

        await Pet.create(pet)

        return res.status(200).json({
            error: false,
            message: 'item added successfully',
        })
    } catch (error: any) {
        if (error.code === 11000) {
            return next(
                customError?.({
                    msg: ErrorText.DuplicateData,
                    status: 'failed',
                    statusCode: 403,
                    data: error.keyValue,
                })
            )
        }
        return Err?.(next, error)
    }
}

export async function deleteRecords(req: any, res: Response, next: NextFunction) {
    try {
        const { account } = req.user
        const result = await Pet.deleteOne({
            account: account,
        })

        return res.status(200).json({
            error: false,
            msg: `${result.deletedCount} item deleted successfully`,
        })
    } catch (error: any) {
        return Err(next, error)
    }
}