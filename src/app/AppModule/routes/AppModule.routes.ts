import {Router} from 'express'
import {AppModuleController} from '../infrastructure/AppModule.controller'


const controller=new AppModuleController()
const route=Router()
const _basePath=`/app`


///////////////////////////////////////////
///////////// SECURITY ROUTES /////////////
///////////////////////////////////////////

route.get(`${_basePath}/test`,[], controller.helloApp)

module.exports=route
