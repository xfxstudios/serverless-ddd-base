
import {validate} from 'class-validator';


export class GeneralService {

    private saltRounds: number

    constructor() {
        this.saltRounds=10;
    }


    /**
     * 
     * @param pwd 
     * @returns 
     */
    async formatQueryRespons(query: any,avoitParams: object|null) {

        query.map((item: any) => {
            console.log(item)
        })

    }


    /**
     * Parsea los datos de las respuesta del ORM Sequelize
     * @param ORM_Response 
     * @returns Object
     */
    async parseOrmResponse(ORM_Response: any): Promise<any> {
        const response=JSON.parse(JSON.stringify(ORM_Response));
        return response
    }


    /**
     * 
     * @param str 
     * @returns 
     */
    stringToLowCase(str: string): string {
        return str.toLowerCase();
    }


    /**
     * 
     * @param str 
     * @returns 
     */
    trimStr(str: any) {
        return str.trim();
    }


    /**
     * 
     * @returns 
     */
    apiKeyGenerator() {

        const hash=process.env.APIkEY_HASH!
        const _data=Buffer.from(hash,'utf-8');
        return _data.toString('base64')

    }

    async _validateBody(data: any) {
        const _validate=await validate(data);
        let _out:any=[]
        if(_validate.length>0) {
            _out=_validate.map((item: any) => {
                return {
                    property: item.property,
                    errors: item.constraints
                }
            })
        }
        return _out
    }

    async generateOtpCode(start=0,end=999999): Promise<any> {

        return new Promise((resolve,reject) => {
            try {
                const verificationCode=Math.floor(100000+Math.random()*900000).toString()
                resolve(verificationCode)
            } catch(e) {
                reject(false)
            }
        })

    }

    /**
     * 
     * @param txt 
     * @param values[] 
     * Example: _replace("Username :? is status :?", ["jhonDoe","active"])
     * @returns 
     */
    _replace(txt: string,values: any[]) {
        let _out=txt
        values.forEach((item) => {
            _out=_out.replace(":?",item)
        })
        return _out
    }


    generateAccount(): string {
        let accountA=Date.now()
        let result='';
        const digits='0123456789'
        for(let i=0;i<4;i++) {
            result+=digits.charAt(Math.floor(Math.random()*digits.length));
        }
        return `${result}${accountA}`
    }

    generateRandomString(cadena: string): string {
        let result='';
        const charactersA='0123456789'
        const characters=cadena+charactersA
        for(let i=0;i<6;i++) {
            result+=characters.charAt(Math.floor(Math.random()*characters.length));
        }
        return result;
    }


    




}
