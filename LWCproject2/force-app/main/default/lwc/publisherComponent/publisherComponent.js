import { MessageContext, publish } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import ComrevoChannel from '@salesforce/messageChannel/ComrevoChannel__c';

export default class PublisherComponent extends LightningElement {
    firstName='';
    lastName='';
    @wire (MessageContext) messageContext;
    
    handleChangeFirstName(event)
    {
        this.firstName=event.target.value;
    }

    handleChangeLastName(event)
    {
        this.lastName=event.target.value;
    }

    handleClick(event)
    {
        //code to pass message to subscribers
        let payload={firstname:this.firstName, lastname:this.lastName};
        publish(this.messageContext, ComrevoChannel, payload);
    }
}
