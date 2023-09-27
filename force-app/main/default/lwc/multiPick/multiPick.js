import { LightningElement, api, track } from 'lwc';
import getValues from '@salesforce/apex/MultiSelectController.getValues';

export default class MultiPick extends LightningElement {
    @api mapOfObjectsAndFields = {"Account":["Name","Id"], "Contact":["LastName", "Id"]};
    @api selectedItem;
    @track listValues;
    errors;
    placeHolder = 'Input key words';
    selectedValues;


    // renderedCallback() { 
        
    // }


    handleSearch(event) {
       this.selectedItem = event.target.value;
       const container = this.template.querySelector('.values');
       container.style = "display:block";

       getValues({searckKeyWords:this.selectedItem, objectsAndFieldForSearch: JSON.stringify(this.mapOfObjectsAndFields)}).then(response => {
            this.listValues = JSON.stringify(response);
            console.log(JSON.stringify(this.listValues));
        }).catch(error => {
            this.errors = error;
            console.log('Error: ' + error.body.message);
        });
    }

    handleSelect(event) {
        this.selectedValues = event.target.value;
    }

}