!function () {
    /** 
     * Variables 
    ------------------------------------------------------------------------*/
    var formRegister = document.registerForm,   //Referencia al elemento por el Name
        formElements = formRegister.elements;   //Array de elementos que contiene la variable anterior

    /** 
    * Funciones 
    ------------------------------------------------------------------------*/

    /**
     * Valida inputs, datos vacíos o datos inválidos
     * @return boolean
     */
    function validateInputs() {
        // Expresion Regular: Valida unicamente los caracteres numeros
        const phoneRegExp = new RegExp(/^[0-9]*$/, 'g')
        // Expresion Regular: Valida que el texto tenga minimo 6 caracteres
        const passwordRegExp = new RegExp(/\w{6,}/)
        
        //Recorrido de elementos del formulario
        for (let i = 0; i < formElements.length; i++) {
            //Valida el tipo de inputs
            if (formElements[i].type == "text" || formElements[i].type == "email" || formElements[i].type == "password") {
                //Valida el valor de cada uno de los elementos (VACIO)
                if(formElements[i].value === ''){
                    formElements[i].className += ' error';
                    return false;
                }else{
                    formElements[i].className.replace('error', ' ');
                }
            }

        }

        // Validar que la contrasena tenga minimo 6 caracteres
        if(!passwordRegExp.test(formElements.password.value)){
            formElements.password.value = "";
            formElements.password.className += ' error';
            return false;
        }

        //Validar la coincidencia de las contraseñas
        if(formElements.password.value !== formElements.repeatPass.value ){
            formElements.password.value = "";
            formElements.repeatPass.value = "";
            formElements.password.className += ' error';
            formElements.repeatPass.className += ' error'
            return false;
        }else{
            formElements.password.className.replace('error', '');
            formElements.repeatPass.className.replace('error', '');
        }

        // Valida si el input de telefono sea numerico
        if(!phoneRegExp.test(formElements.phone.value)) {
            formElements.phone.value = "";
            formElements.phone.className += ' error';
            return false;
        } 

        return true;
    }

    /**
     * Validac radios, checked
     * @return boolean
     */
    function validateRadios() {
        var optionsGener = document.getElementsByName('gender'), //Array de elementos con este name 
            result = false;
        for (let i = 0; i < formElements.length; i++) {
            //Valida que sea de tipo Radio
            if(formElements[i].type == 'radio' && formElements[i].name == "gender"){
                //Recorre los radio con el name gender
                for(var j = 0; j < optionsGener.length; j++){
                    //Valida que haya al menos uno seleccionado
                    if(optionsGener[j].checked == true){
                        result = true;
                    }
                }
                //Valida si existan radios seleccionados
                if(result === false){
                    formElements[i].parentElement.className += ' error';
                    return false;
                }else{ 
                    formElements[i].parentElement.className.replace("error","");
                    return true;
                }
            }
        }
    }

    /**
     * Valida checkbox, checked
     * @return boolean
     */
    function validateCheckbox() {
        var result = false;
        for (let i = 0; i < formElements.length; i++) {
            if(formElements[i].type == 'checkbox' && formElements[i].name == "terms"){
                //Valida que el checkbox esté chequeado
                if(formElements[i].checked == true){
                    result = true;
                }
                if(result === false){
                    formElements[i].parentElement.className += ' error';
                    return false;
                }else{ 
                    formElements[i].parentElement.className.replace('error','');
                    return true;
                }
            }
        }
    }

    /** 
     * Estado focus de inputs
     */
    function focusInputs() {
        /* 
            {this}: HTMLElement - Referencia al elemento en el que se ejectura el evento focus
            {parentElement}: HTMLElement - Referencia al elemento HTML contenedor del elemento actual
            {children}: Array - Todos los elementos HTML que estan conetenidos en el elemento padre
        */
        this.parentElement.children[1].className += " active";                                                       //Concatena al contenido del atributo class del input 
        this.parentElement.children[0].className = this.parentElement.children[0].className.replace('error', ' ');  //Reemeplaza la clase existente por un blankspace (Si existe)
    }


    /**
     * Estado de blur de inputs
     */
    function blurInputs() {
        //Valida que el input no esté vacío
        if (this.value <= 0) {
            this.parentElement.children[1].className = "label";     //Cambia todo el contenido del atributo class del input
            this.parentElement.children[0].className += " error";   //Concatena texto al atributo class del input 
        }
    }


    /** 
     * Eventos 
    ------------------------------------------------------------------------*/

    //Recorrido de elementos del formulario
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type == "text" || formElements[i].type == "email" || formElements[i].type == "password") {
            formElements[i].addEventListener('focus', focusInputs);   //Evento Focus 
            formElements[i].addEventListener('blur', blurInputs);       //Evento Blur
        }
    }

    /**
     * Evento Submit del formulario
     */
    formRegister.addEventListener("submit", (e) => {
        //Validacion de inputs 
        if (!validateInputs()) {
            console.log("Inputs errors");
            e.preventDefault();
            return
        } else if (!validateRadios()) {
            console.log("Radios error");
            e.preventDefault();
            return
        } else if (!validateCheckbox()) {
            console.log("Check error");
            e.preventDefault();
            return
        }
        console.log('Form enviado Exitosamente')
        e.preventDefault();
    });

}();