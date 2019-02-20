import { Component, OnInit } from '@angular/core';
import {Item} from '../item'
import {DataService} from '../data.service'

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {

  shoppingItemList: Item[]=[];
  selectedItem:Item
  toggleForm:boolean= false

  constructor(private dataService:DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
    .subscribe((items: Item[])=> {
      this.shoppingItemList = items
      //  console.log('Data from data service : '+ this.shoppingItemList[0].itemName)
    })
    
  }

  addItems(form){
    let newItem:Item ={
      _id:'',
      itemName :form.value.itemName,
      itemQuantity:form.value.itemQuantity,
      itemBought: false
    }

    this.dataService.addShoppingItem(newItem)
    .subscribe(item => {
      console.log(item)
      this.getItems()
    })
  }

  
  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
    .subscribe(item =>{
      console.log(item)
      if(item.n == 1){
        for(var i=0;i<this.shoppingItemList.length;i++){
          if(id == this.shoppingItemList[i]._id){
            this.shoppingItemList.splice(i,1)
          }
        }
      }
    })
  }

  editItems(form){
    let newItem:Item={
      _id:this.selectedItem._id,
      itemName:form.value.itemName,
      itemQuantity:form.value.itemQuantity,
      itemBought: this.selectedItem.itemBought

    } 

    this.dataService.updateShoppingItem(newItem)
    .subscribe(result=>{
      console.log('Updated value'+result)
      this.getItems()

    })
    this.toggleForm=!this.toggleForm
  }


  showEditForm(item){
    this.selectedItem=item
    this.toggleForm = !this.toggleForm
  }


  updateItemCheckbox(item){
    item.itemBought = !item.itemBought
    this.dataService.updateShoppingItem(item)
    .subscribe(result=>{
      console.log('Original value checkbox'+ result.itemBought)
      this.getItems()
    })

  }

  ngOnInit() {
    this.getItems()
  }

}
