import { FormGroup, ValidationErrors } from "@angular/forms";


export class FormUtils {

    static  cuitPattern = '/^\d{2}-?\d{8}-?\d$/';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
    static phonePattern = '^\d{8,15}$';
    

    static getTextError = ( errors : ValidationErrors ) : string | null =>  {
        for( const key of Object.keys(errors) ){
            switch( key ){
                case 'required':
                    return 'Este campo es requerido.';

                case 'minlength':
                    return `Debe contener como minimo ${ errors['minlength'].requiredLength } caracteres.`;

                case 'min':
                    return `El valor minimo es de ${ errors['min'].min }.`;

                case 'email':
                    return `El contenido del campo no luce como un email.`;
                
                case 'pattern':
                    if( errors['pattern'].requiredPattern === FormUtils.notOnlySpacesPattern ) {
                        return `El campo no puede contener espacios.`;
                    }
                    // Agregado debido a que la funcionalidad del validator.email con que tenga un @ lo acepta.
                    else if( errors['pattern'].requiredPattern === FormUtils.emailPattern ){
                        return `El contenido del campo no luce como un email.`;
                    }
                    else if( errors['pattern'].requiredPattern === FormUtils.cuitPattern ){
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