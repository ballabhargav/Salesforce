import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire, api } from 'lwc';
import Comrevo from '@salesforce/messageChannel/Comrevo__c';
import getAccountContacts from '@salesforce/apex/AccoutClass.getAccountContacts';
import LightningConfirm  from 'lightning/confirm';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class ShowAccountContacts extends LightningElement {

    subscription=null;
    title='Contacts'
    contacts;
    hasContacts;
    isAccountSelected=false;
    isAddContactClicked=false;
    isEditClicked = false;
    editableContactId;
    @api recordId;

    @wire(MessageContext)messageContext
    accountId;
    accountName;

    connectedCallback() {
        this.handleSubscribe();
    }
    disconnectedCallback() {
        
        this.handleUnsubscribe();
    }
    handleSubscribe() 
    {
        if(!this.subscription)   
        {
            this.subscription=subscribe(this.messageContext,Comrevo,
                (parameter)=> 
                {
                    this.accountId=parameter.accountId;
                    this.accountName=parameter.accountName;
                    this.title=this.accountName+"'s Contacts"
                    this.getContacts();
                }
            );
        }
    }

   async  getContacts()
    {
        this.contacts=await getAccountContacts({accountId: this.accountId});
        this.hasContacts=this.contacts.length>0?true:false;
        this.isAccountSelected=true;
    }
    handleUnsubscribe() {
        if(this.subscription)
        {
                unsubscribe(this.subscription);
                this.subscription=null;
        }
    }

    handleAddContact(event)
        {
            this.isAddContactClicked=true;
        }

    handleAddContactCancel(event)
    {
        this.isAddContactClicked=false
    }

    handleEdit(event){
        this.isEditClicked=true;
        this.editableContactId=event.target.dataset.contactId;
    }

    handleEditCancel(event)
    {
        this.isEditClicked=false;
    }
    handleSuccess(event){
        this.isAddContactClicked=false;
        this.isEditClicked=false;
        this.getContacts();
    }

    async handleDelete(event)
    {
        this.editableContactId=event.target.dataset.contactId;
       const result = await LightningConfirm.open({
            message: 'Are you sure want to Delete this contact?',
            label: 'Confirm deletion?',
            theme: 'warning',
        });

        if(result)
        {
            let deleteResult = await deleteRecord(this.editableContactId);
            this.getContacts();
            this.showSuccessToast();
        }
    }
    showToast() {
        const event = new ShowToastEvent({
            title: 'Delete Success!',
            message: 'Record Deleted successfully.',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}