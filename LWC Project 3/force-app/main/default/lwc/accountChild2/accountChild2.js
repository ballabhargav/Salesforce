import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccoutClass.getAccounts';
import {MessageContext,publish} from 'lightning/messageService';
import Comrevo from '@salesforce/messageChannel/Comrevo__c';

export default class AccountChild2 extends LightningElement {
    @api searchTextChild2;
    @wire (MessageContext) messageContext;
        
    columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name' },
        { label: 'Actions', fieldName: 'Actions', type: 'button', typeAttributes: 
            {
                label: 'View_Contacts',
                value: 'view_contacts'
            }
        }
    ]

    //[] defines array
    //{} defines object
    rows = [
        {
            Id: '00123456789',
            Name: 'Test Account',
            Actions: 'Edit'
        },

        {
            Id: '00123450909',
            Name: 'Test Account 2',
            Actions: 'Edit'
        },

        {
            Id: '00123451234',
            Name: 'Test Account 3',
            Actions: 'Edit'
        },

        {
            Id: '00123456767',
            Name: 'Test Account 4',
            Actions: 'Edit'
        }
    ]

    currentId;
    currentName;
    handleRowAction(event) {
        {
            if (event.detail.action.value == 'view_contacts') 
                {
                this.currentId = event.detail.row.Id;
                this.currentName = event.detail.row.Name;

                const payload = {
                    accountId: this.currentId,
                    accountName: this.currentName
                };

                publish(this.messageContext, Comrevo, payload);
                const selectedEvent = new CustomEvent('selected', {
                    detail: payload
                });
                this.dispatchEvent(selectedEvent);
            }
        }

    }
    @wire(getAccounts, {searchTextClass:'$searchTextChild2'}) accountRecords;
}