import { LightningElement,wire,api} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';

export default class WireExample2 extends LightningElement {
    @api recordId;
    @wire (getAccountList,{accId:'$recordId'}) accounts;
}