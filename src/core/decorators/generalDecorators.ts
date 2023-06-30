
//::::::::::::::::::::::::::::::::::::::::::::::
//:::::::: [ General uses Decorators ] :::::::::
//::::::::::::::::::::::::::::::::::::::::::::::

import {_servGeneral, _servResponse} from "../dependencies";

/**
 * Valid properties sended from DTOs
 * @param _flow // use case flow
 * @returns // decorated method
 */
export const ValidProperties=(_flow: string) => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod=descriptor.value;

  descriptor.value=async function(...args:any) {
    let _dto=args[0]
    let _result
    const _valid=await _servGeneral._validateBody(_dto)
    if(_valid.length>0) {

      args[0]['valid_error']=true
      args[0]['error_data']=_servResponse.response({
        error: true,
        code: 404,
        message: "Parametros invalidos",
        http: 400,
        flow: _flow,
        errors: _valid
      })
      _result=originalMethod.apply(this,args);

    } else {
      _result=originalMethod.apply(this,args);
    }
    return _result;
  };

  return descriptor;
};