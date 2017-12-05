import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Dataset } from '../org.mhuk.healthnet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class DatasetService {

	
		private NAMESPACE: string = 'org.mhuk.healthnet.Dataset';
	



    constructor(private dataService: DataService<Dataset>) {
    };

    public getAll(): Observable<Dataset[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Dataset> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Dataset> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Dataset> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Dataset> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
