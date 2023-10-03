import { LightningElement, api, track } from 'lwc';
import getValues from '@salesforce/apex/MultiSelectController.getValues';

export default class MultiPick extends LightningElement {
    @api mapOfObjectsAndFields = {"Account":["Name","Id"], "Contact":["LastName", "Id"]};
    @api selectedItem;
    @track listValues;
    @track selectedValues = [];
    @track errors;
    placeHolder = 'Input key words';

    handleSearch(event) {
       this.selectedItem = event.target.value;
       const container = this.template.querySelector('.values');
       container.style = "display:block";

       getValues({searchKeyWords:this.selectedItem, objectsAndFieldForSearch: JSON.stringify(this.mapOfObjectsAndFields)}).then(response => {
            this.listValues =''
            this.listValues = Object.keys(response).map(key => ({ Id: key, Name: response[key] }));
            this.errors = false;
        }).catch(error => {
            this.errors = error;
            container.style = "display:none";
            console.log('Error: ' + error.body.message);
        });
    }

    handleSelect(event) {
        let addIt = true;      
        this.selectedValues.forEach((element) => {
            if(element == event.target.dataset.id){
                addIt = false;
            }
        });
        if(addIt) {
            this.selectedValues.push(event.target.dataset.id);
        }

        // this.selectedValues.forEach((element) => {
        //     this.drawingSelectedItems(element);
        // })
    }

    handleSubmit(event) {
        console.log('Package Send');
        console.log(this.selectedValues);
    }

    drawingSelectedItems(item) {
        const selectList = '<div class="item">' + item + '</div>';
        let container = this.template.querySelector('.addedItems');
        container.innerHTML =`${selectList}`;
    }
}