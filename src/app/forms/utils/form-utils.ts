import { FormGroup, ValidationErrors } from "@angular/forms";


export class FormUtils {

    static cuitPattern = /^(20|23|24|27|30|33|34)-?\d{8}-?\d$/;
    static emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    static notOnlySpacesPattern = /^[a-zA-Z0-9]+$/;
    static phonePattern = /^(?:\+?54)?\s?(?:9)?\s?(?:0?[1-9]\d{1,4})\s?(?:15)?\s?(\d{6,8})$/;
    

    static getTextError = ( errors : ValidationErrors ) : string | null =>  {
        for( const key of Object.keys(errors) ){
            switch( key ){
                case 'required':
                    return 'Este campo es requerido.';

                case 'maxlength':
                    return `Debe contener como maximo ${ errors['maxlength'].requiredLength } caracteres.`;

                case 'minlength':
                    return `Debe contener como minimo ${ errors['minlength'].requiredLength } caracteres.`;

                case 'min':
                    return `El valor minimo es de ${ errors['min'].min }.`;

                case 'max':
                    return `El valor maximo es de ${ errors['max'].max }.`;
                
                case 'email':
                    return `El contenido del campo no luce como un email.`;
                
                case 'pattern':
                    const errorPatternStr = errors['pattern'].requiredPattern.toString();
                    if( errorPatternStr === FormUtils.notOnlySpacesPattern.toString() ) {
                        return `El campo no puede contener espacios.`;
                    }
                    else if( errorPatternStr === FormUtils.phonePattern.toString() ){
                        return `El contenido no luce como un numero telefonico.`;
                    }
                    else if( errorPatternStr === FormUtils.emailPattern.toString() ){
                        return `El contenido del campo no luce como un email.`;
                    }
                    else if( errorPatternStr === FormUtils.cuitPattern.toString() ){
                        return `El contenido del campo no luce como un CUIT 'XX-XXXXXXXX-X' o 'XXXXXXXXXXX'.`;
                    }   
                    return `Error de validación personalizada.`;    
                default:
                    return `Error no controlado.`;
            }
        }

        return null;
    }

    static getFieldError= ( form : FormGroup ,  fieldName : string ) : string | null =>{
        if ( !form.controls[fieldName]) return null;

        const errors = form.controls[fieldName].errors ?? {};

        return FormUtils.getTextError(errors);

    }
      
    static isValidField = ( form : FormGroup , fieldName : string ) : boolean | null => {
        console.log(form.controls[fieldName].touched);
        return  ( !!form.controls[fieldName].errors && form.controls[fieldName].touched );
    }
}