import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    flag=false;
    statusChanged(event)
    {
        this.flag=event.target.checked;
    }
}