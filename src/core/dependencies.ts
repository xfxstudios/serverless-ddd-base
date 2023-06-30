import {GeneralService} from "./shared/services/GeneralServices";
import ResponseService from "./shared/services/ResponseService";
import {SmartLogger} from 'node_smart_logger';
import {RequestService} from "./shared/services/requestHelper/requestService";


export const _servGeneral=new GeneralService()
export const _servResponse=new ResponseService()
export const _servLog=new SmartLogger()
export const _servRequest=new RequestService()
