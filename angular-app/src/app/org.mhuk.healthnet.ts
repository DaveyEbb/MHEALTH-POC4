import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.mhuk.healthnet{
   export class Dataset extends Asset {
      datasetId: string;
      datetime: Date;
      contentHash: string;
      contentType: string;
      contentAddress: string;
      source: Provider;
      owner: Patient;
   }
   export class Grant extends Asset {
      grantId: string;
      datetime: Date;
      permissionType: string;
      granter: Patient;
      grantee: Carer;
   }
   export class Patient extends Participant {
      patientId: string;
      patientEmail: string;
      familyName: string;
      givenName: string;
   }
   export class Provider extends Participant {
      providerId: string;
      providerName: string;
      providerType: string;
   }
   export class Carer extends Participant {
      carerId: string;
      familyName: string;
      givenName: string;
   }
   export class GrantPermission extends Transaction {
      patient: Patient;
      carer: Carer;
   }
   export class ProvideData extends Transaction {
      patient: Patient;
      dataset: Dataset;
   }
// }
