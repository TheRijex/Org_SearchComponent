import { LightningElement, api, track } from 'lwc';
import getValues from '@salesforce/apex/MultiSelectController.getValues';

export default class MultiPick extends LightningElement {
    @api mapOfObjectsAndFields = {"Account":["Name","Id"], "Contact":["LastName", "Id"]};
    @api selectedItem;
    @track listValues;
    @track selectedValues = '';
    errors;
    placeHolder = 'Input key words';
    


    // renderedCallback() {    
    // }


    handleSearch(event) {
       this.selectedItem = event.target.value;
       const container = this.template.querySelector('.values');
       container.style = "display:block";

       getValues({searchKeyWords:this.selectedItem, objectsAndFieldForSearch: JSON.stringify(this.mapOfObjectsAndFields)}).then(response => {
            //this.listValues = JSON.stringify(response);
            this.listValues =''
            this.listValues = Object.keys(response).map(key => ({ Id: key, Name: response[key] }));
            console.log(JSON.stringify(this.listValues));
        }).catch(error => {
            this.errors = error;
            container.style = "display:none";
            this.listValues = false;
            console.log('Error: ' + error.body.message);
        });
    }

    handleSelect(event) {
            this.selectedValues = this.selectedValues +' ' + event.target.dataset.id;
            //const container = this.template.querySelector('.values');
            //this.listValues = null;
    }

}