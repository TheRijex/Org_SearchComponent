import { LightningElement, track } from 'lwc';


export default class MultiPickFundament extends LightningElement {
    @track allDate;

    renderedCallback(){
        console.log('Test');
    }

}