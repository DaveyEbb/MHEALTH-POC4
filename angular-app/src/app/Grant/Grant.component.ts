import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GrantService } from './Grant.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Grant',
	templateUrl: './Grant.component.html',
	styleUrls: ['./Grant.component.css'],
  providers: [GrantService]
})
export class GrantComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          grantId = new FormControl("", Validators.required);
        
  
      
          datetime = new FormControl("", Validators.required);
        
  
      
          permissionType = new FormControl("", Validators.required);
        
  
      
          granter = new FormControl("", Validators.required);
        
  
      
          grantee = new FormControl("", Validators.required);
        
  


  constructor(private serviceGrant:GrantService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          grantId:this.grantId,
        
    
        
          datetime:this.datetime,
        
    
        
          permissionType:this.permissionType,
        
    
        
          granter:this.granter,
        
    
        
          grantee:this.grantee
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceGrant.getAll()
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
      $class: "org.mhuk.healthnet.Grant",
      
        
          "grantId":this.grantId.value,
        
      
        
          "datetime":this.datetime.value,
        
      
        
          "permissionType":this.permissionType.value,
        
      
        
          "granter":this.granter.value,
        
      
        
          "grantee":this.grantee.value
        
      
    };

    this.myForm.setValue({
      
        
          "grantId":null,
        
      
        
          "datetime":null,
        
      
        
          "permissionType":null,
        
      
        
          "granter":null,
        
      
        
          "grantee":null
        
      
    });

    return this.serviceGrant.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "grantId":null,
        
      
        
          "datetime":null,
        
      
        
          "permissionType":null,
        
      
        
          "granter":null,
        
      
        
          "grantee":null 
        
      
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
      $class: "org.mhuk.healthnet.Grant",
      
        
          
        
    
        
          
            "datetime":this.datetime.value,
          
        
    
        
          
            "permissionType":this.permissionType.value,
          
        
    
        
          
            "granter":this.granter.value,
          
        
    
        
          
            "grantee":this.grantee.value
          
        
    
    };

    return this.serviceGrant.updateAsset(form.get("grantId").value,this.asset)
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

    return this.serviceGrant.deleteAsset(this.currentId)
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

    return this.serviceGrant.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "grantId":null,
          
        
          
            "datetime":null,
          
        
          
            "permissionType":null,
          
        
          
            "granter":null,
          
        
          
            "grantee":null 
          
        
      };



      
        if(result.grantId){
          
            formObject.grantId = result.grantId;
          
        }else{
          formObject.grantId = null;
        }
      
        if(result.datetime){
          
            formObject.datetime = result.datetime;
          
        }else{
          formObject.datetime = null;
        }
      
        if(result.permissionType){
          
            formObject.permissionType = result.permissionType;
          
        }else{
          formObject.permissionType = null;
        }
      
        if(result.granter){
          
            formObject.granter = result.granter;
          
        }else{
          formObject.granter = null;
        }
      
        if(result.grantee){
          
            formObject.grantee = result.grantee;
          
        }else{
          formObject.grantee = null;
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
      
        
          "grantId":null,
        
      
        
          "datetime":null,
        
      
        
          "permissionType":null,
        
      
        
          "granter":null,
        
      
        
          "grantee":null 
        
      
      });
  }

}
