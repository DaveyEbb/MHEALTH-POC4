import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Grant } from '../org.mhuk.healthnet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class GrantService {

	
		private NAMESPACE: string = 'org.mhuk.healthnet.Grant';
	



    constructor(private dataService: DataService<Grant>) {
    };

    public getAll(): Observable<Grant[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Grant> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Grant> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Grant> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Grant> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
