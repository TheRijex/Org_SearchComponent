import { LightningElement, api } from 'lwc';
import getValues from '@salesforce/apex/MultiSelectController.getValues';

export default class MultiPick extends LightningElement {
    @api mapOfObjectsAndFields;
    @api selectedItem;
    listValues;
    errors;
    placeHolder = 'Input key words';
    selectedValues;

    //connectedCallback() {}

    // renderedCallback() {
        // this.listValues.forEach(element => {
        //     //заполнение li или переделать через цикл в template
        // Account(Name, Id), Contact(FirstName,LastName,Id), Opportunity(Id, Name)
        // });
    // }


    handleSearch(event) {
       this.selectedItem = event.target.value;
       const container = this.template.querySelector('.values');
       container.style = "display:block";

       getValues({searckKeyWords:this.selectedItem, objectsAndFieldForSearch: this.mapOfObjectsAndFields}).then(response => {
            this.listValues = response;
        }).catch(error => {
            this.errors = error;
            console.log('Error: ' + error.body.message);
        });
    }
    handleSelect(event) {
        this.selectedValues = event.target.value;
    }

}