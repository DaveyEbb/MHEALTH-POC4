import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatasetService } from './Dataset.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Dataset',
	templateUrl: './Dataset.component.html',
	styleUrls: ['./Dataset.component.css'],
  providers: [DatasetService]
})
export class DatasetComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          datasetId = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          contentHash = new FormControl("", Validators.required);
        
  
      
          contentType = new FormControl("", Validators.required);
        
  
      
          contentAddress = new FormControl("", Validators.required);
        
  
      
          source = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceDataset:DatasetService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          datasetId:this.datasetId,
        
    
        
          datetime:this.datetime,
        
    
        
          contentHash:this.contentHash,
        
    
        
          contentType:this.contentType,
        
    
        
          contentAddress:this.contentAddress,
        
    
        
          source:this.source,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceDataset.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.mhuk.healthnet.Dataset",
      
        
          "datasetId":this.datasetId.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "contentHash":this.contentHash.value,
        
      
        
          "contentType":this.contentType.value,
        
      
        
          "contentAddress":this.contentAddress.value,
        
      
        
          "source":this.source.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "datasetId":null,
        
      
        
          "datetime":null,
        
      
        
          "contentHash":null,
        
      
        
          "contentType":null,
        
      
        
          "contentAddress":null,
        
      
        
          "source":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceDataset.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "datasetId":null,
        
      
        
          "datetime":null,
        
      
        
          "contentHash":null,
        
      
        
          "contentType":null,
        
      
        
          "contentAddress":null,
        
      
        
          "source":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.mhuk.healthnet.Dataset",
      
        
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "contentHash":this.contentHash.value,
          
        
    
        
          
            "contentType":this.contentType.value,
          
        
    
        
          
            "contentAddress":this.contentAddress.value,
          
        
    
        
          
            "source":this.source.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceDataset.updateAsset(form.get("datasetId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceDataset.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceDataset.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "datasetId":null,
          
        
          
            "datetime":null,
          
        
          
            "contentHash":null,
          
        
          
            "contentType":null,
          
        
          
            "contentAddress":null,
          
        
          
            "source":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.datasetId){
          
            formObject.datasetId = result.datasetId;
          
        }else{
          formObject.datasetId = null;
        }
      
        if(result.datetime){
          
            formObject.datetime = result.datetime;
          
        }else{
          formObject.datetime = null;
        }
      
        if(result.contentHash){
          
            formObject.contentHash = result.contentHash;
          
        }else{
          formObject.contentHash = null;
        }
      
        if(result.contentType){
          
            formObject.contentType = result.contentType;
          
        }else{
          formObject.contentType = null;
        }
      
        if(result.contentAddress){
          
            formObject.contentAddress = result.contentAddress;
          
        }else{
          formObject.contentAddress = null;
        }
      
        if(result.source){
          
            formObject.source = result.source;
          
        }else{
          formObject.source = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "datasetId":null,
        
      
        
          "datetime":null,
        
      
        
          "contentHash":null,
        
      
        
          "contentType":null,
        
      
        
          "contentAddress":null,
        
      
        
          "source":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
