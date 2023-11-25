import Router from 'express'
import { Controller } from '../controller/controller'
import { newReviewInputValidators } from '../utils/middlewear'

const router = Router()

export const routesWrapper = (controller: Controller) =>{
    router.post('/', newReviewInputValidators ,
        controller.handleValidationErrors,
        controller.addNewReview)

    router.post('/:id', controller.handleNotAllowedRequest)

    router.get('/', controller.getRandomReviews)
    router.get('/:productId', controller.getReviewsByProductId)

    return router
}